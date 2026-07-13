<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponse;
use App\Models\DetalleVenta;
use App\Models\MovimientoStock;
use App\Models\Producto;
use App\Models\Venta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class VentaController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Venta::class);

        $perPage = (int) $request->integer('per_page', 15);
        $perPage = max(1, min($perPage, 100));

        $sales = Venta::query()
            ->with(['cliente', 'cajero'])
            ->latest('id')
            ->paginate($perPage)
            ->appends($request->query());

        return $this->successResponse('Ventas obtenidas correctamente.', $sales);
    }

    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Venta::class);

        $validated = $request->validate([
            'cliente_id' => ['nullable', 'integer', 'exists:clientes,id'],
            'metodo_pago' => ['required', 'in:efectivo,tarjeta,transferencia,credito'],
            'estado_pago' => ['required', 'in:pendiente,pagado,cancelado'],
            'fecha_venta' => ['required', 'date'],
            'notas' => ['nullable', 'string'],
            'descuento' => ['nullable', 'numeric', 'min:0'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.producto_id' => ['required', 'integer', 'exists:productos,id'],
            'items.*.cantidad' => ['required', 'integer', 'min:1'],
            'items.*.precio_unitario' => ['nullable', 'numeric', 'min:0'],
        ]);

        $venta = DB::transaction(function () use ($validated, $request): Venta {
            $venta = Venta::create([
                'numero_factura' => Venta::generarNumeroFactura(),
                'cliente_id' => $validated['cliente_id'] ?? null,
                'user_id' => $request->user()->id,
                'subtotal' => 0,
                'impuesto' => 0,
                'descuento' => $validated['descuento'] ?? 0,
                'total' => 0,
                'metodo_pago' => $validated['metodo_pago'],
                'estado_pago' => $validated['estado_pago'],
                'fecha_venta' => $validated['fecha_venta'],
                'notas' => $validated['notas'] ?? null,
            ]);

            foreach ($validated['items'] as $item) {
                $producto = Producto::query()
                    ->lockForUpdate()
                    ->findOrFail($item['producto_id']);

                $cantidad = (int) $item['cantidad'];

                if ((int) $producto->stock < $cantidad) {
                    throw ValidationException::withMessages([
                        'items' => ["Stock insuficiente para {$producto->nombre}."],
                    ]);
                }

                $precioUnitario = isset($item['precio_unitario'])
                    ? (float) $item['precio_unitario']
                    : (float) $producto->precio_venta;

                $subtotalDetalle = round($cantidad * $precioUnitario, 2);
                $stockAnterior = (float) $producto->stock;
                $stockNuevo = $stockAnterior - $cantidad;

                DetalleVenta::create([
                    'venta_id' => $venta->id,
                    'producto_id' => $producto->id,
                    'cantidad' => $cantidad,
                    'precio_unitario' => $precioUnitario,
                    'subtotal' => $subtotalDetalle,
                ]);

                $producto->update(['stock' => $stockNuevo]);

                MovimientoStock::create([
                    'producto_id' => $producto->id,
                    'cantidad' => -$cantidad,
                    'tipo' => 'venta',
                    'stock_anterior' => $stockAnterior,
                    'stock_nuevo' => $stockNuevo,
                    'motivo' => 'Salida por venta '.$venta->numero_factura,
                    'referencia_type' => Venta::class,
                    'referencia_id' => $venta->id,
                    'user_id' => $request->user()->id,
                ]);
            }

            $venta->calcularTotales()->save();

            return $venta;
        });

        return $this->createdResponse(
            'Venta registrada correctamente.',
            $venta->load(['cliente', 'cajero', 'detalleVentas.producto'])
        );
    }

    public function show(Venta $sale): JsonResponse
    {
        $this->authorize('view', $sale);

        return $this->successResponse(
            'Venta obtenida correctamente.',
            $sale->load(['cliente', 'cajero', 'detalleVentas.producto'])
        );
    }

    public function details(Venta $sale): JsonResponse
    {
        return $this->show($sale);
    }

    public function today(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Venta::class);

        $perPage = (int) $request->integer('per_page', 15);
        $perPage = max(1, min($perPage, 100));

        $sales = Venta::query()
            ->with(['cliente', 'cajero'])
            ->whereDate('fecha_venta', now()->toDateString())
            ->latest('id')
            ->paginate($perPage)
            ->appends($request->query());

        return $this->successResponse('Ventas del día obtenidas correctamente.', $sales);
    }
}

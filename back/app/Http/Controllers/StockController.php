<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponse;
use App\Models\MovimientoStock;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class StockController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', MovimientoStock::class);

        $perPage = (int) $request->integer('per_page', 15);
        $perPage = max(1, min($perPage, 100));

        $movements = MovimientoStock::query()
            ->with(['producto', 'user', 'referencia'])
            ->latest('id')
            ->paginate($perPage)
            ->appends($request->query());

        return $this->successResponse('Movimientos de stock obtenidos correctamente.', $movements);
    }

    public function adjust(Request $request): JsonResponse
    {
        $this->authorize('create', MovimientoStock::class);

        $validated = $request->validate([
            'product_id' => ['required', 'integer', 'exists:productos,id'],
            'cantidad' => ['required', 'integer', 'not_in:0'],
            'tipo' => ['required', 'in:ajuste'],
            'motivo' => ['nullable', 'string'],
        ]);

        $movement = DB::transaction(function () use ($validated, $request): MovimientoStock {
            $producto = Producto::query()
                ->lockForUpdate()
                ->findOrFail($validated['product_id']);

            $stockAnterior = (float) $producto->stock;
            $stockNuevo = $stockAnterior + (int) $validated['cantidad'];

            if ($stockNuevo < 0) {
                throw ValidationException::withMessages([
                    'cantidad' => ['La cantidad de ajuste excede el stock disponible.'],
                ]);
            }

            $producto->update(['stock' => $stockNuevo]);

            return MovimientoStock::create([
                'producto_id' => $producto->id,
                'cantidad' => (int) $validated['cantidad'],
                'tipo' => $validated['tipo'],
                'stock_anterior' => $stockAnterior,
                'stock_nuevo' => $stockNuevo,
                'motivo' => $validated['motivo'] ?? 'Ajuste manual de inventario',
                'user_id' => $request->user()?->id,
            ]);
        });

        return $this->successResponse(
            'Ajuste de stock aplicado correctamente.',
            $movement->load('producto')
        );
    }

    public function registerEntry(Request $request): JsonResponse
    {
        return $this->errorResponse('Método registerEntry pendiente de implementación.', [
            'stock' => ['Endpoint reservado para entradas de inventario.'],
        ], 422);
    }

    public function registerExit(Request $request): JsonResponse
    {
        return $this->errorResponse('Método registerExit pendiente de implementación.', [
            'stock' => ['Endpoint reservado para salidas de inventario.'],
        ], 422);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponse;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProductoController extends Controller
{
    use ApiResponse;

    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Producto::class);

        throw ValidationException::withMessages([
            'producto' => ['Método store pendiente de implementación.'],
        ]);
    }

    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Producto::class);

        $validated = $request->validate([
            'search' => ['nullable', 'string'],
            'category_id' => ['nullable', 'integer', 'exists:categorias,id'],
            'brand_id' => ['nullable', 'integer', 'exists:marcas,id'],
            'stock_filter' => ['nullable', 'in:low,out,all'],
            'active' => ['nullable', 'boolean'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = Producto::query()->with(['categoria', 'marca']);

        if (! empty($validated['search'])) {
            $search = $validated['search'];
            $query->where(function ($q) use ($search): void {
                $q->where('nombre', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        if (! empty($validated['category_id'])) {
            $query->where('categoria_id', $validated['category_id']);
        }

        if (! empty($validated['brand_id'])) {
            $query->where('marca_id', $validated['brand_id']);
        }

        $stockFilter = $validated['stock_filter'] ?? 'all';
        if ($stockFilter === 'low') {
            $query->lowStock();
        }
        if ($stockFilter === 'out') {
            $query->outOfStock();
        }

        if (array_key_exists('active', $validated)) {
            $query->where('activo', (bool) $validated['active']);
        }

        $perPage = $validated['per_page'] ?? 15;
        $products = $query->latest('id')->paginate($perPage)->appends($request->query());

        return $this->successResponse('Productos obtenidos correctamente.', $products);
    }

    public function lowStock(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Producto::class);

        $validated = $request->validate([
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $perPage = $validated['per_page'] ?? 15;

        $products = Producto::query()
            ->with(['categoria', 'marca'])
            ->lowStock()
            ->latest('id')
            ->paginate($perPage)
            ->appends($request->query());

        return $this->successResponse('Productos con stock bajo obtenidos correctamente.', $products);
    }

    public function outOfStock(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Producto::class);

        $validated = $request->validate([
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $perPage = $validated['per_page'] ?? 15;

        $products = Producto::query()
            ->with(['categoria', 'marca'])
            ->outOfStock()
            ->latest('id')
            ->paginate($perPage)
            ->appends($request->query());

        return $this->successResponse('Productos sin stock obtenidos correctamente.', $products);
    }

    public function search(Request $request): JsonResponse
    {
        return $this->index($request);
    }

    public function show(Producto $product): JsonResponse
    {
        $this->authorize('view', $product);

        return $this->successResponse(
            'Producto obtenido correctamente.',
            $product->load(['categoria', 'marca'])
        );
    }

    public function update(Request $request, Producto $product): JsonResponse
    {
        $this->authorize('update', $product);

        throw ValidationException::withMessages([
            'producto' => ['Método update pendiente de implementación.'],
        ]);
    }

    public function destroy(Producto $product): JsonResponse
    {
        $this->authorize('delete', $product);

        throw ValidationException::withMessages([
            'producto' => ['Método destroy pendiente de implementación.'],
        ]);
    }
}

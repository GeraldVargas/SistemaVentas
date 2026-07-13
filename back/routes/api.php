<?php

use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (): void {
    Route::post('login', ['App\\Http\\Controllers\\AuthController', 'login']);
    Route::post('register', ['App\\Http\\Controllers\\AuthController', 'register']);
    Route::post('logout', ['App\\Http\\Controllers\\AuthController', 'logout'])->middleware('auth:sanctum');
    Route::get('me', ['App\\Http\\Controllers\\AuthController', 'me'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('dashboard', ['App\\Http\\Controllers\\DashboardController', 'index']);

    Route::apiResource('products', 'App\\Http\\Controllers\\ProductoController');
    Route::get('products/search', ['App\\Http\\Controllers\\ProductoController', 'search']);
    Route::get('products/low-stock', ['App\\Http\\Controllers\\ProductoController', 'lowStock']);
    Route::get('products/out-of-stock', ['App\\Http\\Controllers\\ProductoController', 'outOfStock']);

    Route::apiResource('categories', 'App\\Http\\Controllers\\CategoriaController');
    Route::apiResource('brands', 'App\\Http\\Controllers\\MarcaController');
    Route::apiResource('clients', 'App\\Http\\Controllers\\ClienteController');

    Route::apiResource('sales', 'App\\Http\\Controllers\\VentaController');
    Route::get('sales/today', ['App\\Http\\Controllers\\VentaController', 'today']);
    Route::get('sales/{sale}/details', ['App\\Http\\Controllers\\VentaController', 'details']);

    Route::apiResource('purchases', 'App\\Http\\Controllers\\CompraController');
    Route::get('purchases/today', ['App\\Http\\Controllers\\CompraController', 'today']);
    Route::get('purchases/{purchase}/details', ['App\\Http\\Controllers\\CompraController', 'details']);

    Route::apiResource('suppliers', 'App\\Http\\Controllers\\ProveedorController');

    Route::prefix('stock')->group(function (): void {
        Route::get('movements', ['App\\Http\\Controllers\\StockController', 'index']);
        Route::post('adjust', ['App\\Http\\Controllers\\StockController', 'adjust']);
        Route::post('in', ['App\\Http\\Controllers\\StockController', 'registerEntry']);
        Route::post('out', ['App\\Http\\Controllers\\StockController', 'registerExit']);
    });

    Route::apiResource('reports', 'App\\Http\\Controllers\\ReporteController')->only(['index', 'show']);
    Route::get('reports/sales/today', ['App\\Http\\Controllers\\ReporteController', 'salesToday']);
    Route::get('reports/purchases/today', ['App\\Http\\Controllers\\ReporteController', 'purchasesToday']);
    Route::get('reports/stock/summary', ['App\\Http\\Controllers\\ReporteController', 'stockSummary']);

    Route::apiResource('users', 'App\\Http\\Controllers\\UserController');
    Route::apiResource('roles', 'App\\Http\\Controllers\\RoleController');
    Route::apiResource('settings', 'App\\Http\\Controllers\\ConfiguracionController');
    Route::apiResource('warehouses', 'App\\Http\\Controllers\\AlmacenController');
    Route::apiResource('payment-methods', 'App\\Http\\Controllers\\MetodoPagoController');
});

// Placeholders de controladores pendientes de implementación:
// AuthController, DashboardController, ProductoController, CategoriaController, MarcaController,
// ClienteController, VentaController, CompraController, ProveedorController, StockController,
// ReporteController, UserController, RoleController, ConfiguracionController, AlmacenController,
// MetodoPagoController.
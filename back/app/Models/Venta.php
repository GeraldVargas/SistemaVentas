<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $fillable = [
        'numero_factura',
        'cliente_id',
        'user_id',
        'subtotal',
        'impuesto',
        'descuento',
        'total',
        'metodo_pago',
        'estado_pago',
        'fecha_venta',
        'notas',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'impuesto' => 'decimal:2',
        'descuento' => 'decimal:2',
        'total' => 'decimal:2',
        'fecha_venta' => 'datetime',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }

    public function cajero(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function detalleVentas(): HasMany
    {
        return $this->hasMany(DetalleVenta::class);
    }

    public static function generarNumeroFactura(): string
    {
        $ultimoNumero = static::query()
            ->orderByDesc('id')
            ->value('numero_factura');

        if (! $ultimoNumero) {
            return 'INV-000001';
        }

        $numero = (int) preg_replace('/\D/', '', $ultimoNumero);

        return 'INV-'.str_pad((string) ($numero + 1), 6, '0', STR_PAD_LEFT);
    }

    public function calcularTotales(): self
    {
        $subtotal = (float) $this->detalleVentas()->sum('subtotal');
        $tasaImpuesto = (float) (Configuracion::query()->where('clave', 'impuesto_venta')->value('valor') ?? 0.18);
        $impuesto = round($subtotal * $tasaImpuesto, 2);
        $descuento = (float) $this->descuento;

        $this->forceFill([
            'subtotal' => $subtotal,
            'impuesto' => $impuesto,
            'total' => round($subtotal + $impuesto - $descuento, 2),
        ]);

        return $this;
    }
}

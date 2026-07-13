<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Model;

class MovimientoStock extends Model
{
    protected $fillable = [
        'producto_id',
        'cantidad',
        'tipo',
        'stock_anterior',
        'stock_nuevo',
        'motivo',
        'referencia_type',
        'referencia_id',
        'user_id',
    ];

    protected $casts = [
        'cantidad' => 'integer',
        'stock_anterior' => 'decimal:2',
        'stock_nuevo' => 'decimal:2',
    ];

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function referencia(): MorphTo
    {
        return $this->morphTo();
    }
}

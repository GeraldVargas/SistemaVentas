<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Almacen extends Model
{
    protected $fillable = [
        'nombre',
        'codigo',
        'direccion',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];
}

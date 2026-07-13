<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('rol', ['admin', 'vendedor', 'financiero'])->change();
            $table->string('telefono')->nullable()->change();
            $table->text('direccion')->nullable()->change();
            $table->boolean('activo')->default(true)->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('rol', ['admin', 'vendedor', 'financiero'])->default('vendedor')->change();
            $table->string('telefono')->nullable()->change();
            $table->string('direccion')->nullable()->change();
            $table->boolean('activo')->default(true)->change();
        });
    }
};

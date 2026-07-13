<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('movimiento_stocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained('productos');
            $table->integer('cantidad');
            $table->enum('tipo', ['compra', 'venta', 'ajuste', 'devolucion'])->default('ajuste');
            $table->decimal('stock_anterior', 12, 2)->default(0);
            $table->decimal('stock_nuevo', 12, 2)->default(0);
            $table->text('motivo')->nullable();
            $table->string('referencia_type')->nullable();
            $table->unsignedBigInteger('referencia_id')->nullable();
            $table->index(['referencia_type', 'referencia_id']);
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movimiento_stocks');
    }
};
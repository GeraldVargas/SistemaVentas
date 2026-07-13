<?php

namespace App\Http\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    protected function successResponse(string $message, mixed $data = null, int $status = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    protected function createdResponse(string $message, mixed $data = null): JsonResponse
    {
        return $this->successResponse($message, $data, 201);
    }

    protected function errorResponse(string $message, mixed $errors = null, int $status = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }

    protected function validationErrorResponse(string $message, array $errors, int $status = 422): JsonResponse
    {
        return $this->errorResponse($message, $errors, $status);
    }
}
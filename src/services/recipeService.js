// src/services/recipeService.js
import { api } from './apiClient';

export const recipeService = {
    // Obtener todas las recetas - GET /api/v1/recetas/recetas/
    getRecipes: (skip = 0, limit = 100) =>
        api.get(`/recetas/?skip=${skip}&limit=${limit}`),

    // Buscar recetas - GET /api/v1/recetas/recetas/buscar?nombre={valor}
    searchRecipes: (nombre) =>
        api.get(`/recetas/buscar?nombre=${encodeURIComponent(nombre)}`),

    // Ver detalle de receta - GET /api/v1/recetas/recetas/{id}
    getRecipe: (id) =>
        api.get(`/recetas/${id}`),

    // Publicar receta - POST /api/v1/recetas/recetas/
    createRecipe: (data) =>
        api.post('/recetas/', data),

    // Editar receta - PATCH /api/v1/recetas/recetas/{id}
    updateRecipe: (id, data) =>
        api.patch(`/recetas/${id}`, data),

    // Eliminar receta - DELETE /api/v1/recetas/recetas/{id}
    deleteRecipe: (id) =>
        api.delete(`/recetas/${id}`),
};
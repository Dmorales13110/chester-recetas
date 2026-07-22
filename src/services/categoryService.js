// src/services/categoryService.js
import { api } from './apiClient';

export const categoryService = {
    // Listar todas las categorías - GET /api/v1/categorias/categorias/
    getCategories: () =>
        api.get('/categorias/'),

    // Crear categoría - POST /api/v1/categorias/categorias/
    createCategory: (data) =>
        api.post('/categorias/', data),

    // Eliminar categoría - DELETE /api/v1/categorias/categorias/{id}
    deleteCategory: (id) =>
        api.delete(`/categorias/${id}`),
};
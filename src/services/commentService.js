// src/services/commentService.js
import { api } from './apiClient';

export const commentService = {
    // Publicar comentario - POST /api/v1/comentarios/
    createComment: (data) =>
        api.post('/comentarios/', data),

    // Listar comentarios de receta - GET /api/v1/comentarios/receta/{receta_id}
    getCommentsByRecipe: (recetaId) =>
        api.get(`/comentarios/receta/${recetaId}`),

    // Editar comentario - PATCH /api/v1/comentarios/{id}
    updateComment: (id, data) =>
        api.patch(`/comentarios/${id}`, data),

    // Eliminar comentario - DELETE /api/v1/comentarios/{id}
    deleteComment: (id) =>
        api.delete(`/comentarios/${id}`),
};
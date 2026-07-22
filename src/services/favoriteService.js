// src/services/favoriteService.js
import { api } from './apiClient';

export const favoriteService = {
    // Listar mis favoritos - GET /api/v1/favoritos/
    getFavorites: () =>
        api.get('/favoritos/'),

    // Alternar favorito - POST /api/v1/favoritos/toggle/{receta_id}
    toggleFavorite: (recetaId) =>
        api.post(`/favoritos/toggle/${recetaId}`),

    // Eliminar de favoritos - DELETE /api/v1/favoritos/{receta_id}
    removeFavorite: (recetaId) =>
        api.delete(`/favoritos/${recetaId}`),
};
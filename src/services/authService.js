// src/services/authService.js
import { api } from './apiClient';

export const authService = {
    // Registro de usuario - POST /api/v1/usuarios/usuarios/registro
    register: (userData) =>
        api.post('/usuarios/registro', userData),

    // Login - POST /api/v1/usuarios/usuarios/login
    login: (credentials) =>
        api.post('/usuarios/login', credentials),

    // Refresh Token - POST /api/v1/usuarios/usuarios/refresh
    refreshToken: (refreshToken) =>
        api.post('/usuarios/refresh', { refresh_token: refreshToken }),

    // Recuperar contraseña - POST /api/v1/usuarios/usuarios/recuperar-contrasena
    forgotPassword: (email) =>
        api.post('/usuarios/recuperar-contrasena', { email }),

    // Obtener mi perfil - GET /api/v1/usuarios/usuarios/me
    getProfile: () =>
        api.get('/usuarios/me'),

    // Buscar usuarios - GET /api/v1/usuarios/usuarios/buscar?nombre={valor}
    searchUsers: (nombre) =>
        api.get(`/usuarios/buscar?nombre=${encodeURIComponent(nombre)}`),

    // Buscar usuario por email - GET /api/v1/usuarios/usuarios/buscar-email?email={correo}
    searchUserByEmail: (email) =>
        api.get(`/usuarios/buscar-email?email=${encodeURIComponent(email)}`),

    // Obtener usuario por ID - GET /api/v1/usuarios/usuarios/{id}
    getUserById: (id) =>
        api.get(`/usuarios/${id}`),

    // Actualizar perfil - PATCH /api/v1/usuarios/usuarios/{id}
    updateProfile: (id, data) =>
        api.patch(`/usuarios/${id}`, data),

    // Dar de baja usuario - DELETE /api/v1/usuarios/usuarios/{id}
    deleteAccount: (id) =>
        api.delete(`/usuarios/${id}`),
};
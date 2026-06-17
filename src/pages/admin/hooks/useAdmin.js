import { useState, useEffect, useCallback } from 'react'

// Mock data
const mockStats = {
    users: 1234,
    recipes: 156,
    favorites: 892,
    comments: 456,
    views: 324,
    avgTime: '4:32',
    pendingRecipes: 12,
    pendingComments: 8,
    newUsersToday: 5,
}

const mockRecipes = [
    { id: 1, title: 'Pasta al Pesto', category: 'Pastas', status: 'Publicada', views: 234, rating: 4.8, date: '2024-06-15', author: 'María García' },
    { id: 2, title: 'Ensalada César', category: 'Ensaladas', status: 'Publicada', views: 189, rating: 4.6, date: '2024-06-14', author: 'Carlos López' },
    { id: 3, title: 'Tarta de Queso', category: 'Postres', status: 'Pendiente', views: 0, rating: 0, date: '2024-06-13', author: 'Laura Fernández' },
    { id: 4, title: 'Paella Mixta', category: 'Arroces', status: 'Publicada', views: 412, rating: 4.7, date: '2024-06-12', author: 'Admin' },
]

const mockUsers = [
    { id: 1, name: 'María García', email: 'maria@email.com', role: 'Usuario', date: '2024-06-15', recipesCount: 5, commentsCount: 12 },
    { id: 2, name: 'Carlos López', email: 'carlos@email.com', role: 'Usuario', date: '2024-06-14', recipesCount: 3, commentsCount: 8 },
    { id: 3, name: 'Laura Fernández', email: 'laura@email.com', role: 'Chef', date: '2024-06-13', recipesCount: 12, commentsCount: 25 },
    { id: 4, name: 'Admin Chester', email: 'admin@chester.com', role: 'Admin', date: '2024-06-12', recipesCount: 45, commentsCount: 67 },
]

const mockComments = [
    { id: 1, user: 'María García', recipe: 'Pasta al Pesto', comment: '¡Excelente receta!', date: '2024-06-15', rating: 5, status: 'aprobado' },
    { id: 2, user: 'Carlos López', recipe: 'Tarta de Queso', comment: 'No me quedó bien', date: '2024-06-15', rating: 3, status: 'pendiente' },
    { id: 3, user: 'Laura Fernández', recipe: 'Ensalada César', comment: 'Deliciosa', date: '2024-06-14', rating: 4, status: 'aprobado' },
    { id: 4, user: 'Pedro Ruiz', recipe: 'Paella Mixta', comment: 'El arroz quedó perfecto', date: '2024-06-14', rating: 3, status: 'rechazado' },
]

const mockRecentActivity = [
    { id: 1, action: 'Nueva receta: Pasta al Pesto', user: 'María García', time: 'Hace 2 horas', type: 'recipe' },
    { id: 2, action: 'Usuario registrado: Carlos López', user: 'Carlos López', time: 'Hace 4 horas', type: 'user' },
    { id: 3, action: 'Comentario en: Tarta de Queso', user: 'Laura Fernández', time: 'Hace 6 horas', type: 'comment' },
    { id: 4, action: 'Receta destacada: Paella Mixta', user: 'Admin', time: 'Hace 8 horas', type: 'recipe' },
]

export const useAdmin = () => {
    const [stats, setStats] = useState(mockStats)
    const [recipes, setRecipes] = useState(mockRecipes)
    const [users, setUsers] = useState(mockUsers)
    const [comments, setComments] = useState(mockComments)
    const [recentActivity, setRecentActivity] = useState(mockRecentActivity)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simular carga de datos
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    // Funciones para recetas
    const addRecipe = useCallback((recipe) => {
        const newRecipe = {
            ...recipe,
            id: recipes.length + 1,
            date: new Date().toISOString().split('T')[0],
            status: 'Pendiente',
            views: 0,
            rating: 0
        }
        setRecipes(prev => [newRecipe, ...prev])
        // Actualizar estadísticas
        setStats(prev => ({
            ...prev,
            recipes: prev.recipes + 1,
            pendingRecipes: prev.pendingRecipes + 1
        }))
    }, [recipes])

    const deleteRecipe = useCallback((id) => {
        setRecipes(prev => prev.filter(r => r.id !== id))
        setStats(prev => ({
            ...prev,
            recipes: prev.recipes - 1
        }))
    }, [])

    const updateRecipe = useCallback((id, data) => {
        setRecipes(prev => prev.map(r =>
            r.id === id ? { ...r, ...data } : r
        ))
    }, [])

    // Funciones para comentarios
    const approveComment = useCallback((id) => {
        setComments(prev => prev.map(c =>
            c.id === id ? { ...c, status: 'aprobado' } : c
        ))
        setStats(prev => ({
            ...prev,
            pendingComments: prev.pendingComments - 1
        }))
    }, [])

    const rejectComment = useCallback((id) => {
        setComments(prev => prev.map(c =>
            c.id === id ? { ...c, status: 'rechazado' } : c
        ))
        setStats(prev => ({
            ...prev,
            pendingComments: prev.pendingComments - 1
        }))
    }, [])

    const deleteComment = useCallback((id) => {
        setComments(prev => prev.filter(c => c.id !== id))
        setStats(prev => ({
            ...prev,
            comments: prev.comments - 1
        }))
    }, [])

    // Funciones para usuarios
    const blockUser = useCallback((id) => {
        // Simular bloqueo de usuario
        console.log('Usuario bloqueado:', id)
    }, [])

    const changeUserRole = useCallback((id, role) => {
        setUsers(prev => prev.map(u =>
            u.id === id ? { ...u, role } : u
        ))
    }, [])

    return {
        stats,
        recipes,
        users,
        comments,
        recentActivity,
        isLoading,
        addRecipe,
        deleteRecipe,
        updateRecipe,
        approveComment,
        rejectComment,
        deleteComment,
        blockUser,
        changeUserRole,
    }
}
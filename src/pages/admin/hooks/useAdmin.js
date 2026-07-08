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
    { id: 5, title: 'Brownie de Chocolate', category: 'Postres', status: 'Borrador', views: 0, rating: 0, date: '2024-06-11', author: 'María García' },
]

const mockUsers = [
    { id: 1, name: 'María García', email: 'maria@email.com', role: 'Usuario', date: '2024-06-15', recipesCount: 5, commentsCount: 12, status: 'Activo' },
    { id: 2, name: 'Carlos López', email: 'carlos@email.com', role: 'Usuario', date: '2024-06-14', recipesCount: 3, commentsCount: 8, status: 'Activo' },
    { id: 3, name: 'Laura Fernández', email: 'laura@email.com', role: 'Chef', date: '2024-06-13', recipesCount: 12, commentsCount: 25, status: 'Activo' },
    { id: 4, name: 'Admin Chester', email: 'admin@chester.com', role: 'Admin', date: '2024-06-12', recipesCount: 45, commentsCount: 67, status: 'Activo' },
]

const mockComments = [
    { id: 1, user: 'María García', recipe: 'Pasta al Pesto', comment: '¡Excelente receta!', date: '2024-06-15 14:30', rating: 5, status: 'aprobado' },
    { id: 2, user: 'Carlos López', recipe: 'Tarta de Queso', comment: 'No me quedó bien', date: '2024-06-15 12:15', rating: 3, status: 'pendiente' },
    { id: 3, user: 'Laura Fernández', recipe: 'Ensalada César', comment: 'Deliciosa', date: '2024-06-14 20:45', rating: 4, status: 'aprobado' },
]

export const useAdmin = () => {
    const [stats, setStats] = useState(mockStats)
    const [recipes, setRecipes] = useState(mockRecipes)
    const [users, setUsers] = useState(mockUsers)
    const [comments, setComments] = useState(mockComments)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 500)
    }, [])

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

    const blockUser = useCallback((id) => {
        setUsers(prev => prev.map(u => 
            u.id === id ? { ...u, status: u.status === 'Activo' ? 'Bloqueado' : 'Activo' } : u
        ))
    }, [])

    return {
        stats,
        recipes,
        users,
        comments,
        isLoading,
        addRecipe,
        deleteRecipe,
        updateRecipe,
        approveComment,
        rejectComment,
        blockUser,
    }
}
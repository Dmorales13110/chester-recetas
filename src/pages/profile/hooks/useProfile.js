import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { recipeService, favoriteService } from '../../../services'

export const useProfile = () => {
    const { user, isAuthenticated, updateUser } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [favorites, setFavorites] = useState([])
    const [userRecipes, setUserRecipes] = useState([])
    const [stats, setStats] = useState({
        totalFavorites: 0,
        totalRecipes: 0,
        totalRecipesCooked: 0
    })

    //  Cargar favoritos del usuario
    const loadFavorites = useCallback(async () => {
        if (!isAuthenticated) {
            console.log('No autenticado, no se cargan favoritos')
            return []
        }
        
        try {
            const data = await favoriteService.getFavorites()
            console.log('📦 Datos de favoritos recibidos:', data)
            
            //  Verificar diferentes formatos de respuesta
            let favoritesList = []
            if (Array.isArray(data)) {
                favoritesList = data
            } else if (data && data.data && Array.isArray(data.data)) {
                favoritesList = data.data
            } else if (data && data.favorites && Array.isArray(data.favorites)) {
                favoritesList = data.favorites
            } else if (data && typeof data === 'object') {
                // Intentar extraer cualquier array
                const keys = Object.keys(data)
                for (const key of keys) {
                    if (Array.isArray(data[key])) {
                        favoritesList = data[key]
                        break
                    }
                }
            }
            
            console.log('✅ Favoritos procesados:', favoritesList)
            setFavorites(favoritesList)
            setStats(prev => ({ 
                ...prev, 
                totalFavorites: favoritesList.length 
            }))
            
            return favoritesList
        } catch (error) {
            console.error('Error al cargar favoritos:', error)
            setFavorites([])
            setStats(prev => ({ ...prev, totalFavorites: 0 }))
            return []
        }
    }, [isAuthenticated])

    //  Cargar recetas del usuario
    const loadUserRecipes = useCallback(async () => {
        if (!isAuthenticated || !user?.id) {
            console.log('No autenticado o sin ID de usuario')
            return []
        }
        try {
            const data = await recipeService.getUserRecipes(user.id, 0, 100)
            console.log('📦 Recetas del usuario:', data)
            
            let recipesList = []
            if (Array.isArray(data)) {
                recipesList = data
            } else if (data && data.data && Array.isArray(data.data)) {
                recipesList = data.data
            } else if (data && typeof data === 'object') {
                const keys = Object.keys(data)
                for (const key of keys) {
                    if (Array.isArray(data[key])) {
                        recipesList = data[key]
                        break
                    }
                }
            }
            
            setUserRecipes(recipesList)
            setStats(prev => ({ ...prev, totalRecipes: recipesList.length }))
            return recipesList
        } catch (error) {
            console.error('Error al cargar recetas del usuario:', error)
            setUserRecipes([])
            return []
        }
    }, [isAuthenticated, user?.id])

    //  Eliminar favorito
    const removeFavorite = useCallback(async (recipeId) => {
        try {
            await favoriteService.removeFavorite(recipeId)
            // Actualizar lista localmente
            const updatedFavorites = favorites.filter(f => {
                const favId = f.id_receta || f.receta_id || f.id
                return favId !== recipeId
            })
            setFavorites(updatedFavorites)
            setStats(prev => ({ ...prev, totalFavorites: updatedFavorites.length }))
            return { success: true }
        } catch (error) {
            console.error('Error al eliminar favorito:', error)
            // Recargar favoritos para asegurar consistencia
            await loadFavorites()
            return { success: false, error: error.message }
        }
    }, [favorites, loadFavorites])

    // Alternar favorito
    const toggleFavorite = useCallback(async (recipeId) => {
        try {
            await favoriteService.toggleFavorite(recipeId)
            // Recargar favoritos
            await loadFavorites()
            return { success: true }
        } catch (error) {
            console.error('Error al alternar favorito:', error)
            return { success: false, error: error.message }
        }
    }, [loadFavorites])

    //  Actualizar usuario localmente
    const updateLocalUser = useCallback((updatedData) => {
        if (updateUser) {
            const updated = updateUser({
                name: updatedData.name,
                email: updatedData.email,
                telefono: updatedData.phone,
                ubicacion: updatedData.location,
                avatar: updatedData.avatar
            })
            return updated
        }
        return null
    }, [updateUser])

    useEffect(() => {
        const loadAllData = async () => {
            setIsLoading(true)
            try {
                await Promise.all([
                    loadFavorites(),
                    loadUserRecipes()
                ])
            } catch (error) {
                console.error('Error al cargar datos del perfil:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (isAuthenticated) {
            loadAllData()
        } else {
            setIsLoading(false)
        }
    }, [isAuthenticated, loadFavorites, loadUserRecipes])

    // Datos del usuario formateados para el perfil
    const profileData = {
        name: user?.name || 'Usuario',
        email: user?.email || 'usuario@chester.com',
        phone: user?.telefono || '+34 900 123 456',
        location: user?.ubicacion || 'Madrid, España',
        memberSince: user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024',
        avatar: user?.avatar || null,
        totalRecipesCooked: stats.totalRecipesCooked || 0,
        totalFavorites: stats.totalFavorites,
        totalRecipes: stats.totalRecipes
    }

    return {
        user: profileData,
        favorites,
        userRecipes,
        isLoading,
        isAuthenticated,
        removeFavorite,
        toggleFavorite,
        loadFavorites,
        loadUserRecipes,
        stats,
        updateLocalUser
    }
}
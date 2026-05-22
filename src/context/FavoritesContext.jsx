import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider')
    }
    return context
}

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem('chester-favorites')
        if (saved) {
            setFavorites(JSON.parse(saved))
        }
    }, [])

    const addFavorite = (recipe) => {
        setFavorites(prev => {
            const exists = prev.find(r => r.id === recipe.id)
            if (exists) return prev
            const newFavorites = [...prev, recipe]
            localStorage.setItem('chester-favorites', JSON.stringify(newFavorites))
            return newFavorites
        })
    }

    const removeFavorite = (recipeId) => {
        setFavorites(prev => {
            const newFavorites = prev.filter(r => r.id !== recipeId)
            localStorage.setItem('chester-favorites', JSON.stringify(newFavorites))
            return newFavorites
        })
    }

    const isFavorite = (recipeId) => {
        return favorites.some(r => r.id === recipeId)
    }

    const toggleFavorite = (recipe) => {
        if (isFavorite(recipe.id)) {
            removeFavorite(recipe.id)
        } else {
            addFavorite(recipe)
        }
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}
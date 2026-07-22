import { useState, useEffect, useMemo } from 'react'
import { categoryService, recipeService } from '../../../services'

// Mapeo de iconos para categorías
const iconMap = {
    'Desayunos': 'Coffee',
    'Ensaladas': 'Salad',
    'Pastas': 'Pizza',
    'Postres': 'Cake',
    'Cenas': 'Soup',
    'Sopas': 'Soup',
    'Pescados': 'Fish',
    'Carnes': 'Beef',
    'Arroces': 'UtensilsCrossed',
    'Bebidas': 'Coffee',
    'Quesos': 'Cookie',
    'Galletas': 'Cookie',
    'Huevos': 'Egg'
}

const colorMap = {
    'Desayunos': 'yellow',
    'Ensaladas': 'green',
    'Pastas': 'orange',
    'Postres': 'pink',
    'Cenas': 'red',
    'Sopas': 'blue',
    'Pescados': 'cyan',
    'Carnes': 'brown',
    'Arroces': 'orange',
    'Bebidas': 'blue',
    'Quesos': 'yellow',
    'Galletas': 'purple',
    'Huevos': 'yellow'
}

// Categorías destacadas (las primeras 4)
const getFeaturedCategories = (categories) => {
    return categories.slice(0, 4)
}

export const useCategories = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [allRecipes, setAllRecipes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                // Obtener categorías desde la API
                const categoriesData = await categoryService.getCategories()
                
                // Obtener todas las recetas para contar por categoría
                const recipesData = await recipeService.getRecipes(0, 100)
                setAllRecipes(recipesData || [])

                // Mapear categorías con conteo real
                const mappedCategories = (categoriesData || []).map(cat => {
                    // Contar recetas que pertenecen a esta categoría
                    const count = (recipesData || []).filter(r => r.id_categoria === cat.id).length
                    
                    return {
                        id: cat.id,
                        name: cat.nombre,
                        slug: cat.nombre?.toLowerCase().replace(/\s/g, '-') || '',
                        icon: iconMap[cat.nombre] || 'UtensilsCrossed',
                        color: colorMap[cat.nombre] || 'gray',
                        description: cat.descripcion || `Recetas de ${cat.nombre}`,
                        longDescription: cat.descripcion || `Descubre las mejores recetas de ${cat.nombre}`,
                        count: count,
                        featured: false,
                        image: cat.imagen || '',
                        thumbnail: cat.imagen || '',
                        gradient: 'linear-gradient(135deg, #e67e22, #f39c12)',
                        popularRecipes: []
                    }
                })

                setCategories(mappedCategories)
            } catch (error) {
                console.error('Error al cargar categorías:', error)
                setCategories([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    // Filtrar categorías por búsqueda
    const filteredCategories = useMemo(() => {
        if (!searchQuery) return categories
        const query = searchQuery.toLowerCase()
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(query) ||
            cat.description.toLowerCase().includes(query) ||
            cat.longDescription.toLowerCase().includes(query)
        )
    }, [categories, searchQuery])

    // Categorías destacadas (primeras 4)
    const featuredCategories = useMemo(() => {
        return getFeaturedCategories(filteredCategories)
    }, [filteredCategories])

    // Categorías regulares (resto)
    const regularCategories = useMemo(() => {
        return filteredCategories.slice(4)
    }, [filteredCategories])

    const totalRecipes = categories.reduce((sum, cat) => sum + cat.count, 0)
    const totalCategories = categories.length

    return {
        categories: filteredCategories,
        featuredCategories: featuredCategories,
        regularCategories: regularCategories,
        isLoading,
        searchQuery,
        setSearchQuery,
        totalRecipes,
        totalCategories,
    }
}
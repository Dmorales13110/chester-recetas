import { useState, useEffect, useMemo, useCallback } from 'react'
import { recipeService, categoryService } from '../../../services'

// Opciones de dificultad (fijas)
export const difficultyOptions = [
    { value: 'all', label: 'Todas las dificultades' },
    { value: 'Fácil', label: 'Fácil' },
    { value: 'Media', label: 'Media' },
    { value: 'Difícil', label: 'Difícil' },
]

// Opciones de tiempo (fijas)
export const timeOptions = [
    { value: 'all', label: 'Cualquier tiempo' },
    { value: '15', label: 'Menos de 15 min' },
    { value: '30', label: 'Menos de 30 min' },
    { value: '60', label: 'Menos de 60 min' },
]

// Opciones de ordenamiento (fijas)
export const sortOptions = [
    { value: 'recent', label: 'Más recientes' },
    { value: 'rating', label: 'Mejor calificadas' },
    { value: 'title', label: 'Nombre A-Z' },
    { value: 'time-asc', label: 'Tiempo (menor a mayor)' },
    { value: 'time-desc', label: 'Tiempo (mayor a menor)' },
]

export const useRecipes = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedDifficulty, setSelectedDifficulty] = useState('all')
    const [selectedTime, setSelectedTime] = useState('all')
    const [sortBy, setSortBy] = useState('recent')
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [allRecipes, setAllRecipes] = useState([])
    const [allCategories, setAllCategories] = useState([
        { value: 'all', label: 'Todas las categorías' }
    ])
    const [categoryMap, setCategoryMap] = useState({})
    const [totalCount, setTotalCount] = useState(0)
    const itemsPerPage = 9

    //  Mapeo de receta
    const mapRecipeToFormat = (recipe) => ({
        id: recipe.id,
        title: recipe.nombre || 'Receta sin título',
        slug: recipe.nombre?.toLowerCase().replace(/\s/g, '-') || '',
        category: recipe.id_categoria ? categoryMap[recipe.id_categoria] || 'General' : 'General',
        time: `${recipe.tiempo_total || 30} min`,
        difficulty: recipe.dificultad || 'Media',
        rating: recipe.rating || 0,
        calories: recipe.info_nutri?.calorias || 0,
        servings: recipe.porciones || 4,
        image: recipe.imagen || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
        description: recipe.descripcion || '',
        ingredients: recipe.ingredientes?.map(ing => 
            `${ing.cantidad || ''} ${ing.unidad || ''} ${ing.ingrediente || ''}`.trim()
        ) || [],
        author: recipe.usuario?.nombre || 'Usuario',
        authorId: recipe.id_user,
        status: recipe.is_deleted ? 'eliminado' : 'publicado',
        createdAt: recipe.created_at,
        updatedAt: recipe.updated_at
    })

    // Cargar datos iniciales
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                // Obtener categorías
                const categoriesData = await categoryService.getCategories()
                const mappedCategories = [
                    { value: 'all', label: 'Todas las categorías' },
                    ...(categoriesData || []).map(cat => ({
                        value: cat.nombre,
                        label: cat.nombre
                    }))
                ]
                setAllCategories(mappedCategories)

                // Mapeo de categorías por ID
                const map = {}
                ;(categoriesData || []).forEach(cat => {
                    map[cat.id] = cat.nombre
                })
                setCategoryMap(map)

                // Obtener recetas
                const recipesData = await recipeService.getRecipes(0, 100)
                const mappedRecipes = (recipesData || []).map(mapRecipeToFormat)
                setAllRecipes(mappedRecipes)
                setTotalCount(mappedRecipes.length)

            } catch (error) {
                console.error('Error al cargar datos:', error)
                setAllRecipes([])
                setTotalCount(0)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    // Resetear página cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategory, selectedDifficulty, selectedTime, sortBy])

    //  Filtrar recetas
    const filteredRecipes = useMemo(() => {
        let filtered = [...allRecipes]

        // Búsqueda por texto (nombre o descripción)
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(recipe =>
                recipe.title?.toLowerCase().includes(query) ||
                recipe.description?.toLowerCase().includes(query)
            )
        }

        // Filtrar por categoría
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(recipe => 
                recipe.category === selectedCategory
            )
        }

        // Filtrar por dificultad
        if (selectedDifficulty !== 'all') {
            filtered = filtered.filter(recipe => 
                recipe.difficulty === selectedDifficulty
            )
        }

        // Filtrar por tiempo máximo
        if (selectedTime !== 'all') {
            const maxTime = parseInt(selectedTime)
            filtered = filtered.filter(recipe => {
                const timeValue = parseInt(recipe.time) || 0
                return timeValue <= maxTime
            })
        }

        //  Ordenar
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0)
                case 'title':
                    return (a.title || '').localeCompare(b.title || '')
                case 'time-asc':
                    return (parseInt(a.time) || 0) - (parseInt(b.time) || 0)
                case 'time-desc':
                    return (parseInt(b.time) || 0) - (parseInt(a.time) || 0)
                case 'popular':
                    return (b.views || 0) - (a.views || 0)
                default: // recent
                    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            }
        })

        return filtered
    }, [allRecipes, searchQuery, selectedCategory, selectedDifficulty, selectedTime, sortBy])

    //  Paginación
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage)
    const paginatedRecipes = filteredRecipes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    //  Limpiar todos los filtros
    const clearFilters = useCallback(() => {
        setSearchQuery('')
        setSelectedCategory('all')
        setSelectedDifficulty('all')
        setSelectedTime('all')
        setSortBy('recent')
        setCurrentPage(1)
    }, [])

    //  Verificar si hay filtros activos
    const hasActiveFilters = searchQuery !== '' ||
        selectedCategory !== 'all' ||
        selectedDifficulty !== 'all' ||
        selectedTime !== 'all'

    return {
        recipes: paginatedRecipes,
        allRecipesCount: filteredRecipes.length,
        totalPages,
        currentPage,
        setCurrentPage,
        isLoading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
        selectedTime,
        setSelectedTime,
        sortBy,
        setSortBy,
        clearFilters,
        hasActiveFilters,
        availableCategories: allCategories,
    }
}
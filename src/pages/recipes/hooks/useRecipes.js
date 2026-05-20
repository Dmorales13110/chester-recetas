import { useState, useEffect, useMemo, useCallback } from 'react'

// Mock data - Recetas completas
const allRecipes = [
    {
        id: 1,
        title: 'Pasta al Pesto',
        category: 'Pastas',
        slug: 'pasta-al-pesto',
        time: '20 min',
        difficulty: 'Fácil',
        rating: 4.8,
        calories: 580,
        servings: 4,
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=300&fit=crop',
        ingredients: ['Pasta', 'Albahaca', 'Piñones', 'Ajo', 'Queso parmesano', 'Aceite de oliva'],
        description: 'Una deliciosa pasta italiana con salsa pesto casera, fresca y llena de sabor.'
    },
    {
        id: 2,
        title: 'Ensalada César',
        category: 'Ensaladas',
        slug: 'ensalada-cesar',
        time: '15 min',
        difficulty: 'Fácil',
        rating: 4.6,
        calories: 320,
        servings: 2,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54dd8ca?w=500&h=300&fit=crop',
        ingredients: ['Lechuga romana', 'Pollo', 'Crutones', 'Queso parmesano', 'Salsa César'],
        description: 'La clásica ensalada César con pollo a la plancha y crutones crujientes.'
    },
    {
        id: 3,
        title: 'Tarta de Queso',
        category: 'Postres',
        slug: 'tarta-de-queso',
        time: '45 min',
        difficulty: 'Media',
        rating: 4.9,
        calories: 420,
        servings: 8,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9589?w=500&h=300&fit=crop',
        ingredients: ['Galletas', 'Mantequilla', 'Queso crema', 'Azúcar', 'Huevos', 'Crema de leche'],
        description: 'Tarta de queso cremosa con base de galleta, horneada a la perfección.'
    },
    {
        id: 4,
        title: 'Paella Mixta',
        category: 'Arroces',
        slug: 'paella-mixta',
        time: '60 min',
        difficulty: 'Media',
        rating: 4.7,
        calories: 680,
        servings: 6,
        image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&h=300&fit=crop',
        ingredients: ['Arroz', 'Pollo', 'Conejo', 'Mariscos', 'Verduras', 'Azafrán'],
        description: 'La auténtica paella valenciana con mariscos y carne, llena de sabor y color.'
    },
    {
        id: 5,
        title: 'Huevos Rancheros',
        category: 'Desayunos',
        slug: 'huevos-rancheros',
        time: '25 min',
        difficulty: 'Fácil',
        rating: 4.5,
        calories: 450,
        servings: 2,
        image: 'https://images.unsplash.com/photo-1525351486363-ef6f36f1f6a4?w=500&h=300&fit=crop',
        ingredients: ['Huevos', 'Tortillas', 'Frijoles', 'Salsa roja', 'Aguacate'],
        description: 'Huevos fritos sobre tortillas con salsa de tomate y frijoles refritos.'
    },
    {
        id: 6,
        title: 'Sopa de Tomate',
        category: 'Sopas',
        slug: 'sopa-de-tomate',
        time: '30 min',
        difficulty: 'Fácil',
        rating: 4.4,
        calories: 180,
        servings: 4,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=300&fit=crop',
        ingredients: ['Tomates', 'Cebolla', 'Ajo', 'Caldo de verduras', 'Albahaca'],
        description: 'Sopa cremosa de tomate casera, perfecta para acompañar con crutones.'
    },
    {
        id: 7,
        title: 'Brownie de Chocolate',
        category: 'Postres',
        slug: 'brownie-de-chocolate',
        time: '35 min',
        difficulty: 'Fácil',
        rating: 4.9,
        calories: 380,
        servings: 9,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=300&fit=crop',
        ingredients: ['Chocolate', 'Mantequilla', 'Azúcar', 'Huevos', 'Harina', 'Nueces'],
        description: 'Brownies de chocolate súper húmedos con trozos de nuez.'
    },
    {
        id: 8,
        title: 'Ceviche Peruano',
        category: 'Pescados',
        slug: 'ceviche-peruano',
        time: '20 min',
        difficulty: 'Media',
        rating: 4.8,
        calories: 250,
        servings: 4,
        image: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=500&h=300&fit=crop',
        ingredients: ['Pescado blanco', 'Limón', 'Cebolla morada', 'Cilantro', 'Ají limo', 'Camote'],
        description: 'Ceviche fresco con pescado marinado en jugo de limón y ají.'
    },
    {
        id: 9,
        title: 'Risotto de Champiñones',
        category: 'Arroces',
        slug: 'risotto-de-champinones',
        time: '40 min',
        difficulty: 'Media',
        rating: 4.7,
        calories: 520,
        servings: 4,
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=300&fit=crop',
        ingredients: ['Arroz arborio', 'Champiñones', 'Caldo de verduras', 'Vino blanco', 'Queso parmesano'],
        description: 'Risotto cremoso de champiñones, un clásico italiano.'
    },
    {
        id: 10,
        title: 'Smoothie Bowl',
        category: 'Desayunos',
        slug: 'smoothie-bowl',
        time: '10 min',
        difficulty: 'Fácil',
        rating: 4.5,
        calories: 350,
        servings: 1,
        image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&h=300&fit=crop',
        ingredients: ['Plátano', 'Frutas congeladas', 'Leche vegetal', 'Granola', 'Frutos rojos'],
        description: 'Smoothie bowl nutritivo con frutas y granola.'
    },
]

// Categorías disponibles
export const availableCategories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'Desayunos', label: 'Desayunos' },
    { value: 'Ensaladas', label: 'Ensaladas' },
    { value: 'Pastas', label: 'Pastas' },
    { value: 'Postres', label: 'Postres' },
    { value: 'Arroces', label: 'Arroces' },
    { value: 'Sopas', label: 'Sopas' },
    { value: 'Pescados', label: 'Pescados' },
]

// Opciones de dificultad
export const difficultyOptions = [
    { value: 'all', label: 'Todas las dificultades' },
    { value: 'Fácil', label: 'Fácil' },
    { value: 'Media', label: 'Media' },
    { value: 'Difícil', label: 'Difícil' },
]

// Opciones de tiempo
export const timeOptions = [
    { value: 'all', label: 'Cualquier tiempo' },
    { value: '15', label: 'Menos de 15 min' },
    { value: '30', label: 'Menos de 30 min' },
    { value: '60', label: 'Menos de 60 min' },
]

// Opciones de ordenamiento
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
    const itemsPerPage = 9

    // Simular carga
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    // Resetear página cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategory, selectedDifficulty, selectedTime, sortBy])

    // Filtrar recetas
    const filteredRecipes = useMemo(() => {
        let filtered = [...allRecipes]

        // Búsqueda por texto
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
            )
        }

        // Filtrar por categoría
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(recipe => recipe.category === selectedCategory)
        }

        // Filtrar por dificultad
        if (selectedDifficulty !== 'all') {
            filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty)
        }

        // Filtrar por tiempo
        if (selectedTime !== 'all') {
            const maxTime = parseInt(selectedTime)
            filtered = filtered.filter(recipe => {
                const timeValue = parseInt(recipe.time)
                return timeValue <= maxTime
            })
        }

        // Ordenar
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating
                case 'title':
                    return a.title.localeCompare(b.title)
                case 'time-asc':
                    return parseInt(a.time) - parseInt(b.time)
                case 'time-desc':
                    return parseInt(b.time) - parseInt(a.time)
                default: // recent
                    return b.id - a.id
            }
        })

        return filtered
    }, [searchQuery, selectedCategory, selectedDifficulty, selectedTime, sortBy])

    // Paginación
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage)
    const paginatedRecipes = filteredRecipes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    // Limpiar todos los filtros
    const clearFilters = useCallback(() => {
        setSearchQuery('')
        setSelectedCategory('all')
        setSelectedDifficulty('all')
        setSelectedTime('all')
        setSortBy('recent')
    }, [])

    // Verificar si hay filtros activos
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
    }
}
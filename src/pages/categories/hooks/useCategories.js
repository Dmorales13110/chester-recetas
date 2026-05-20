import { useState, useEffect, useMemo } from 'react'

// Datos de categorías
const allCategories = [
    {
        id: 1,
        name: 'Desayunos',
        slug: 'desayunos',
        icon: 'Coffee',
        color: 'yellow',
        description: 'Comienza tu día con energía y sabor',
        longDescription: 'Recetas fáciles y nutritivas para empezar el día con la mejor energía. Desde tazones de avena hasta huevos rancheros.',
        count: 24,
        featured: true,
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=500&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop',
        gradient: 'linear-gradient(135deg, #f5af19, #f12711)',
        popularRecipes: ['Huevos Rancheros', 'Panqueques', 'Smoothie Bowl'],
    },
    {
        id: 2,
        name: 'Ensaladas',
        slug: 'ensaladas',
        icon: 'Salad',
        color: 'green',
        description: 'Frescas, saludables y coloridas',
        longDescription: 'Ensaladas creativas que no aburren. Ingredientes frescos, aderezos caseros y combinaciones únicas.',
        count: 18,
        featured: true,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
        popularRecipes: ['César', 'Griega', 'Quinoa'],
    },
    {
        id: 3,
        name: 'Pastas',
        slug: 'pastas',
        icon: 'Pizza',
        color: 'orange',
        description: 'Platos italianos irresistibles',
        longDescription: 'Pastas frescas, salsas caseras y los mejores sabores de Italia. Desde carbonara hasta pesto.',
        count: 32,
        featured: true,
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&h=500&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop',
        gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
        popularRecipes: ['Pasta al Pesto', 'Carbonara', 'Boloñesa'],
    },
    {
        id: 4,
        name: 'Postres',
        slug: 'postres',
        icon: 'Cake',
        color: 'pink',
        description: 'Dulces tentaciones para consentirte',
        longDescription: 'Postres caseros que endulzan cualquier ocasión. Tartas, pasteles, brownies y más.',
        count: 45,
        featured: true,
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=500&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
        gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
        popularRecipes: ['Tarta de Queso', 'Brownie', 'Flan'],
    },
    {
        id: 5,
        name: 'Cenas',
        slug: 'cenas',
        icon: 'Soup',
        color: 'red',
        description: 'Platos principales para la noche',
        longDescription: 'Cenas completas y deliciosas para compartir en familia. Pollo, pescado, carnes y vegetarianas.',
        count: 28,
        featured: false,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=500&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
        gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
        popularRecipes: ['Pollo al horno', 'Lasagna', 'Pescado a la plancha'],
    },
    {
        id: 6,
        name: 'Sopas',
        slug: 'sopas',
        icon: 'Soup',
        color: 'blue',
        description: 'Calientes y reconfortantes',
        longDescription: 'Sopas y cremas para los días fríos. Recetas nutritivas y llenas de sabor.',
        count: 15,
        featured: false,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=500&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
        gradient: 'linear-gradient(135deg, #00b4db, #0083b0)',
        popularRecipes: ['Sopa de Tomate', 'Crema de Calabaza', 'Sopa de Pollo'],
    },
    {
        id: 7,
        name: 'Pescados',
        slug: 'pescados',
        icon: 'Fish',
        color: 'cyan',
        description: 'Recetas del mar llenas de sabor',
        longDescription: 'Pescados y mariscos preparados de formas deliciosas. Saludables y rápidos.',
        count: 12,
        featured: false,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=500&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
        gradient: 'linear-gradient(135deg, #1e3c72, #2a5298)',
        popularRecipes: ['Salmón a la plancha', 'Ceviche', 'Pescado al horno'],
    },
    {
        id: 8,
        name: 'Carnes',
        slug: 'carnes',
        icon: 'Beef',
        color: 'brown',
        description: 'Cortes y preparaciones irresistibles',
        longDescription: 'Carnes jugosas y llenas de sabor. Técnicas de cocción y acompañamientos perfectos.',
        count: 22,
        featured: false,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&h=500&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=300&fit=crop',
        gradient: 'linear-gradient(135deg, #c31432, #240b36)',
        popularRecipes: ['Lomo saltado', 'Costillas BBQ', 'Carne al horno'],
    },
]

// Categorías destacadas (aparecen al inicio)
const featuredCategories = allCategories.filter(cat => cat.featured)
const regularCategories = allCategories.filter(cat => !cat.featured)

export const useCategories = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setCategories(allCategories)
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const filteredCategories = useMemo(() => {
        if (!searchQuery) return categories
        const query = searchQuery.toLowerCase()
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(query) ||
            cat.description.toLowerCase().includes(query) ||
            cat.longDescription.toLowerCase().includes(query)
        )
    }, [categories, searchQuery])

    const filteredFeatured = useMemo(() => {
        return featuredCategories.filter(cat =>
            !searchQuery || cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    const filteredRegular = useMemo(() => {
        return regularCategories.filter(cat =>
            !searchQuery || cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    const totalRecipes = categories.reduce((sum, cat) => sum + cat.count, 0)
    const totalCategories = categories.length

    return {
        categories: filteredCategories,
        featuredCategories: filteredFeatured,
        regularCategories: filteredRegular,
        isLoading,
        searchQuery,
        setSearchQuery,
        totalRecipes,
        totalCategories,
    }
}
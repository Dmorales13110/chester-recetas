import { useState, useEffect, useCallback } from 'react'
import { recipeService, categoryService } from '../../../services'
import chesterimg from '../../../assets/image.png'

const heroBackgrounds = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1920&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1920&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop',
    chesterimg
]

// Testimonios mock
const testimonials = [
    {
        id: 1,
        name: 'Laura Fernández',
        role: 'Cocinera aficionada',
        text: 'Las recetas son increíblemente fáciles de seguir. ¡Mi familia cree que me volví chef profesional!',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
        id: 2,
        name: 'Miguel Torres',
        role: 'Foodie',
        text: 'La mejor plataforma de recetas que he probado. Los videos paso a paso son muy útiles.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
        id: 3,
        name: 'Sofia Mendoza',
        role: 'Chef casera',
        text: 'Me encanta la variedad de recetas. Siempre encuentro algo nuevo para sorprender a mi familia.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
]

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
    'Arroces': 'Utensils',
    'Bebidas': 'Coffee',
    'Quesos': 'Cheese',
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

export const useHomePage = () => {
    const [email, setEmail] = useState('')
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [featuredRecipes, setFeaturedRecipes] = useState([])
    const [categories, setCategories] = useState([])

    // Función para mapear receta de la API al formato del componente
    const mapRecipeToFormat = (recipe) => ({
        id: recipe.id,
        title: recipe.nombre || 'Receta sin título',
        category: recipe.id_categoria ? 'General' : 'General',
        time: `${recipe.tiempo_total || 30} min`,
        difficulty: recipe.dificultad || 'Media',
        rating: recipe.rating || 0,
        image: recipe.imagen || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
        description: recipe.descripcion || '',
    })

    //  Función para mapear categoría de la API al formato del componente
    const mapCategoryToFormat = (category) => {
        //  Calcular el número de recetas para esta categoría
        // Contamos cuántas recetas tienen esta categoría
        const count = category.recetas_count || category.recetas?.length || 0
        
        return {
            id: category.id,
            name: category.nombre,
            slug: category.nombre?.toLowerCase().replace(/\s/g, '-') || '',
            iconName: iconMap[category.nombre] || 'Utensils',
            color: colorMap[category.nombre] || 'gray',
            count: count,
            description: category.descripcion || `Recetas de ${category.nombre}`,
            featured: false,
            image: category.imagen || '',
            thumbnail: category.imagen || '',
            gradient: 'linear-gradient(135deg, #e67e22, #f39c12)',
            popularRecipes: []
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                //  Obtener todas las recetas para contar por categoría
                const allRecipesData = await recipeService.getRecipes(0, 100)
                const allRecipes = allRecipesData || []
                
                //  Obtener categorías
                const categoriesData = await categoryService.getCategories()
                
                //  Mapear categorías con conteo de recetas
                const mappedCategories = (categoriesData || []).map(cat => {
                    // Contar recetas que pertenecen a esta categoría
                    const count = allRecipes.filter(r => r.id_categoria === cat.id).length
                    return {
                        id: cat.id,
                        name: cat.nombre,
                        slug: cat.nombre?.toLowerCase().replace(/\s/g, '-') || '',
                        iconName: iconMap[cat.nombre] || 'Utensils',
                        color: colorMap[cat.nombre] || 'gray',
                        count: count, //  Conteo real
                        description: cat.descripcion || `Recetas de ${cat.nombre}`,
                        featured: false,
                        image: cat.imagen || '',
                        thumbnail: cat.imagen || '',
                        gradient: 'linear-gradient(135deg, #e67e22, #f39c12)',
                        popularRecipes: []
                    }
                })
                setCategories(mappedCategories)
                
                // Obtener recetas destacadas
                const recipesData = await recipeService.getRecipes(0, 4)
                const mappedRecipes = (recipesData || []).map(mapRecipeToFormat)
                setFeaturedRecipes(mappedRecipes)
                
            } catch (error) {
                console.error('Error al cargar datos del home:', error)
                setFeaturedRecipes([])
                setCategories([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % heroBackgrounds.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const handleSubscribe = useCallback(() => {
        if (email && email.includes('@')) {
            console.log('Suscripción:', email)
            setEmail('')
            alert('¡Gracias por suscribirte!')
        }
    }, [email])

    return {
        email,
        setEmail,
        currentHeroIndex,
        isLoading,
        featuredRecipes,
        categories,
        testimonials,
        heroBackgrounds,
        handleSubscribe,
    }
}
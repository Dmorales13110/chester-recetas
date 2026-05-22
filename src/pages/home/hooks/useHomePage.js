import { useState, useEffect, useCallback } from 'react'
import chesterimg from '../../../assets/image.png'

// Mock data
const featuredRecipes = [
    {
        id: 1,
        title: 'Pasta al Pesto',
        category: 'Pastas',
        time: '20 min',
        difficulty: 'Fácil',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=300&fit=crop',
    },
    {
        id: 2,
        title: 'Ensalada César',
        category: 'Ensaladas',
        time: '15 min',
        difficulty: 'Fácil',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54dd8ca?w=500&h=300&fit=crop',
    },
    {
        id: 3,
        title: 'Tarta de Queso',
        category: 'Postres',
        time: '45 min',
        difficulty: 'Media',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9589?w=500&h=300&fit=crop',
    },
    {
        id: 4,
        title: 'Paella Mixta',
        category: 'Arroces',
        time: '60 min',
        difficulty: 'Media',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&h=300&fit=crop',
    },
]

const categories = [
    { id: 1, name: 'Desayunos', iconName: 'Coffee', color: 'yellow', count: 24 },
    { id: 2, name: 'Ensaladas', iconName: 'Salad', color: 'green', count: 18 },
    { id: 3, name: 'Pastas', iconName: 'Pizza', color: 'orange', count: 32 },
    { id: 4, name: 'Postres', iconName: 'Cake', color: 'pink', count: 45 },
    { id: 5, name: 'Cenas', iconName: 'Soup', color: 'red', count: 28 },
    { id: 6, name: 'Bebidas', iconName: 'Coffee', color: 'blue', count: 15 },
]

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

const heroBackgrounds = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1920&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1920&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop',
    chesterimg
]

export const useHomePage = () => {
    const [email, setEmail] = useState('')
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
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
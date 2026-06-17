import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Image, Text, Badge, Group, Stack } from '@mantine/core'
import { Clock, Star, ChefHat } from 'lucide-react'

const recipes = [
    {
        id: 1,
        title: 'Pasta al Pesto',
        category: 'Pastas',
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&h=200&fit=crop',
        time: '20 min',
        rating: 4.8,
    },
    {
        id: 2,
        title: 'Ensalada César',
        category: 'Ensaladas',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54dd8ca?w=300&h=200&fit=crop',
        time: '15 min',
        rating: 4.6,
    },
    {
        id: 3,
        title: 'Tarta de Queso',
        category: 'Postres',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9589?w=300&h=200&fit=crop',
        time: '45 min',
        rating: 4.9,
    },
    {
        id: 4,
        title: 'Paella Mixta',
        category: 'Arroces',
        image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=300&h=200&fit=crop',
        time: '60 min',
        rating: 4.7,
    },
]

const RecipeCardsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(2)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % recipes.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setVisibleCards(window.innerWidth < 768 ? 1 : 2)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const getVisibleRecipes = () => {
        const result = []
        for (let i = 0; i < visibleCards; i++) {
            const index = (currentIndex + i) % recipes.length
            result.push(recipes[index])
        }
        return result
    }

    return (
        <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 16,
                minHeight: 220,
            }}>
                <AnimatePresence mode="popLayout">
                    {getVisibleRecipes().map((recipe, idx) => (
                        <motion.div
                            key={`${recipe.id}-${currentIndex}`}
                            layout
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -50, scale: 0.9 }}
                            transition={{ 
                                duration: 0.5,
                                delay: idx * 0.1,
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                            style={{ 
                                flex: 1,
                                maxWidth: visibleCards === 1 ? '100%' : '50%',
                            }}
                        >
                            <Card
                                withBorder
                                padding="md"
                                radius="lg"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--border)',
                                    transition: 'all 0.3s',
                                    height: '100%',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)'
                                    e.currentTarget.style.borderColor = '#e67e22'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                }}
                            >
                                <Card.Section>
                                    <Image
                                        src={recipe.image}
                                        height={120}
                                        fit="cover"
                                        alt={recipe.title}
                                    />
                                </Card.Section>
                                <Group justify="space-between" mt="md" mb="xs">
                                    <Text fw={600} size="sm" lineClamp={1} style={{ color: 'var(--text-h)' }}>
                                        {recipe.title}
                                    </Text>
                                    <Badge color="orange" variant="light" size="sm">
                                        {recipe.category}
                                    </Badge>
                                </Group>
                                <Group gap="xs">
                                    <Group gap={2}>
                                        <Clock size={12} style={{ color: 'var(--text-secondary)' }} />
                                        <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                            {recipe.time}
                                        </Text>
                                    </Group>
                                    <Group gap={2}>
                                        <Star size={12} style={{ color: '#f59e0b' }} />
                                        <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                            {recipe.rating}
                                        </Text>
                                    </Group>
                                </Group>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Indicadores */}
            <Group justify="center" gap="xs" mt="md">
                {recipes.map((_, idx) => (
                    <motion.div
                        key={idx}
                        animate={{
                            scale: idx === currentIndex % recipes.length ? 1.2 : 1,
                            backgroundColor: idx === currentIndex % recipes.length 
                                ? '#e67e22' 
                                : 'var(--border)',
                        }}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                        }}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </Group>
        </div>
    )
}

export default RecipeCardsCarousel
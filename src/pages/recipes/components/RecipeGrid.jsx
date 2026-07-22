import { useState, useEffect } from 'react'
import { SimpleGrid, Card, Text, Badge, Image, Group, Rating, Button, ActionIcon, Box } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Clock, Zap, Bookmark, Heart, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { favoriteService } from '../../../services'

const RecipeGrid = ({ recipes, onFavoriteChange }) => {
    const [hoveredId, setHoveredId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [favorites, setFavorites] = useState([])
    const [liked, setLiked] = useState({})

    // Cargar favoritos al montar el componente
    useEffect(() => {
        const loadFavorites = async () => {
            const token = localStorage.getItem('accessToken')
            if (!token) return

            try {
                const favData = await favoriteService.getFavorites()
                setFavorites(favData || [])
            } catch (error) {
                console.error('Error al cargar favoritos:', error)
            }
        }
        loadFavorites()
    }, [])

    // Verificar si una receta es favorita
    const isFavorite = (recipeId) => {
        return favorites.some(f => f.id_receta === recipeId || f.receta_id === recipeId)
    }

    //  Alternar favorito con actualización en tiempo real
    const toggleFavorite = async (recipeId, e) => {
        e.preventDefault()
        e.stopPropagation()

        const token = localStorage.getItem('accessToken')
        if (!token) {
            alert('Inicia sesión para guardar favoritos')
            return
        }

        setIsLoading(true)
        try {
            await favoriteService.toggleFavorite(recipeId)
            
            //  Actualizar lista de favoritos localmente
            const isCurrentlyFavorite = isFavorite(recipeId)
            let updatedFavorites
            if (isCurrentlyFavorite) {
                // Si era favorito, lo removemos
                updatedFavorites = favorites.filter(f => 
                    f.id_receta !== recipeId && f.receta_id !== recipeId
                )
            } else {
                // Si no era favorito, lo agregamos (simulamos la respuesta)
                updatedFavorites = [...favorites, { id_receta: recipeId, receta_id: recipeId }]
            }
            setFavorites(updatedFavorites)
        
            //  Notificar al componente padre que hubo un cambio
            if (onFavoriteChange) {
                onFavoriteChange(recipeId, !isCurrentlyFavorite)
            }
        } catch (error) {
            console.error('Error al alternar favorito:', error)
            // Recargar favoritos para asegurar consistencia
            const favData = await favoriteService.getFavorites()
            setFavorites(favData || [])
        } finally {
            setIsLoading(false)
        }
    }

    // Alternar "me gusta" (local)
    const toggleLiked = (id, e) => {
        e.preventDefault()
        e.stopPropagation()
        setLiked(prev => ({ ...prev, [id]: !prev[id] }))
    }

    if (recipes.length === 0) {
        return (
            <Box ta="center" py="xl">
                <Text size="lg" style={{ color: 'var(--text-secondary)' }}>No se encontraron recetas</Text>
                <Text size="sm" style={{ color: 'var(--text-secondary)' }}>Intenta con otros filtros de búsqueda</Text>
            </Box>
        )
    }

    return (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {recipes.map((recipe, idx) => {
                const isHovered = hoveredId === recipe.id
                const isBlurred = hoveredId !== null && hoveredId !== recipe.id
                const isFav = isFavorite(recipe.id)
                const isLiked = liked[recipe.id] || false

                return (
                    <motion.div
                        key={recipe.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onMouseEnter={() => setHoveredId(recipe.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                            filter: isBlurred ? 'blur(3px)' : 'blur(0px)',
                            transition: 'filter 0.3s ease-in-out',
                            cursor: 'pointer',
                        }}
                    >
                        <Card
                            withBorder
                            shadow="sm"
                            radius="xl"
                            padding="md"
                            style={{
                                background: 'var(--card-bg)',
                                borderColor: 'var(--border)',
                                height: '100%',
                                transition: 'all 0.3s',
                                boxShadow: 'var(--shadow)'
                            }}
                        >
                            <Card.Section>
                                <div style={{ position: 'relative' }}>
                                    <Image
                                        src={recipe.image}
                                        height={200}
                                        fit="cover"
                                        alt={recipe.title}
                                        style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                                    />
                                    <Badge
                                        pos="absolute"
                                        top={12}
                                        right={12}
                                        color="orange"
                                        variant="filled"
                                        leftSection={<Star size={10} />}
                                    >
                                        {recipe.rating}
                                    </Badge>
                                    {/*  Heart - Solo "me gusta" local */}
                                    <ActionIcon
                                        variant="light"
                                        color="red"
                                        size="lg"
                                        style={{ 
                                            position: 'absolute', 
                                            bottom: 12, 
                                            right: 12,
                                            backgroundColor: isLiked ? '#ef4444' : 'rgba(0,0,0,0.6)',
                                            color: 'white',
                                            transition: 'all 0.3s ease',
                                            zIndex: 2,
                                        }}
                                        onClick={(e) => toggleLiked(recipe.id, e)}
                                        radius="xl"
                                    >
                                        <Heart 
                                            size={18} 
                                            fill={isLiked ? 'white' : 'none'} 
                                        />
                                    </ActionIcon>
                                </div>
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={700} size="md" lineClamp={1} style={{ color: 'var(--text-h)' }}>{recipe.title}</Text>
                                <Badge color="orange" variant="light">{recipe.category}</Badge>
                            </Group>

                            <Text size="sm" lineClamp={2} mb="xs" style={{ color: 'var(--text-secondary)' }}>
                                {recipe.description}
                            </Text>

                            <Rating value={recipe.rating} readOnly size="sm" mb="xs" />

                            <Group gap="xs" mb="md">
                                <Group gap={4}>
                                    <Clock size={14} style={{ color: 'var(--text-secondary)' }} />
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{recipe.time}</Text>
                                </Group>
                                <Group gap={4}>
                                    <Zap size={14} style={{ color: 'var(--text-secondary)' }} />
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{recipe.difficulty}</Text>
                                </Group>
                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>• {recipe.calories} kcal</Text>
                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>• {recipe.servings} pers</Text>
                            </Group>

                            <Group grow>
                                <Button
                                    component={Link}
                                    to={`/receta/${recipe.id}`}
                                    variant="light"
                                    color="orange"
                                    radius="xl"
                                    size="sm"
                                >
                                    Ver receta
                                </Button>
                                {/*  Bookmark - Guardar favorito en la API */}
                                <ActionIcon
                                    variant={isFav ? "filled" : "light"}
                                    size={36}
                                    radius="xl"
                                    onClick={(e) => toggleFavorite(recipe.id, e)}
                                    loading={isLoading}
                                    style={{
                                        backgroundColor: isFav
                                            ? '#f59e0b'
                                            : 'var(--accent-bg)',
                                        color: isFav
                                            ? 'white'
                                            : 'var(--text-secondary)',
                                        border: isFav
                                            ? 'none'
                                            : '1px solid var(--border)',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isFav) {
                                            e.currentTarget.style.backgroundColor = 'var(--accent-bg)'
                                            e.currentTarget.style.color = 'var(--accent)'
                                            e.currentTarget.style.borderColor = 'var(--accent)'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isFav) {
                                            e.currentTarget.style.backgroundColor = 'var(--accent-bg)'
                                            e.currentTarget.style.color = 'var(--text-secondary)'
                                            e.currentTarget.style.borderColor = 'var(--border)'
                                        }
                                    }}
                                >
                                    <Bookmark
                                        size={16}
                                        fill={isFav ? 'white' : 'none'}
                                    />
                                </ActionIcon>
                            </Group>
                        </Card>
                    </motion.div>
                )
            })}
        </SimpleGrid>
    )
}

export default RecipeGrid
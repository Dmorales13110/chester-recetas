import { useState } from 'react'
import { SimpleGrid, Card, Text, Badge, Image, Group, Rating, Button, ActionIcon, Box } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Clock, Zap, Bookmark, Heart, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const RecipeGrid = ({ recipes }) => {
    const [saved, setSaved] = useState({})
    const [liked, setLiked] = useState({})
    const [hoveredId, setHoveredId] = useState(null)

    const toggleSaved = (id) => setSaved(prev => ({ ...prev, [id]: !prev[id] }))
    const toggleLiked = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }))

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
                                    <ActionIcon
                                        variant="light"
                                        color="red"
                                        size="lg"
                                        style={{ position: 'absolute', bottom: 12, right: 12 }}
                                        onClick={() => toggleLiked(recipe.id)}
                                        radius="xl"
                                    >
                                        <Heart size={18} fill={liked[recipe.id] ? 'red' : 'none'} />
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
                                <ActionIcon
                                    variant={saved[recipe.id] ? "filled" : "light"}
                                    color={saved[recipe.id] ? "teal" : "gray"}
                                    size={36}
                                    radius="xl"
                                    onClick={() => toggleSaved(recipe.id)}
                                    style={{
                                        backgroundColor: saved[recipe.id]
                                            ? '#14b8a6'
                                            : 'var(--accent-bg)',
                                        color: saved[recipe.id]
                                            ? 'white'
                                            : 'var(--text-secondary)',
                                        border: saved[recipe.id]
                                            ? 'none'
                                            : '1px solid var(--border)',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!saved[recipe.id]) {
                                            e.currentTarget.style.backgroundColor = 'var(--accent-bg)'
                                            e.currentTarget.style.color = 'var(--accent)'
                                            e.currentTarget.style.borderColor = 'var(--accent)'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!saved[recipe.id]) {
                                            e.currentTarget.style.backgroundColor = 'var(--accent-bg)'
                                            e.currentTarget.style.color = 'var(--text-secondary)'
                                            e.currentTarget.style.borderColor = 'var(--border)'
                                        }
                                    }}
                                >
                                    <Bookmark
                                        size={16}
                                        fill={saved[recipe.id] ? 'white' : 'none'}
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
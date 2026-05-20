import { SimpleGrid, Card, Text, Badge, Image, Group, Rating, Button, ActionIcon, Box } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Clock, Zap, Bookmark, Heart, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

//grid para distrubir las recetas
const RecipeGrid = ({ recipes }) => {
    const [saved, setSaved] = useState({})
    const [liked, setLiked] = useState({})

    const toggleSaved = (id) => setSaved(prev => ({ ...prev, [id]: !prev[id] }))
    const toggleLiked = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }))

    if (recipes.length === 0) {
        return (
            <Box ta="center" py="xl">
                <Text size="lg" c="dimmed">No se encontraron recetas</Text>
                <Text size="sm" c="dimmed">Intenta con otros filtros de búsqueda</Text>
            </Box>
        )
    }

    return (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {recipes.map((recipe, idx) => (
                <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    whileHover={{ y: -8 }}
                >
                    <Card withBorder shadow="sm" radius="xl" padding="md" bg="white" style={{ height: '100%', transition: 'all 0.3s' }}>
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
                            <Text fw={700} size="md" lineClamp={1} c="#333">{recipe.title}</Text>
                            <Badge color="orange" variant="light">{recipe.category}</Badge>
                        </Group>

                        <Text size="sm" c="dimmed" lineClamp={2} mb="xs">
                            {recipe.description}
                        </Text>

                        <Rating value={recipe.rating} readOnly size="sm" mb="xs" />

                        <Group gap="xs" mb="md">
                            <Group gap={4}>
                                <Clock size={14} color="#666" />
                                <Text size="xs" c="#666">{recipe.time}</Text>
                            </Group>
                            <Group gap={4}>
                                <Zap size={14} color="#666" />
                                <Text size="xs" c="#666">{recipe.difficulty}</Text>
                            </Group>
                            <Text size="xs" c="#666">• {recipe.calories} kcal</Text>
                            <Text size="xs" c="#666">• {recipe.servings} pers</Text>
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
                                variant="light"
                                color="teal"
                                size={36}
                                radius="xl"
                                onClick={() => toggleSaved(recipe.id)}
                            >
                                <Bookmark size={16} fill={saved[recipe.id] ? 'teal' : 'none'} />
                            </ActionIcon>
                        </Group>
                    </Card>
                </motion.div>
            ))}
        </SimpleGrid>
    )
}

export default RecipeGrid
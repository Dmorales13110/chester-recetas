import { Paper, Title, Text, SimpleGrid, Card, Image, Group, Badge, Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Clock, Zap, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

// Todas las recetas para relacionar
const allRecipesData = [
    { id: 1, title: 'Pasta al Pesto', category: 'Pastas', time: '20 min', difficulty: 'Fácil', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&h=200&fit=crop' },
    { id: 2, title: 'Ensalada César', category: 'Ensaladas', time: '15 min', difficulty: 'Fácil', image: 'https://images.unsplash.com/photo-1550304943-4f24f54dd8ca?w=300&h=200&fit=crop' },
    { id: 3, title: 'Tarta de Queso', category: 'Postres', time: '45 min', difficulty: 'Media', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9589?w=300&h=200&fit=crop' },
    { id: 4, title: 'Paella Mixta', category: 'Arroces', time: '60 min', difficulty: 'Media', image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=300&h=200&fit=crop' },
    { id: 5, title: 'Huevos Rancheros', category: 'Desayunos', time: '25 min', difficulty: 'Fácil', image: 'https://images.unsplash.com/photo-1525351486363-ef6f36f1f6a4?w=300&h=200&fit=crop' },
    { id: 6, title: 'Sopa de Tomate', category: 'Sopas', time: '30 min', difficulty: 'Fácil', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop' },
    { id: 7, title: 'Brownie de Chocolate', category: 'Postres', time: '35 min', difficulty: 'Fácil', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop' },
    { id: 8, title: 'Ceviche Peruano', category: 'Pescados', time: '20 min', difficulty: 'Media', image: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=300&h=200&fit=crop' },
    { id: 9, title: 'Risotto de Champiñones', category: 'Arroces', time: '40 min', difficulty: 'Media', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=200&fit=crop' },
    { id: 10, title: 'Smoothie Bowl', category: 'Desayunos', time: '10 min', difficulty: 'Fácil', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300&h=200&fit=crop' },
]

const RelatedRecipes = ({ currentRecipeId, category }) => {
    const relatedRecipes = allRecipesData
        .filter(r => r.id !== currentRecipeId && r.category === category)
        .slice(0, 3)

    if (relatedRecipes.length === 0) return null

    return (
        <Paper
            withBorder
            p="xl"
            radius="xl"
            style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border)'
            }}
        >
            <Title order={3} mb="lg" style={{ color: 'var(--text-h)' }}>
                También te puede interesar
            </Title>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {relatedRecipes.map((recipe, idx) => (
                    <motion.div
                        key={recipe.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card
                            component={Link}
                            to={`/receta/${recipe.id}`}
                            withBorder
                            padding="md"
                            radius="xl"
                            style={{
                                textDecoration: 'none',
                                transition: 'all 0.3s',
                                background: 'var(--card-bg)',
                                borderColor: 'var(--border)',
                                height: '100%',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
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
                                    height={160}
                                    fit="cover"
                                    alt={recipe.title}
                                />
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={700} size="md" lineClamp={1} style={{ color: 'var(--text-h)' }}>
                                    {recipe.title}
                                </Text>
                                <Badge color="orange" variant="light">{recipe.category}</Badge>
                            </Group>

                            <Group gap="xs" mb="md">
                                <Group gap={4}>
                                    <Clock size={14} style={{ color: 'var(--text-secondary)' }} />
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{recipe.time}</Text>
                                </Group>
                                <Group gap={4}>
                                    <Zap size={14} style={{ color: 'var(--text-secondary)' }} />
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{recipe.difficulty}</Text>
                                </Group>
                            </Group>

                            <Button
                                variant="subtle"
                                color="orange"
                                radius="xl"
                                fullWidth
                                rightSection={<ArrowRight size={16} />}
                            >
                                Ver receta
                            </Button>
                        </Card>
                    </motion.div>
                ))}
            </SimpleGrid>
        </Paper>
    )
}

export default RelatedRecipes
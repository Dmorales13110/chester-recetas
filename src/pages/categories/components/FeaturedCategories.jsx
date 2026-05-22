import { Title, Text, SimpleGrid, Card, Group, ThemeIcon, Badge, Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Coffee, Salad, Pizza, Cake, Soup, Fish, Beef, UtensilsCrossed } from 'lucide-react'

const iconMap = {
    Coffee: <Coffee size={24} />,
    Salad: <Salad size={24} />,
    Pizza: <Pizza size={24} />,
    Cake: <Cake size={24} />,
    Soup: <Soup size={24} />,
    Fish: <Fish size={24} />,
    Beef: <Beef size={24} />,
    UtensilsCrossed: <UtensilsCrossed size={24} />,
}

const FeaturedCategories = ({ categories }) => {
    if (categories.length === 0) return null

    return (
        <>
            <Group justify="space-between" mb="lg">
                <div>
                    <Title order={2} style={{ color: 'var(--text-h)' }}>Categorías destacadas</Title>
                    <Text style={{ color: 'var(--text-secondary)' }}>Las favoritas de nuestra comunidad</Text>
                </div>
                <Button
                    component={Link}
                    to="/recetas"
                    variant="subtle"
                    color="orange"
                    rightSection={<ArrowRight size={16} />}
                >
                    Ver todas
                </Button>
            </Group>

            <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="lg" mb="xl">
                {categories.slice(0, 4).map((category, idx) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                    >
                        <Card
                            component={Link}
                            to={`/recetas?categoria=${category.slug}`}
                            withBorder
                            padding="lg"
                            radius="xl"
                            style={{
                                cursor: 'pointer',
                                textDecoration: 'none',
                                height: '100%',
                                transition: 'all 0.3s',
                                background: 'var(--card-bg)',
                                borderColor: 'var(--border)'
                            }}
                        >
                            <Group justify="space-between" align="flex-start" mb="md">
                                <ThemeIcon
                                    size={50}
                                    radius="xl"
                                    color={category.color}
                                    variant="light"
                                >
                                    {iconMap[category.icon] || <UtensilsCrossed size={24} />}
                                </ThemeIcon>
                                <Badge color={category.color} variant="light" radius="xl">
                                    {category.count} recetas
                                </Badge>
                            </Group>

                            <Text fw={700} size="lg" mb="xs" style={{ color: 'var(--text-h)' }}>
                                {category.name}
                            </Text>
                            <Text size="sm" mb="md" lineClamp={2} style={{ color: 'var(--text-secondary)' }}>
                                {category.description}
                            </Text>

                            <Group gap={4} mt="auto">
                                <Text size="xs" c="orange" fw={500}>Explorar</Text>
                                <ArrowRight size={14} color="#e67e22" />
                            </Group>
                        </Card>
                    </motion.div>
                ))}
            </SimpleGrid>
        </>
    )
}

export default FeaturedCategories
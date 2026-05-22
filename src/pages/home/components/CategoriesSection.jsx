import { Title, Button, Group, SimpleGrid, Card, Text, ThemeIcon, Badge } from '@mantine/core'
import {
    ArrowRight, Coffee, Salad, Pizza, Cake, Soup, Utensils,
    Cookie, Fish, Beef, Egg, Heart, Apple, Carrot,
    Clock, Flame, Star, ChefHat, Award
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Mapa de iconos
const iconMap = {
    // Desayunos y bebidas
    'Coffee': <Coffee size={28} />,
    'Café': <Coffee size={28} />,
    'Desayunos': <Coffee size={28} />,
    'Bebidas': <Coffee size={28} />,

    // Ensaladas y verduras
    'Salad': <Salad size={28} />,
    'Ensaladas': <Salad size={28} />,
    'Verduras': <Carrot size={28} />,

    // Pastas y pizzas
    'Pizza': <Pizza size={28} />,
    'Pastas': <Pizza size={28} />,

    // Postres
    'Cake': <Cake size={28} />,
    'Postres': <Cake size={28} />,
    'Dulces': <Heart size={28} />,

    // Sopas
    'Soup': <Soup size={28} />,
    'Sopas': <Soup size={28} />,
    'Cremas': <Soup size={28} />,

    // Quesos
    'Cookie': <Cookie size={28} />,
    'Galletas': <Cookie size={28} />,

    // Pescados y mariscos
    'Fish': <Fish size={28} />,
    'Pescados': <Fish size={28} />,
    'Mariscos': <Fish size={28} />,

    // Carnes
    'Beef': <Beef size={28} />,
    'Carnes': <Beef size={28} />,
    'Cerdo': <Beef size={28} />,
    'Pollo': <Beef size={28} />,

    // Huevos
    'Egg': <Egg size={28} />,
    'Huevos': <Egg size={28} />,

    // Arroces
    'Arroces': <Star size={28} />,
    'Rice': <Star size={28} />,

    // Otros
    'Utensils': <Utensils size={28} />,
    'General': <ChefHat size={28} />,
    'Especialidades': <Award size={28} />,
}

const CategoriesSection = ({ categories }) => {
    const getIcon = (iconName) => {
        if (!iconName) return <Utensils size={28} />

        const icon = iconMap[iconName] || iconMap[iconName?.replace(/\s/g, '')] || iconMap[iconName?.toLowerCase()]

        if (!icon) {
            const nameLower = iconName?.toLowerCase() || ''
            if (nameLower.includes('desayuno') || nameLower.includes('café')) return <Coffee size={28} />
            if (nameLower.includes('ensalada')) return <Salad size={28} />
            if (nameLower.includes('pasta')) return <Pizza size={28} />
            if (nameLower.includes('postre') || nameLower.includes('dulce')) return <Cake size={28} />
            if (nameLower.includes('sopa') || nameLower.includes('crema')) return <Soup size={28} />
            if (nameLower.includes('queso')) return <Cheese size={28} />
            if (nameLower.includes('pescado')) return <Fish size={28} />
            if (nameLower.includes('carne')) return <Beef size={28} />
            if (nameLower.includes('huevo')) return <Egg size={28} />
            if (nameLower.includes('galleta')) return <Cookie size={28} />
            return <Utensils size={28} />
        }

        return icon
    }

    return (
        <>
            <Group justify="space-between" mb="lg">
                <div>
                    <Title order={2} style={{ color: 'var(--text-h)' }}>Categorías populares</Title>
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>Explora por tipo de cocina</Text>
                </div>
                <Button
                    component={Link}
                    to="/categorias"
                    variant="subtle"
                    color="orange"
                    rightSection={<ArrowRight size={16} />}
                    styles={{
                        root: {
                            color: 'var(--text)',
                            '&:hover': {
                                backgroundColor: 'var(--accent-bg)',
                                color: 'var(--accent)',
                            }
                        }
                    }}
                >
                    Ver todas
                </Button>
            </Group>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} mb={60}>
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                    >
                        <Card
                            component={Link}
                            to={`/recetas?categoria=${cat.slug}`}
                            withBorder
                            padding="lg"
                            radius="xl"
                            ta="center"
                            style={{
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                background: 'var(--card-bg)',
                                borderColor: 'var(--border)',
                                height: '100%',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent)'
                                e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <ThemeIcon
                                size={50}
                                radius="xl"
                                variant="light"
                                mx="auto"
                                style={{
                                    background: 'var(--accent-bg)',
                                    color: 'var(--accent)',
                                }}
                            >
                                {getIcon(cat.iconName)}
                            </ThemeIcon>
                            <Text fw={600} size="md" mt="md" style={{ color: 'var(--text-h)' }}>
                                {cat.name}
                            </Text>
                            <Badge
                                variant="light"
                                size="sm"
                                mt={8}
                                style={{
                                    background: 'var(--accent-bg)',
                                    color: 'var(--accent)',
                                }}
                            >
                                {cat.count} recetas
                            </Badge>
                        </Card>
                    </motion.div>
                ))}
            </SimpleGrid>
        </>
    )
}

export default CategoriesSection
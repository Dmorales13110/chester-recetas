import { useState } from 'react'
import {
    Title,
    Text,
    SimpleGrid,
    Button,
    Group,
    ThemeIcon,
    Container,
    Paper,
    BackgroundImage,
    Box,
    Card,
    Badge,
    Rating,
    Image,
    Overlay,
    Avatar,
    ActionIcon
} from '@mantine/core'
import {
    ChefHat,
    Utensils,
    ArrowRight,
    Star,
    Clock,
    Users,
    Heart,
    Bookmark,
    Zap,
    Award,
    Coffee,
    Pizza,
    Salad,
    Cake,
    Soup,
    Sparkles,
    Play,
    Quote,
    Video,
    Mail,
} from 'lucide-react'
import { Link } from 'react-router-dom'

//mock data
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
    { name: 'Desayunos', icon: <Coffee size={28} />, color: 'yellow', count: 24 },
    { name: 'Ensaladas', icon: <Salad size={28} />, color: 'green', count: 18 },
    { name: 'Pastas', icon: <Pizza size={28} />, color: 'orange', count: 32 },
    { name: 'Postres', icon: <Cake size={28} />, color: 'pink', count: 45 },
    { name: 'Cenas', icon: <Soup size={28} />, color: 'red', count: 28 },
]

const testimonials = [
    {
        name: 'Laura Fernández',
        role: 'Cocinera aficionada',
        text: 'Las recetas son increíblemente fáciles de seguir. ¡Mi familia cree que me volví chef profesional!',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
        name: 'Miguel Torres',
        role: 'Foodie',
        text: 'La mejor plataforma de recetas que he probado. Los videos paso a paso son muy útiles.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
        name: 'Sofia Mendoza',
        role: 'Chef casera',
        text: 'Me encanta la variedad de recetas. Siempre encuentro algo nuevo para sorprender a mi familia.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
]

function HomePage() {
    const [email, setEmail] = useState('')

    return (
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: 60, marginTop: 20 }}>
                <ThemeIcon size={80} radius="xl" color="orange" variant="light" mx="auto" mb="md">
                    <ChefHat size={45} />
                </ThemeIcon>
                <Title order={1} size={48} mb="md">
                    Descubre las mejores recetas
                </Title>
                <Text size="xl" c="dimmed" mb="xl">
                    Fáciles, rápidas y deliciosas para toda la familia
                </Text>
                <Group justify="center">
                    <Button size="lg" radius="xl" color="orange" leftSection={<Utensils size={20} />}>
                        Explorar recetas
                    </Button>
                    <Button size="lg" radius="xl" variant="light" color="dark" leftSection={<Play size={20} />}>
                        Ver video
                    </Button>
                </Group>
            </div>

            {/* Stats */}
            <SimpleGrid cols={{ base: 1, sm: 3 }} mb={60}>
                <Paper withBorder p="xl" radius="xl" ta="center">
                    <ThemeIcon size={50} radius="xl" color="orange" variant="light" mx="auto" mb="md">
                        <Star size={24} />
                    </ThemeIcon>
                    <Title order={2} size={32}>+500</Title>
                    <Text size="sm" c="dimmed">Recetas verificadas</Text>
                </Paper>
                <Paper withBorder p="xl" radius="xl" ta="center">
                    <ThemeIcon size={50} radius="xl" color="green" variant="light" mx="auto" mb="md">
                        <Users size={24} />
                    </ThemeIcon>
                    <Title order={2} size={32}>+10k</Title>
                    <Text size="sm" c="dimmed">Usuarios activos</Text>
                </Paper>
                <Paper withBorder p="xl" radius="xl" ta="center">
                    <ThemeIcon size={50} radius="xl" color="teal" variant="light" mx="auto" mb="md">
                        <Clock size={24} />
                    </ThemeIcon>
                    <Title order={2} size={32}>30 min</Title>
                    <Text size="sm" c="dimmed">Tiempo promedio</Text>
                </Paper>
            </SimpleGrid>

            {/* Categories */}
            <Group justify="space-between" mb="lg">
                <Title order={2}>📂 Categorías populares</Title>
                <Button variant="subtle" color="orange" rightSection={<ArrowRight size={16} />}>
                    Ver todas
                </Button>
            </Group>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} mb={60}>
                {categories.map((cat) => (
                    <Card key={cat.name} withBorder padding="lg" radius="xl" ta="center" style={{ cursor: 'pointer' }}>
                        <ThemeIcon size={50} radius="xl" color={cat.color} variant="light" mx="auto">
                            {cat.icon}
                        </ThemeIcon>
                        <Text fw={600} size="md" mt="md">{cat.name}</Text>
                        <Text size="xs" c="dimmed" mt={4}>{cat.count} recetas</Text>
                    </Card>
                ))}
            </SimpleGrid>

            {/* Featured Recipes */}
            <Group justify="space-between" mb="lg">
                <Title order={2}>⭐ Recetas destacadas</Title>
                <Button variant="subtle" color="orange" rightSection={<ArrowRight size={16} />}>
                    Ver todas
                </Button>
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb={60}>
                {featuredRecipes.map((recipe) => (
                    <Card key={recipe.id} withBorder shadow="sm" radius="xl" padding="md">
                        <Card.Section>
                            <div style={{ position: 'relative' }}>
                                <Image src={recipe.image} height={180} fit="cover" alt={recipe.title} />
                                <Badge pos="absolute" top={12} right={12} color="orange" variant="filled">
                                    {recipe.rating} ★
                                </Badge>
                            </div>
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={700} size="md" lineClamp={1}>{recipe.title}</Text>
                            <Badge color="orange" variant="light">{recipe.category}</Badge>
                        </Group>
                        <Group gap="xs" mb="md">
                            <Group gap={4}><Clock size={14} /><Text size="xs" c="dimmed">{recipe.time}</Text></Group>
                            <Group gap={4}><Zap size={14} /><Text size="xs" c="dimmed">{recipe.difficulty}</Text></Group>
                        </Group>
                        <Group grow>
                            <Button variant="light" color="orange" radius="xl" size="sm">Ver receta</Button>
                            <ActionIcon variant="light" color="teal" size={36} radius="xl"><Bookmark size={16} /></ActionIcon>
                        </Group>
                    </Card>
                ))}
            </SimpleGrid>

            {/* features */}
            <Paper radius="xl" p="xl" mb={60} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Container size="lg" style={{ textAlign: 'center', color: 'white' }}>
                    <Sparkles size={40} style={{ margin: '0 auto 20px', opacity: 0.9 }} />
                    <Title order={2} size={36} mb="md">¿Por qué elegirnos?</Title>
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="xl">
                        <div>
                            <ThemeIcon size={50} radius="xl" color="white" variant="light" mx="auto" mb="md">
                                <Award size={24} />
                            </ThemeIcon>
                            <Text fw={600} size="md" mb="xs">Recetas probadas</Text>
                            <Text size="sm" opacity={0.9}>Todas nuestras recetas son probadas por expertos</Text>
                        </div>
                        <div>
                            <ThemeIcon size={50} radius="xl" color="white" variant="light" mx="auto" mb="md">
                                <Video size={24} />
                            </ThemeIcon>
                            <Text fw={600} size="md" mb="xs">Video tutoriales</Text>
                            <Text size="sm" opacity={0.9}>Paso a paso en video para que no falles</Text>
                        </div>
                        <div>
                            <ThemeIcon size={50} radius="xl" color="white" variant="light" mx="auto" mb="md">
                                <Users size={24} />
                            </ThemeIcon>
                            <Text fw={600} size="md" mb="xs">Comunidad activa</Text>
                            <Text size="sm" opacity={0.9}>Comparte tus creaciones con otros usuarios</Text>
                        </div>
                    </SimpleGrid>
                </Container>
            </Paper>

            {/* testimonials */}
            <Title order={2} mb="lg" ta="center">💬 Lo que dicen nuestros usuarios</Title>
            <SimpleGrid cols={{ base: 1, sm: 3 }} mb={60}>
                {testimonials.map((testimonial, idx) => (
                    <Card withBorder padding="xl" radius="xl" key={idx}>
                        <Quote size={32} color="#e67e22" style={{ marginBottom: 16, opacity: 0.5 }} />
                        <Text size="md" mb="lg" style={{ lineHeight: 1.6 }}>"{testimonial.text}"</Text>
                        <Group gap="md">
                            <Avatar src={testimonial.avatar} size="lg" radius="xl" />
                            <div>
                                <Text fw={600}>{testimonial.name}</Text>
                                <Text size="xs" c="dimmed">{testimonial.role}</Text>
                                <Rating value={testimonial.rating} readOnly size="xs" mt={4} />
                            </div>
                        </Group>
                    </Card>
                ))}
            </SimpleGrid>

            {/* Newsletter */}
            <Paper radius="xl" p="xl" style={{ background: 'linear-gradient(135deg, #f8b195, #f67280)', marginBottom: 48 }}>
                <Container size="sm" style={{ textAlign: 'center', color: 'white' }}>
                    <ThemeIcon size={60} radius="xl" color="white" variant="light" mx="auto" mb="md">
                        <Mail size={28} />
                    </ThemeIcon>
                    <Title order={3} size={28} mb="sm">📧 ¡No te pierdas ninguna receta!</Title>
                    <Text mb="xl" opacity={0.9}>Recibe las mejores recetas directamente en tu correo</Text>
                    <Group justify="center">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                padding: '12px 20px',
                                borderRadius: 50,
                                border: 'none',
                                width: 280,
                                outline: 'none',
                                fontSize: 16,
                                backgroundColor: 'white',
                            }}
                        />
                        <Button color="dark" radius="xl" size="lg" leftSection={<ArrowRight size={18} />}>Suscribirme</Button>
                    </Group>
                </Container>
            </Paper>
        </div>
    )
}

export default HomePage
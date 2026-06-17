import { Container, Title, Text, Stack, Grid, Card, Group, Avatar, ThemeIcon, Box, Divider, Badge, SimpleGrid, Button } from '@mantine/core'
import { motion } from 'framer-motion'
import {
    Heart, Coffee, ChefHat, Users, Star, Award,
    Clock, BookOpen, Utensils, DogIcon, Sparkles,
    Quote, ThumbsUp, Zap, Globe, Smile, Camera, Eye
} from 'lucide-react'
import { Link } from 'react-router-dom'
import chesterPhoto from '../../assets/chester.jpeg'
import FaqSection from '../contact/components/FaqSection'
import { useContact } from '../contact/hooks/useContact'

const AboutPage = () => {
    // Datos de Chester
    const chester = {
        name: 'Chester',
        age: '2 años',
        breed: 'Golden Retriever',
        role: 'Mascota oficial y catador profesional',
        bio: 'Chester es un Golden Retriever con un paladar exquisito y una pasión infinita por la cocina. Nació en el año 2023 y desde entonces ha sido el catador oficial de todas las recetas que publicamos en Chester Recetas.',
        story: 'La historia de Chester comenzó en una cocina familiar, donde siempre estaba presente, observando atentamente cada paso de las preparaciones. Su curiosidad y amor por la comida lo llevaron a convertirse en el inspirador de este proyecto. Hoy, Chester Recetas es una comunidad de amantes de la cocina que comparten su pasión por los sabores.',
        image: chesterPhoto,
        funFacts: [
            '🐕 Le encanta probar todas las recetas antes de que las publiquemos',
            '🍳 Su receta favorita es la pizza!',
            '🎾 No puede resistirse a una buena sesión de juego después de cocinar',
            '📸 Tiene su propia cuenta de instagram :)'
        ]
    }
    const {
        faqs,
        activeFaqId,
        toggleFaq,
        searchFaq,
        setSearchFaq,
        selectedCategory,
        setSelectedCategory,
        faqCategories,
    } = useContact()

    // Características de Chester Recetas
    const features = [
        { icon: <ChefHat size={24} />, title: 'Recetas probadas', desc: 'Cada receta es probada y aprobada por Chester' },
        { icon: <Users size={24} />, title: 'Comunidad activa', desc: 'Miles de cocineros comparten sus creaciones' },
        { icon: <Star size={24} />, title: 'Calidad garantizada', desc: 'Ingredientes y pasos cuidadosamente seleccionados' },
        { icon: <Heart size={24} />, title: 'Hecho con amor', desc: 'Cada receta tiene el toque especial de Chester' },
        { icon: <Clock size={24} />, title: 'Recetas rápidas', desc: 'Platos deliciosos en menos de 30 minutos' },
        { icon: <BookOpen size={24} />, title: 'Variedad infinita', desc: 'Desde desayunos hasta cenas gourmet' },
    ]

    // Testimonios de Chester
    const testimonials = [
        { name: 'María G.', text: 'Chester es el mejor catador, sus consejos han mejorado mis recetas increíblemente', avatar: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Carlos L.', text: 'Gracias a Chester Recetas, cocinar se ha convertido en mi pasión favorita', avatar: 'https://i.pravatar.cc/150?img=3' },
        { name: 'Laura F.', text: 'La sección de "Consejos de Chester" es mi favorita, siempre tiene tips geniales', avatar: 'https://i.pravatar.cc/150?img=5' },
    ]

    return (
        <Box style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <Container size="xl" py="xl">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card
                        withBorder
                        padding="xl"
                        radius="xl"
                        style={{
                            background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                            border: 'none',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: -50,
                            right: -50,
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            pointerEvents: 'none',
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: -30,
                            left: -30,
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            pointerEvents: 'none',
                        }} />

                        <Group justify="space-between" align="center" style={{ position: 'relative', zIndex: 1 }}>
                            <Stack gap="xs">
                                <Group gap="xs">
                                    <DogIcon size={32} color="white" />
                                    <Title order={1} c="white">Sobre Nosotros</Title>
                                </Group>
                                <Text c="white" size="lg" opacity={0.95}>
                                    Conoce la historia de Chester y nuestra pasión por la cocina
                                </Text>
                                <Group gap="sm">
                                    <Badge size="lg" variant="white" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                        🐕 Chester
                                    </Badge>
                                    <Badge size="lg" variant="white" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                        ⭐ +500 Recetas
                                    </Badge>
                                    <Badge size="lg" variant="white" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                        👨‍🍳 Chefs Expertos
                                    </Badge>
                                </Group>
                            </Stack>
                            <ThemeIcon
                                size={80}
                                radius="xl"
                                variant="light"
                                color="white"
                                style={{ background: 'rgba(255,255,255,0.15)' }}
                            >
                                <Sparkles size={40} color="white" />
                            </ThemeIcon>
                        </Group>
                    </Card>
                </motion.div>

                {/* Historia de Chester */}
                <Grid gutter="xl" mt="xl">
                    <Grid.Col span={{ base: 12, md: 5 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card
                                withBorder
                                padding="xl"
                                radius="xl"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--border)',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: -50,
                                    right: -50,
                                    width: 150,
                                    height: 150,
                                    borderRadius: '50%',
                                    background: 'var(--accent-bg)',
                                    pointerEvents: 'none',
                                }} />

                                <Stack gap="md" style={{ position: 'relative', zIndex: 1 }}>
                                    <Group gap="xs">
                                        <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            <DogIcon size={20} />
                                        </ThemeIcon>
                                        <Text fw={700} size="lg" style={{ color: 'var(--text-h)' }}>
                                            Conoce a {chester.name}
                                        </Text>
                                    </Group>

                                    <Avatar
                                        src={chester.image}
                                        size={200}
                                        radius="xl"
                                        mx="auto"
                                        style={{
                                            border: '4px solid var(--accent)',
                                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
                                        }}
                                    />

                                    <Box ta="center">
                                        <Text fw={700} size="xl" style={{ color: 'var(--text-h)' }}>
                                            {chester.name}
                                        </Text>
                                        <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                            {chester.breed} • {chester.age}
                                        </Text>
                                        <Badge
                                            size="lg"
                                            style={{
                                                marginTop: 8,
                                                background: 'var(--accent-bg)',
                                                color: 'var(--accent)',
                                            }}
                                        >
                                            {chester.role}
                                        </Badge>
                                    </Box>
                                </Stack>
                            </Card>
                        </motion.div>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 7 }}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card
                                withBorder
                                padding="xl"
                                radius="xl"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--border)',
                                    height: '100%',
                                }}
                            >
                                <Stack gap="md">
                                    <div>
                                        <Group gap="xs" mb="xs">
                                            <Quote size={20} style={{ color: 'var(--accent)' }} />
                                            <Title order={3} style={{ color: 'var(--text-h)' }}>
                                                Nuestra Historia
                                            </Title>
                                        </Group>
                                        <Text style={{ color: 'var(--text)', lineHeight: 1.8 }}>
                                            {chester.story}
                                        </Text>
                                    </div>

                                    <Divider style={{ borderColor: 'var(--border)' }} />

                                    <div>
                                        <Title order={4} size="sm" style={{ color: 'var(--text-h)' }} mb="xs">
                                            💡 Datos curiosos sobre Chester
                                        </Title>
                                        <Stack gap="xs">
                                            {chester.funFacts.map((fact, idx) => (
                                                <Text key={idx} size="sm" style={{ color: 'var(--text-secondary)' }}>
                                                    {fact}
                                                </Text>
                                            ))}
                                        </Stack>
                                    </div>

                                    <Divider style={{ borderColor: 'var(--border)' }} />

                                    <Group gap="xs">
                                        <ThumbsUp size={16} style={{ color: 'var(--accent)' }} />
                                        <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                            "Cada receta tiene el sello de aprobación de Chester"
                                        </Text>
                                    </Group>
                                </Stack>
                            </Card>
                        </motion.div>
                    </Grid.Col>
                </Grid>

                {/* Misión, Visión y Valores */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Title order={2} ta="center" mt="xl" mb="lg" style={{ color: 'var(--text-h)' }}>
                        Nuestra Filosofía
                    </Title>
                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                        <Card withBorder padding="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                            <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }} mb="md">
                                <Star size={24} />
                            </ThemeIcon>
                            <Title order={4} style={{ color: 'var(--text-h)' }}>Misión</Title>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }} mt="sm">
                                Compartir recetas deliciosas y accesibles que inspiren a las personas a cocinar y disfrutar en familia.
                            </Text>
                        </Card>

                        <Card withBorder padding="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                            <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }} mb="md">
                                <Eye size={24} />
                            </ThemeIcon>
                            <Title order={4} style={{ color: 'var(--text-h)' }}>Visión</Title>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }} mt="sm">
                                Ser la comunidad culinaria más grande de habla hispana, donde todos puedan encontrar su próxima receta favorita.
                            </Text>
                        </Card>

                        <Card withBorder padding="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                            <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }} mb="md">
                                <Heart size={24} />
                            </ThemeIcon>
                            <Title order={4} style={{ color: 'var(--text-h)' }}>Valores</Title>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }} mt="sm">
                                Pasión por la cocina, calidad en cada receta, comunidad y el toque especial de Chester.
                            </Text>
                        </Card>
                    </SimpleGrid>
                </motion.div>

                {/* Características */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Title order={2} ta="center" mt="xl" mb="lg" style={{ color: 'var(--text-h)' }}>
                        ¿Qué nos hace especiales?
                    </Title>
                    <SimpleGrid cols={{ base: 2, md: 3 }} spacing="lg">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card
                                    withBorder
                                    padding="lg"
                                    radius="xl"
                                    style={{
                                        background: 'var(--card-bg)',
                                        borderColor: 'var(--border)',
                                        transition: 'all 0.3s',
                                        height: '100%',
                                        textAlign: 'center',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)'
                                    }}
                                >
                                    <ThemeIcon
                                        size="lg"
                                        radius="xl"
                                        style={{
                                            background: 'var(--accent-bg)',
                                            color: 'var(--accent)',
                                            margin: '0 auto 12px',
                                        }}
                                    >
                                        {feature.icon}
                                    </ThemeIcon>
                                    <Text fw={600} size="sm" style={{ color: 'var(--text-h)' }}>
                                        {feature.title}
                                    </Text>
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }} mt="xs">
                                        {feature.desc}
                                    </Text>
                                </Card>
                            </motion.div>
                        ))}
                    </SimpleGrid>
                </motion.div>

                {/* Testimonios */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Title order={2} ta="center" mt="xl" mb="lg" style={{ color: 'var(--text-h)' }}>
                        Lo que dicen sobre Chester
                    </Title>
                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                        {testimonials.map((testimonial, idx) => (
                            <Card
                                key={idx}
                                withBorder
                                padding="xl"
                                radius="xl"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--border)',
                                    textAlign: 'center',
                                }}
                            >
                                <Avatar
                                    src={testimonial.avatar}
                                    size={60}
                                    radius="xl"
                                    mx="auto"
                                    mb="md"
                                />
                                <Text size="sm" style={{ color: 'var(--text)' }} italic>
                                    "{testimonial.text}"
                                </Text>
                                <Text fw={600} mt="md" style={{ color: 'var(--text-h)' }}>
                                    {testimonial.name}
                                </Text>
                            </Card>
                        ))}
                    </SimpleGrid>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    style={{ marginTop: 60 }}
                >
                    <FaqSection
                        faqs={faqs}
                        activeFaqId={activeFaqId}
                        toggleFaq={toggleFaq}
                        searchFaq={searchFaq}
                        setSearchFaq={setSearchFaq}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        faqCategories={faqCategories}
                    />
                </motion.div>

                {/* Llamada a la acción */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <Card
                        withBorder
                        padding="xl"
                        radius="xl"
                        mt="xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent-bg), var(--bg))',
                            borderColor: 'var(--accent)',
                            textAlign: 'center',
                        }}
                    >
                        <DogIcon size={48} style={{ color: 'var(--accent)', margin: '0 auto 16px' }} />
                        <Title order={3} style={{ color: 'var(--text-h)' }} mb="xs">
                            ¿Quieres ser parte de nuestra comunidad?
                        </Title>
                        <Text style={{ color: 'var(--text-secondary)' }} mb="lg">
                            Únete a Chester y descubre un mundo de recetas deliciosas
                        </Text>
                        <Group justify="center">
                            <Button
                                component={Link}
                                to="/recetas"
                                radius="xl"
                                size="lg"
                                style={{
                                    background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                                    color: 'white',
                                    border: 'none',
                                }}
                            >
                                Explorar recetas
                            </Button>
                            <Button
                                component={Link}
                                to="/contacto"
                                variant="light"
                                radius="xl"
                                size="lg"
                                style={{
                                    color: 'var(--accent)',
                                    background: 'var(--accent-bg)',
                                }}
                            >
                                Contactar
                            </Button>
                        </Group>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    )
}

export default AboutPage
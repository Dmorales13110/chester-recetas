import { Box, Image, Title, Text, Group, Badge, ThemeIcon, Container } from '@mantine/core'
import { Clock, Zap, Star, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const RecipeHero = ({ recipe }) => {
    return (
        <Box style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden' }}>
            {/* Imagen de fondo */}
            <Box
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${recipe.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.5)',
                    transform: 'scale(1.05)',
                }}
            />

            <Box
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
                }}
            />

            {/* Contenido */}
            <Container size="lg" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: 60 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge
                        size="lg"
                        color="orange"
                        variant="filled"
                        mb="md"
                        style={{ backgroundColor: '#e67e22' }}
                    >
                        {recipe.category}
                    </Badge>

                    <Title
                        order={1}
                        size={56}
                        style={{ color: 'white', marginBottom: 16, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                    >
                        {recipe.title}
                    </Title>

                    <Text size="lg" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 24, maxWidth: 600 }}>
                        {recipe.description}
                    </Text>

                    <Group gap="lg" wrap="wrap">
                        <Group gap="xs">
                            <Clock size={18} color="#f39c12" />
                            <Text style={{ color: 'white' }}>{recipe.time}</Text>
                        </Group>
                        <Group gap="xs">
                            <Zap size={18} color="#f39c12" />
                            <Text style={{ color: 'white' }}>{recipe.difficulty}</Text>
                        </Group>
                        <Group gap="xs">
                            <Star size={18} color="#f39c12" />
                            <Text style={{ color: 'white' }}>{recipe.rating} / 5</Text>
                        </Group>
                        <Group gap="xs">
                            <Users size={18} color="#f39c12" />
                            <Text style={{ color: 'white' }}>{recipe.servings} personas</Text>
                        </Group>
                    </Group>
                </motion.div>
            </Container>
        </Box>
    )
}

export default RecipeHero
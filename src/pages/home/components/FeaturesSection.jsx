import { Container, Paper, Title, SimpleGrid, Text, ThemeIcon } from '@mantine/core'
import { Award, Video, Users, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
    { icon: <Award size={28} />, title: 'Recetas probadas', description: 'Todas nuestras recetas son probadas por expertos' },
    { icon: <Video size={28} />, title: 'Video tutoriales', description: 'Paso a paso en video para que no falles' },
    { icon: <Users size={28} />, title: 'Comunidad activa', description: 'Comparte tus creaciones con otros usuarios' },
]

const FeaturesSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <Paper radius="xl" p="xl" mb={60} style={{ background: 'linear-gradient(135deg, #e67e22 10%, #f67280 80%)' }}>
                <Container size="lg" style={{ textAlign: 'center', color: 'white' }}>
                    <Sparkles size={40} style={{ margin: '0 auto 20px', opacity: 0.9 }} />
                    <Title order={2} size={36} mb="md" c="white">¿Por qué elegirnos?</Title>
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="xl">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <ThemeIcon size={50} radius="xl" color="white" variant="light" mx="auto" mb="md">
                                    {feature.icon}
                                </ThemeIcon>
                                <Text fw={600} size="md" mb="xs" c="white">{feature.title}</Text>
                                <Text size="sm" opacity={0.9} c="white">{feature.description}</Text>
                            </motion.div>
                        ))}
                    </SimpleGrid>
                </Container>
            </Paper>
        </motion.div>
    )
}

export default FeaturesSection
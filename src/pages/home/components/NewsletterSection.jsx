import { Container, Paper, Title, Text, Button, Group, ThemeIcon } from '@mantine/core'
import { Mail, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const NewsletterSection = ({ email, setEmail, onSubscribe }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <Paper radius="xl" p="xl" style={{ background: 'linear-gradient(135deg, #f8b195, #f67280)', marginBottom: 48 }}>
                <Container size="sm" style={{ textAlign: 'center', color: 'white' }}>
                    <ThemeIcon size={60} radius="xl" color="white" variant="light" mx="auto" mb="md">
                        <Mail size={28} />
                    </ThemeIcon>
                    <Title order={3} size={28} mb="sm" c="white">¡No te pierdas ninguna receta!</Title>
                    <Text mb="xl" opacity={0.9} c="white">Recibe las mejores recetas directamente en tu correo</Text>
                    <Group justify="center">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && onSubscribe()}
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
                        <Button
                            variant="white"
                            radius="xl"
                            size="lg"
                            leftSection={<ArrowRight size={18} />}
                            onClick={onSubscribe}
                            styles={{
                                root: {
                                    color: '#e67e22',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    }
                                }
                            }}
                        >
                            Suscribirme
                        </Button>
                    </Group>
                </Container>
            </Paper>
        </motion.div>
    )
}

export default NewsletterSection
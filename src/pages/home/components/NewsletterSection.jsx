import { Container, Box, Title, Text, Button, Group, ThemeIcon, useMantineColorScheme } from '@mantine/core'
import { Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const NewsletterSection = ({ email, setEmail, onSubscribe }) => {
    const { colorScheme } = useMantineColorScheme()
    const isDark = colorScheme === 'dark'

    // Colores para el gradiente
    const gradientColors = isDark 
        ? 'linear-gradient(135deg, #1a1a3e, #2d1b69, #4a2c8a)'
        : 'linear-gradient(135deg, #f8b195, #f67280, #c0392b)'

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <Box
                style={{
                    borderRadius: '60px',
                    padding: '48px 24px',
                    marginBottom: '48px',
                    background: gradientColors,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isDark 
                        ? '0 8px 32px rgba(45, 27, 105, 0.4)'
                        : '0 8px 32px rgba(246, 114, 128, 0.3)',
                }}
            >
                {/* Elementos decorativos */}
                <div style={{
                    position: 'absolute',
                    top: '-80px',
                    right: '-80px',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: isDark 
                        ? 'rgba(255,255,255,0.03)' 
                        : 'rgba(255,255,255,0.15)',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-100px',
                    left: '-100px',
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    background: isDark 
                        ? 'rgba(255,255,255,0.02)' 
                        : 'rgba(255,255,255,0.1)',
                }} />
                
                <Container size="sm" style={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 1 }}>
                    <ThemeIcon 
                        size={60} 
                        radius="xl" 
                        color="white" 
                        variant="light" 
                        mx="auto" 
                        mb="md"
                        style={{
                            backgroundColor: isDark 
                                ? 'rgba(255,255,255,0.15)' 
                                : 'rgba(255,255,255,0.3)',
                            color: 'white',
                        }}
                    >
                        <Mail size={28} />
                    </ThemeIcon>
                    
                    <Title order={3} size={28} mb="sm" style={{ color: 'white' }}>
                        ¡No te pierdas ninguna receta!
                    </Title>
                    
                    <Text mb="xl" style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem' }}>
                        Recibe las mejores recetas directamente en tu correo
                    </Text>
                    
                    <Group justify="center" style={{ flexWrap: 'wrap', gap: '12px' }}>
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && onSubscribe()}
                            style={{
                                padding: '14px 24px',
                                borderRadius: '50px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                width: '280px',
                                outline: 'none',
                                fontSize: '16px',
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                color: '#333',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'white'
                                e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.3)'
                                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Button
                            variant="white"
                            radius="xl"
                            size="lg"
                            leftSection={<ArrowRight size={18} />}
                            onClick={onSubscribe}
                            style={{
                                backgroundColor: 'white',
                                color: isDark ? '#6d28d9' : '#e67e22',
                                fontWeight: 600,
                                fontSize: '16px',
                                padding: '0 32px',
                                height: '52px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.2)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)'
                            }}
                        >
                            Suscribirme
                        </Button>
                    </Group>
                </Container>
            </Box>
        </motion.div>
    )
}

export default NewsletterSection
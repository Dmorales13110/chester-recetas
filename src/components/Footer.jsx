import { Group, Text, ActionIcon, Container, Divider, Stack } from '@mantine/core'
import { Mail, Heart, MapPin, Phone, Share2, Camera, MessageCircle, Video, Sparkles, DogIcon, Home, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div style={{
            background: 'var(--bg)',
            color: 'var(--text-secondary)',
            marginTop: 'auto',
            borderTop: '1px solid var(--border)'
        }}>
            <Container size="xl" py="lg">
                <Group justify="space-between" wrap="wrap" gap="md" mb="md">
                    <Group
                        gap="xs"
                        component={Link}
                        to="/"
                        onClick={scrollToTop}
                        style={{ cursor: 'pointer', textDecoration: 'none' }}
                    >
                        <div style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', padding: 6, borderRadius: 10 }}>
                            <DogIcon size={18} color="white" />
                        </div>
                        <Text fw={700} size="md" style={{ color: 'var(--text-h)' }}>Chester Recetas</Text>
                    </Group>

                    <Group gap="sm">
                        {/* Botón para volver arriba */}
                        <ActionIcon
                            variant="subtle"
                            size="md"
                            onClick={scrollToTop}
                            radius="xl"
                            style={{ background: 'var(--social-bg)', color: '#f39c12' }}
                            title="Volver arriba"
                        >
                            <ArrowUp size={16} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" size="md" component="a" href="#" target="_blank" radius="xl" style={{ background: 'var(--social-bg)', color: '#f39c12' }}>
                            <Share2 size={16} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" size="md" component="a" href="#" target="_blank" radius="xl" style={{ background: 'var(--social-bg)', color: '#f39c12' }}>
                            <Camera size={16} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" size="md" component="a" href="#" target="_blank" radius="xl" style={{ background: 'var(--social-bg)', color: '#f39c12' }}>
                            <MessageCircle size={16} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" size="md" component="a" href="#" target="_blank" radius="xl" style={{ background: 'var(--social-bg)', color: '#f39c12' }}>
                            <Video size={16} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" size="md" component="a" href="mailto:info@chesterrecetas.com" target="_blank" radius="xl" style={{ background: 'var(--social-bg)', color: '#f39c12' }}>
                            <Mail size={16} />
                        </ActionIcon>
                    </Group>
                </Group>

                <Divider style={{ borderColor: 'var(--border)' }} mb="md" />

                <Group justify="space-between" wrap="wrap" gap="md">
                    <Group gap="xl" wrap="wrap">
                        <Group gap="xs">
                            <MapPin size={14} style={{ color: '#f39c12' }} />
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Calle Joven Cocina con Av chesterjaus, Venezuela</Text>
                        </Group>
                        <Group gap="xs">
                            <Phone size={14} style={{ color: '#f39c12' }} />
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>+58 123 456 7890</Text>
                        </Group>
                    </Group>
                    <Group gap="xs">
                        <Sparkles size={12} style={{ color: '#f39c12' }} />
                        <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                            Hecho con <Heart size={10} style={{ display: 'inline', margin: '0 2px', color: '#e74c3c' }} /> para Chester
                        </Text>
                    </Group>
                </Group>
            </Container>
        </div>
    )
}
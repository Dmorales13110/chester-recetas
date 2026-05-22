import { Modal, Box, Group, Text, Title, Button, ActionIcon, Badge } from '@mantine/core'
import { X, Clock, Zap, Star, Heart, Share2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const VideoModal = ({ opened, onClose, videoType = 'promo' }) => {
    const { isDarkMode } = useTheme()

    const gradientStart = isDarkMode ? '#f5a623' : '#e67e22'
    const gradientEnd = isDarkMode ? '#f7b53e' : '#f39c12'

    const videoContent = {
        promo: {
            title: 'Descubre Chester Recetas',
            description: 'La mejor plataforma de recetas para toda la familia',
            videoUrl: 'https://www.youtube.com/embed/K9RLIYYpEfo',
            duration: '1:30',
            difficulty: 'Fácil',
        },
        recipe: {
            title: 'Pasta al Pesto - Paso a Paso',
            description: 'Aprende a preparar esta deliciosa receta italiana',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '5:20',
            difficulty: 'Media',
        },
        tutorial: {
            title: 'Cómo usar Chester Recetas',
            description: 'Guía rápida para aprovechar al máximo la plataforma',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '2:45',
            difficulty: 'Fácil',
        },
    }

    const currentVideo = videoContent[videoType]

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="xl"
            withCloseButton={false}
            radius="lg"
            centered
            styles={{
                content: {
                    background: 'var(--modal-bg)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                },
                body: {
                    padding: 0,
                },
                header: {
                    display: 'none',
                },
            }}
        >
            {/* Header */}
            <div style={{
                background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                padding: '20px 24px',
                position: 'relative',
            }}>
                <ActionIcon
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                    }}
                >
                    <X size={18} color="white" />
                </ActionIcon>

                <Title order={3} style={{ color: 'white', marginBottom: 4, paddingRight: 30 }}>
                    {currentVideo.title}
                </Title>
                <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {currentVideo.description}
                </Text>
            </div>

            {/* Video */}
            <div style={{
                backgroundColor: '#000',
                aspectRatio: '16/9',
            }}>
                <iframe
                    src={currentVideo.videoUrl}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                    allowFullScreen
                    title={currentVideo.title}
                />
            </div>

            {/* Info y acciones */}
            <div style={{ padding: '20px 24px' }}>
                <Group justify="space-between" wrap="wrap" mb="md">
                    <Group gap="sm">
                        <Badge
                            variant="light"
                            style={{
                                background: 'var(--accent-bg)',
                                color: 'var(--accent)',
                            }}
                            leftSection={<Clock size={12} />}
                        >
                            {currentVideo.duration}
                        </Badge>
                        <Badge
                            variant="light"
                            style={{
                                background: 'var(--accent-bg)',
                                color: 'var(--accent)',
                            }}
                            leftSection={<Zap size={12} />}
                        >
                            {currentVideo.difficulty}
                        </Badge>
                        <Badge
                            variant="light"
                            style={{
                                background: 'var(--accent-bg)',
                                color: 'var(--accent)',
                            }}
                            leftSection={<Star size={12} />}
                        >
                            Destacado
                        </Badge>
                    </Group>
                </Group>

                <Group justify="flex-end" gap="sm">
                    <Button
                        variant="light"
                        leftSection={<Heart size={16} />}
                        size="sm"
                        radius="xl"
                        style={{
                            backgroundColor: 'var(--accent-bg)',
                            color: 'var(--accent)',
                        }}
                    >
                        Guardar
                    </Button>
                    <Button
                        variant="light"
                        leftSection={<Share2 size={16} />}
                        size="sm"
                        radius="xl"
                        style={{
                            backgroundColor: 'var(--accent-bg)',
                            color: 'var(--accent)',
                        }}
                    >
                        Compartir
                    </Button>
                </Group>
            </div>
        </Modal>
    )
}

export default VideoModal
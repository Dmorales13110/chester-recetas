import { Modal, Box, Group, Text, Title, Button, ActionIcon, Badge, Paper } from '@mantine/core'
import { X, Clock, Zap, Star, Heart, Play, Pause, Maximize2, Volume2, Share2 } from 'lucide-react'
import { useState, useRef } from 'react'

const VideoModal = ({ opened, onClose, videoType = 'promo' }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef(null)

    // Diferentes contenidos según el tipo de video
    const videoContent = {
        promo: {
            title: 'Descubre Chester Recetas',
            description: 'La mejor plataforma de recetas para toda la familia',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // never
            duration: '1:30',
            difficulty: 'Fácil',
        },
        recipe: {
            title: 'Pasta al Pesto - Paso a Paso',
            description: 'Aprende a preparar esta deliciosa receta italiana',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // gonna
            duration: '5:20',
            difficulty: 'Media',
        },
        tutorial: {
            title: 'Cómo usar Chester Recetas',
            description: 'Guía rápida para aprovechar al máximo la plataforma',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // give you up
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
            padding={0}
            withCloseButton={false}
            radius="lg"
            styles={{
                body: { padding: 0 },
                content: { overflow: 'hidden' }
            }}
        >
            {/* Header */}
            <Group justify="space-between" p="md" style={{ borderBottom: '1px solid #eee' }}>
                <div>
                    <Title order={3}>{currentVideo.title}</Title>
                    <Text size="sm" c="dimmed">{currentVideo.description}</Text>
                </div>
                <ActionIcon onClick={onClose} size="lg" radius="xl" variant="light">
                    <X size={20} />
                </ActionIcon>
            </Group>

            {/* Video Player */}
            <Box style={{ position: 'relative', backgroundColor: '#000', aspectRatio: '16/9' }}>
                <iframe
                    src={currentVideo.videoUrl}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={currentVideo.title}
                />
            </Box>

            {/* Info del video */}
            <Paper p="md" radius={0} style={{ borderTop: '1px solid #eee' }}>
                <Group justify="space-between" wrap="wrap">
                    <Group gap="md">
                        <Badge color="orange" variant="light" leftSection={<Clock size={12} />}>
                            {currentVideo.duration}
                        </Badge>
                        <Badge color="orange" variant="light" leftSection={<Zap size={12} />}>
                            {currentVideo.difficulty}
                        </Badge>
                        <Badge color="orange" variant="light" leftSection={<Star size={12} />}>
                            Receta destacada
                        </Badge>
                    </Group>
                    <Group gap="sm">
                        <Button variant="subtle" leftSection={<Heart size={16} />} size="sm">
                            Guardar
                        </Button>
                        <Button variant="subtle" leftSection={<Share2 size={16} />} size="sm">
                            Compartir
                        </Button>
                    </Group>
                </Group>
            </Paper>
        </Modal>
    )
}

export default VideoModal
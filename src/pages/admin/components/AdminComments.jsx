import { Paper, Title, Text, Group, Avatar, Badge, ActionIcon, Stack, ThemeIcon, Menu, Button } from '@mantine/core'
import {
    MessageCircle, Check, X, Clock, MoreVertical, Star,
    Trash2, Flag, Reply, Heart, BookOpen
} from 'lucide-react'
import { motion } from 'framer-motion'

const recentComments = [
    {
        id: 1,
        user: 'María García',
        recipe: 'Pasta al Pesto',
        comment: '¡Excelente receta! Me quedó perfecta, la mejor pasta que he probado.',
        date: '2024-06-15 14:30',
        rating: 5,
        status: 'aprobado',
        likes: 12,
        avatar: null
    },
    {
        id: 2,
        user: 'Carlos López',
        recipe: 'Tarta de Queso',
        comment: 'No me quedó muy bien, la tarta se partió al desmoldar. Algún consejo?',
        date: '2024-06-15 12:15',
        rating: 3,
        status: 'pendiente',
        likes: 3,
        avatar: null
    },
    {
        id: 3,
        user: 'Laura Fernández',
        recipe: 'Ensalada César',
        comment: 'Deliciosa y muy fácil de preparar. Perfecta para una cena rápida.',
        date: '2024-06-14 20:45',
        rating: 4,
        status: 'aprobado',
        likes: 8,
        avatar: null
    },
    {
        id: 4,
        user: 'Pedro Ruiz',
        recipe: 'Paella Mixta',
        comment: 'El arroz quedó perfecto, pero los mariscos estaban un poco pasados.',
        date: '2024-06-14 18:00',
        rating: 3,
        status: 'rechazado',
        likes: 0,
        avatar: null
    },
]

const getStatusColor = (status) => {
    switch (status) {
        case 'aprobado': return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: <Check size={14} /> }
        case 'pendiente': return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', icon: <Clock size={14} /> }
        case 'rechazado': return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: <X size={14} /> }
        default: return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)', icon: null }
    }
}

const AdminComments = () => {
    const pendingCount = recentComments.filter(c => c.status === 'pendiente').length

    return (
        <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
            <Group justify="space-between" mb="lg">
                <div>
                    <Group gap="xs" mb={4}>
                        <MessageCircle size={20} style={{ color: '#10b981' }} />
                        <Title order={3} style={{ color: 'var(--text-h)' }}>Comentarios recientes</Title>
                    </Group>
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                        Últimos comentarios de los usuarios
                    </Text>
                </div>
                {pendingCount > 0 && (
                    <Badge
                        size="lg"
                        color="orange"
                        variant="light"
                        style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}
                    >
                        {pendingCount} pendientes de revisión
                    </Badge>
                )}
            </Group>

            <Stack gap="sm">
                {recentComments.map((comment, idx) => {
                    const status = getStatusColor(comment.status)
                    return (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Paper
                                withBorder
                                p="md"
                                radius="lg"
                                style={{
                                    background: comment.status === 'pendiente' ? 'rgba(245, 158, 11, 0.03)' : 'var(--bg-secondary)',
                                    borderColor: comment.status === 'pendiente' ? '#f59e0b' : 'var(--border)',
                                    borderWidth: comment.status === 'pendiente' ? 2 : 1,
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <Group justify="space-between" align="flex-start" wrap="nowrap">
                                    <Group gap="sm" align="flex-start" wrap="nowrap" style={{ flex: 1 }}>
                                        <Avatar size="md" radius="xl" color="orange">
                                            {comment.user.charAt(0)}
                                        </Avatar>
                                        <div style={{ flex: 1 }}>
                                            <Group gap="xs" wrap="wrap">
                                                <Text fw={600} style={{ color: 'var(--text-h)' }}>{comment.user}</Text>
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>en</Text>
                                                <Text size="xs" fw={500} style={{ color: '#e67e22' }}>{comment.recipe}</Text>
                                                <Badge
                                                    size="sm"
                                                    style={{
                                                        background: status.bg,
                                                        color: status.color,
                                                    }}
                                                    leftSection={status.icon}
                                                >
                                                    {comment.status}
                                                </Badge>
                                            </Group>
                                            <Group gap="xs" mt={4}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        style={{
                                                            color: i < comment.rating ? '#f59e0b' : 'var(--border)',
                                                            fill: i < comment.rating ? '#f59e0b' : 'none'
                                                        }}
                                                    />
                                                ))}
                                            </Group>
                                            <Text size="sm" mt={4} style={{ color: 'var(--text)', lineHeight: 1.5 }}>
                                                "{comment.comment}"
                                            </Text>
                                            <Group gap="sm" mt={4}>
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{comment.date}</Text>
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>•</Text>
                                                <Group gap={4}>
                                                    <Heart size={12} style={{ color: '#ef4444' }} />
                                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{comment.likes}</Text>
                                                </Group>
                                            </Group>
                                        </div>
                                    </Group>

                                    <Group gap="xs" style={{ flexShrink: 0 }}>
                                        {comment.status === 'pendiente' && (
                                            <Group gap="xs">
                                                <ActionIcon variant="subtle" color="green" size="sm">
                                                    <Check size={16} />
                                                </ActionIcon>
                                                <ActionIcon variant="subtle" color="red" size="sm">
                                                    <X size={16} />
                                                </ActionIcon>
                                            </Group>
                                        )}
                                        <ActionIcon variant="subtle" color="orange" size="sm">
                                            <Flag size={16} />
                                        </ActionIcon>
                                        <ActionIcon variant="subtle" color="blue" size="sm">
                                            <Reply size={16} />
                                        </ActionIcon>
                                        <ActionIcon variant="subtle" color="red" size="sm">
                                            <Trash2 size={16} />
                                        </ActionIcon>
                                        <Menu shadow="md" position="bottom-end">
                                            <Menu.Target>
                                                <ActionIcon variant="subtle" size="sm">
                                                    <MoreVertical size={16} style={{ color: 'var(--text-secondary)' }} />
                                                </ActionIcon>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item leftSection={<Check size={14} />} color="green">Aprobar</Menu.Item>
                                                <Menu.Item leftSection={<X size={14} />} color="red">Rechazar</Menu.Item>
                                                <Menu.Divider />
                                                <Menu.Item leftSection={<Reply size={14} />}>Responder</Menu.Item>
                                                <Menu.Divider />
                                                <Menu.Item leftSection={<Trash2 size={14} />} color="red">Eliminar</Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </Group>
                                </Group>
                            </Paper>
                        </motion.div>
                    )
                })}
            </Stack>

            <Group justify="space-between" mt="md">
                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                    {recentComments.length} comentarios totales • {pendingCount} pendientes de revisión
                </Text>
                <Button variant="subtle" size="xs" style={{ color: 'var(--accent)' }}>
                    Ver todos los comentarios
                </Button>
            </Group>
        </Paper>
    )
}

export default AdminComments
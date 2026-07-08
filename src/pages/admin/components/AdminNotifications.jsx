import { Paper, Title, Text, Group, Avatar, Badge, ActionIcon, Stack, ThemeIcon, Box, Button, Divider, Menu } from '@mantine/core'
import { Bell, Check, X, Clock, MoreVertical, MessageCircle, Heart, Star, User, BookOpen, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const notifications = [
    {
        id: 1,
        type: 'comment',
        title: 'Nuevo comentario en "Pasta al Pesto"',
        description: 'María García ha comentado: "¡Excelente receta!"',
        time: 'Hace 5 minutos',
        read: false,
        avatar: 'https://i.pravatar.cc/150?img=1',
        color: '#10b981'
    },
    {
        id: 2,
        type: 'recipe',
        title: 'Nueva receta publicada',
        description: 'Carlos López ha publicado "Ensalada César"',
        time: 'Hace 2 horas',
        read: false,
        avatar: 'https://i.pravatar.cc/150?img=3',
        color: '#e67e22'
    },
    {
        id: 3,
        type: 'favorite',
        title: 'Receta favorita',
        description: 'Laura Fernández ha marcado "Tarta de Queso" como favorita',
        time: 'Hace 4 horas',
        read: true,
        avatar: 'https://i.pravatar.cc/150?img=5',
        color: '#ef4444'
    },
    {
        id: 4,
        type: 'user',
        title: 'Nuevo usuario registrado',
        description: 'Pedro Ruiz se ha unido a Chester Recetas',
        time: 'Hace 6 horas',
        read: true,
        avatar: 'https://i.pravatar.cc/150?img=7',
        color: '#3b82f6'
    },
]

const getTypeIcon = (type) => {
    switch(type) {
        case 'comment': return <MessageCircle size={16} />
        case 'recipe': return <BookOpen size={16} />
        case 'favorite': return <Heart size={16} />
        case 'user': return <User size={16} />
        default: return <Sparkles size={16} />
    }
}

const AdminNotifications = () => {
    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
            <Group justify="space-between" mb="lg">
                <div>
                    <Group gap="xs" mb={4}>
                        <Bell size={24} style={{ color: '#e67e22' }} />
                        <Title order={3} style={{ color: 'var(--text-h)' }}>Notificaciones</Title>
                        {unreadCount > 0 && (
                            <Badge color="orange" variant="light">
                                {unreadCount} nuevas
                            </Badge>
                        )}
                    </Group>
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                        Mantente al tanto de lo que pasa en Chester Recetas
                    </Text>
                </div>
                <Group gap="sm">
                    <Button variant="subtle" size="sm" leftSection={<Check size={14} />} style={{ color: 'var(--accent)' }}>
                        Marcar todas como leídas
                    </Button>
                </Group>
            </Group>

            <Divider style={{ borderColor: 'var(--border)' }} />

            <Stack gap="sm" mt="md">
                {notifications.map((notification, idx) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Paper
                            withBorder
                            p="md"
                            radius="lg"
                            style={{ 
                                background: notification.read ? 'var(--bg-secondary)' : 'var(--accent-bg)',
                                borderColor: notification.read ? 'var(--border)' : 'var(--accent)',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = notification.color
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = notification.read ? 'var(--border)' : 'var(--accent)'
                            }}
                        >
                            <Group justify="space-between" align="flex-start" wrap="nowrap">
                                <Group gap="sm" wrap="nowrap" style={{ flex: 1 }}>
                                    <Avatar size="md" radius="xl" src={notification.avatar}>
                                        {notification.avatar ? null : notification.title.charAt(0)}
                                    </Avatar>
                                    <div style={{ flex: 1 }}>
                                        <Group gap="xs" wrap="wrap">
                                            <Text fw={600} style={{ color: 'var(--text-h)' }}>
                                                {notification.title}
                                            </Text>
                                            {!notification.read && (
                                                <Badge size="xs" color="orange" variant="light">Nuevo</Badge>
                                            )}
                                        </Group>
                                        <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                            {notification.description}
                                        </Text>
                                        <Group gap="xs" mt={4}>
                                            <Clock size={12} style={{ color: 'var(--text-secondary)' }} />
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                                {notification.time}
                                            </Text>
                                        </Group>
                                    </div>
                                </Group>

                                <Group gap="xs" style={{ flexShrink: 0 }}>
                                    <ThemeIcon size="sm" radius="xl" style={{ background: `${notification.color}20`, color: notification.color }}>
                                        {getTypeIcon(notification.type)}
                                    </ThemeIcon>
                                    {!notification.read && (
                                        <ActionIcon variant="subtle" color="green" size="sm">
                                            <Check size={14} />
                                        </ActionIcon>
                                    )}
                                    <ActionIcon variant="subtle" color="red" size="sm">
                                        <X size={14} />
                                    </ActionIcon>
                                    <Menu shadow="md" position="bottom-end">
                                        <Menu.Target>
                                            <ActionIcon variant="subtle" size="sm">
                                                <MoreVertical size={14} style={{ color: 'var(--text-secondary)' }} />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item leftSection={<Check size={14} />}>Marcar como leída</Menu.Item>
                                            <Menu.Item leftSection={<Bell size={14} />}>Configurar notificaciones</Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item leftSection={<X size={14} />} color="red">Eliminar</Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Group>
                        </Paper>
                    </motion.div>
                ))}
            </Stack>

            {notifications.length === 0 && (
                <Box ta="center" py={60}>
                    <Bell size={48} style={{ color: 'var(--border)', marginBottom: 16 }} />
                    <Text fw={500} style={{ color: 'var(--text-h)' }}>No hay notificaciones</Text>
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                        Aquí aparecerán todas tus notificaciones
                    </Text>
                </Box>
            )}

            <Group justify="space-between" mt="md">
                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                    {unreadCount} notificaciones sin leer de {notifications.length} totales
                </Text>
                <Button variant="subtle" size="xs" style={{ color: 'var(--accent)' }}>
                    Ver todas las notificaciones
                </Button>
            </Group>
        </Paper>
    )
}

export default AdminNotifications
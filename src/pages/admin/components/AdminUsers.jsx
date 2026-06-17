import { Paper, Title, Text, Group, Avatar, Button, Badge, Stack, ActionIcon, ThemeIcon, Menu } from '@mantine/core'
import { 
    Users, UserPlus, Mail, MoreVertical, Crown, UserCog, 
    Star, Shield, Clock, Ban, CheckCircle, XCircle, BookOpen, 
    MessageCircle, Trash2, Eye  // 👈 Asegúrate de importar todos los iconos
} from 'lucide-react'
import { motion } from 'framer-motion'

const recentUsers = [
    { id: 1, name: 'María García', email: 'maria@email.com', avatar: null, role: 'Usuario', date: '2024-06-15', status: 'Activo', recipes: 5, comments: 12 },
    { id: 2, name: 'Carlos López', email: 'carlos@email.com', avatar: null, role: 'Usuario', date: '2024-06-14', status: 'Activo', recipes: 3, comments: 8 },
    { id: 3, name: 'Laura Fernández', email: 'laura@email.com', avatar: null, role: 'Chef', date: '2024-06-13', status: 'Activo', recipes: 12, comments: 25 },
    { id: 4, name: 'Admin Chester', email: 'admin@chester.com', avatar: null, role: 'Admin', date: '2024-06-12', status: 'Activo', recipes: 45, comments: 67 },
    { id: 5, name: 'Pedro Ruiz', email: 'pedro@email.com', avatar: null, role: 'Usuario', date: '2024-06-11', status: 'Bloqueado', recipes: 0, comments: 2 },
]

const getRoleColor = (role) => {
    switch(role) {
        case 'Admin': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', icon: <Crown size={14} /> }
        case 'Chef': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', icon: <UserCog size={14} /> }
        default: return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: <UserCog size={14} /> }
    }
}

const getStatusColor = (status) => {
    switch(status) {
        case 'Activo': return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' }
        case 'Bloqueado': return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' }
        default: return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' }
    }
}

const AdminUsers = () => {
    return (
        <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', height: '100%' }}>
            <Group justify="space-between" mb="lg">
                <div>
                    <Group gap="xs" mb={4}>
                        <Users size={20} style={{ color: '#3b82f6' }} />
                        <Title order={3} style={{ color: 'var(--text-h)' }}>Usuarios recientes</Title>
                    </Group>
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>Últimos usuarios registrados</Text>
                </div>
                <Button
                    leftSection={<UserPlus size={16} />}
                    radius="xl"
                    variant="light"
                    style={{ 
                        color: 'var(--accent)',
                        background: 'var(--accent-bg)',
                        transition: 'all 0.2s',
                    }}
                >
                    Invitar usuario
                </Button>
            </Group>

            <Stack gap="sm">
                {recentUsers.map((user, idx) => {
                    const role = getRoleColor(user.role)
                    const status = getStatusColor(user.status)
                    return (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Paper
                                withBorder
                                p="sm"
                                radius="lg"
                                style={{ 
                                    background: 'var(--bg-secondary)', 
                                    borderColor: user.status === 'Bloqueado' ? '#ef4444' : 'var(--border)',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = user.status === 'Bloqueado' ? '#ef4444' : '#3b82f6'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = user.status === 'Bloqueado' ? '#ef4444' : 'var(--border)'
                                }}
                            >
                                <Group justify="space-between" wrap="nowrap">
                                    <Group gap="sm" wrap="nowrap" style={{ flex: 1 }}>
                                        <Avatar size="md" radius="xl" color="orange">
                                            {user.name.charAt(0)}
                                        </Avatar>
                                        <div style={{ flex: 1 }}>
                                            <Group gap="xs" wrap="wrap">
                                                <Text fw={600} style={{ color: 'var(--text-h)' }}>{user.name}</Text>
                                                <Badge 
                                                    size="sm"
                                                    style={{ 
                                                        background: role.bg,
                                                        color: role.color,
                                                    }}
                                                    leftSection={role.icon}
                                                >
                                                    {user.role}
                                                </Badge>
                                                <Badge 
                                                    size="sm"
                                                    style={{ 
                                                        background: status.bg,
                                                        color: status.color,
                                                    }}
                                                    leftSection={user.status === 'Activo' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                                >
                                                    {user.status}
                                                </Badge>
                                            </Group>
                                            <Group gap="xs">
                                                <Mail size={12} style={{ color: 'var(--text-secondary)' }} />
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{user.email}</Text>
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>•</Text>
                                                <Clock size={12} style={{ color: 'var(--text-secondary)' }} />
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{user.date}</Text>
                                            </Group>
                                            <Group gap="sm" mt={4}>
                                                <Group gap={4}>
                                                    <BookOpen size={12} style={{ color: 'var(--text-secondary)' }} />
                                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{user.recipes} recetas</Text>
                                                </Group>
                                                <Group gap={4}>
                                                    <MessageCircle size={12} style={{ color: 'var(--text-secondary)' }} />
                                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{user.comments} comentarios</Text>
                                                </Group>
                                            </Group>
                                        </div>
                                    </Group>
                                    <Menu shadow="md" position="bottom-end">
                                        <Menu.Target>
                                            <ActionIcon variant="subtle" size="sm">
                                                <MoreVertical size={16} style={{ color: 'var(--text-secondary)' }} />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item leftSection={<Eye size={14} />}>Ver perfil</Menu.Item>
                                            <Menu.Item leftSection={<UserCog size={14} />}>Cambiar rol</Menu.Item>
                                            {user.status === 'Activo' ? (
                                                <Menu.Item leftSection={<Ban size={14} />} color="red">Bloquear</Menu.Item>
                                            ) : (
                                                <Menu.Item leftSection={<CheckCircle size={14} />} color="green">Desbloquear</Menu.Item>
                                            )}
                                            <Menu.Divider />
                                            <Menu.Item leftSection={<Trash2 size={14} />} color="red">Eliminar</Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Paper>
                        </motion.div>
                    )
                })}
            </Stack>

            <Group justify="space-between" mt="md">
                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                    {recentUsers.length} usuarios activos de {recentUsers.length + 15} totales
                </Text>
                <Button variant="subtle" size="xs" style={{ color: 'var(--accent)' }}>
                    Ver todos los usuarios
                </Button>
            </Group>
        </Paper>
    )
}

export default AdminUsers
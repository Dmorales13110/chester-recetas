import { Paper, Title, Text, Table, Badge, Button, Group, ActionIcon, Avatar, ThemeIcon, Menu, Box } from '@mantine/core'
import {
    Edit, Trash2, Eye, Plus, Clock, Star, Sparkles, MoreVertical,
    CheckCircle, XCircle, AlertCircle, BookOpen
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const recentRecipes = [
    { id: 1, title: 'Pasta al Pesto', category: 'Pastas', status: 'Publicada', views: 234, rating: 4.8, date: '2024-06-15', author: 'María García' },
    { id: 2, title: 'Ensalada César', category: 'Ensaladas', status: 'Publicada', views: 189, rating: 4.6, date: '2024-06-14', author: 'Carlos López' },
    { id: 3, title: 'Tarta de Queso', category: 'Postres', status: 'Pendiente', views: 0, rating: 0, date: '2024-06-13', author: 'Laura Fernández' },
    { id: 4, title: 'Paella Mixta', category: 'Arroces', status: 'Publicada', views: 412, rating: 4.7, date: '2024-06-12', author: 'Admin' },
    { id: 5, title: 'Brownie de Chocolate', category: 'Postres', status: 'Borrador', views: 0, rating: 0, date: '2024-06-11', author: 'María García' },
]

const getStatusColor = (status) => {
    switch (status) {
        case 'Publicada': return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' }
        case 'Pendiente': return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' }
        case 'Borrador': return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' }
        default: return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' }
    }
}

const getStatusIcon = (status) => {
    switch (status) {
        case 'Publicada': return <CheckCircle size={14} />
        case 'Pendiente': return <AlertCircle size={14} />
        case 'Borrador': return <Clock size={14} />
        default: return null
    }
}

const AdminRecipes = () => {
    return (
        <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
            <Group justify="space-between" mb="lg">
                <div>
                    <Group gap="xs" mb={4}>
                        <BookOpen size={20} style={{ color: '#e67e22' }} />
                        <Title order={3} style={{ color: 'var(--text-h)' }}>Recetas recientes</Title>
                    </Group>
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                        Últimas recetas añadidas al sitio
                    </Text>
                </div>
                <Button
                    component={Link}
                    to="/admin/recipes/new"
                    leftSection={<Plus size={16} />}
                    radius="xl"
                    style={{
                        background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                        border: 'none',
                        transition: 'all 0.2s',
                    }}
                >
                    Nueva receta
                </Button>
            </Group>

            <Box style={{ overflowX: 'auto' }}>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr style={{ background: 'var(--bg-secondary)' }}>
                            <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Receta</Table.Th>
                            <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Categoría</Table.Th>
                            <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Estado</Table.Th>
                            <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Vistas</Table.Th>
                            <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Rating</Table.Th>
                            <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Acciones</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {recentRecipes.map((recipe, idx) => {
                            const status = getStatusColor(recipe.status)
                            return (
                                <motion.tr
                                    key={recipe.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Table.Td>
                                        <Group gap="sm">
                                            <Avatar size="sm" radius="md" color="orange">
                                                {recipe.title.charAt(0)}
                                            </Avatar>
                                            <div>
                                                <Text fw={500} style={{ color: 'var(--text-h)' }}>{recipe.title}</Text>
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>por {recipe.author}</Text>
                                            </div>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge variant="light" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            {recipe.category}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge
                                            style={{
                                                background: status.bg,
                                                color: status.color,
                                            }}
                                            leftSection={getStatusIcon(recipe.status)}
                                        >
                                            {recipe.status}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap="xs">
                                            <Eye size={14} style={{ color: 'var(--text-secondary)' }} />
                                            <Text size="sm" style={{ color: 'var(--text-secondary)' }}>{recipe.views}</Text>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap="xs">
                                            <Star size={14} style={{ color: '#f59e0b' }} />
                                            <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                                {recipe.rating > 0 ? recipe.rating : '-'}
                                            </Text>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap="xs">
                                            <ActionIcon variant="subtle" color="blue" size="sm">
                                                <Eye size={16} />
                                            </ActionIcon>
                                            <ActionIcon variant="subtle" color="orange" size="sm">
                                                <Edit size={16} />
                                            </ActionIcon>
                                            <ActionIcon variant="subtle" color="red" size="sm">
                                                <Trash2 size={16} />
                                            </ActionIcon>
                                            <Menu shadow="md" position="bottom-end">
                                                <Menu.Target>
                                                    <ActionIcon variant="subtle" size="sm">
                                                        <MoreVertical size={16} />
                                                    </ActionIcon>
                                                </Menu.Target>
                                                <Menu.Dropdown>
                                                    <Menu.Item leftSection={<Eye size={14} />}>Ver detalles</Menu.Item>
                                                    <Menu.Item leftSection={<Edit size={14} />}>Editar</Menu.Item>
                                                    <Menu.Item leftSection={<CheckCircle size={14} />} color="green">Publicar</Menu.Item>
                                                    <Menu.Divider />
                                                    <Menu.Item leftSection={<Trash2 size={14} />} color="red">Eliminar</Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </Group>
                                    </Table.Td>
                                </motion.tr>
                            )
                        })}
                    </Table.Tbody>
                </Table>
            </Box>

            <Group justify="space-between" mt="md">
                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                    Mostrando {recentRecipes.length} recetas de {recentRecipes.length + 12} totales
                </Text>
                <Button variant="subtle" size="xs" style={{ color: 'var(--accent)' }} rightSection={<Sparkles size={12} />}>
                    Ver todas
                </Button>
            </Group>
        </Paper>
    )
}

export default AdminRecipes
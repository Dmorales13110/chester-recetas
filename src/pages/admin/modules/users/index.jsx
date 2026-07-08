import { useState, useEffect } from 'react'
import { 
    Container, Paper, Title, Text, Table, Badge, Button, 
    Group, ActionIcon, Avatar, ThemeIcon, Menu, Box, 
    TextInput, Select, Pagination, Stack, Modal,
    Alert, SimpleGrid, Card, Skeleton, Divider
} from '@mantine/core'
import { 
    Users, UserPlus, Mail, MoreVertical, Crown, UserCog, 
    Star, Shield, Clock, Ban, CheckCircle, XCircle, 
    Search, Filter, Trash2, Eye, Edit, Calendar,
    Award, Heart, MessageCircle, BookOpen, Sparkles,
    UserCheck, UserX, User
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../hooks/useAdmin'

const getRoleColor = (role) => {
    switch(role) {
        case 'Admin': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', icon: <Crown size={14} />, label: 'Administrador' }
        case 'Chef': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', icon: <UserCog size={14} />, label: 'Chef' }
        case 'Moderador': return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: <Shield size={14} />, label: 'Moderador' }
        default: return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: <User size={14} />, label: 'Usuario' }
    }
}

const getStatusColor = (status) => {
    switch(status) {
        case 'Activo': return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: <CheckCircle size={12} /> }
        case 'Bloqueado': return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: <XCircle size={12} /> }
        case 'Pendiente': return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', icon: <Clock size={12} /> }
        default: return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)', icon: null }
    }
}

const UsersModule = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedUser, setSelectedUser] = useState(null)
    const [blockModalOpen, setBlockModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    const { users, blockUser } = useAdmin()
    const itemsPerPage = 8

    // Simular carga
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 600)
        return () => clearTimeout(timer)
    }, [])

    // Estadísticas rápidas
    const stats = [
        { label: 'Total usuarios', value: users.length, icon: <Users size={18} />, color: '#3b82f6' },
        { label: 'Activos', value: users.filter(u => u.status === 'Activo').length, icon: <CheckCircle size={18} />, color: '#10b981' },
        { label: 'Bloqueados', value: users.filter(u => u.status === 'Bloqueado').length, icon: <Ban size={18} />, color: '#ef4444' },
        { label: 'Chefs', value: users.filter(u => u.role === 'Chef').length, icon: <Award size={18} />, color: '#f59e0b' },
    ]

    // Filtrar usuarios
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter === 'all' || user.role === roleFilter
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter
        return matchesSearch && matchesRole && matchesStatus
    })

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleBlock = (user) => {
        setSelectedUser(user)
        setBlockModalOpen(true)
    }

    const confirmBlock = () => {
        if (selectedUser) {
            blockUser(selectedUser.id)
            setBlockModalOpen(false)
            setSelectedUser(null)
        }
    }

    const handleDelete = (user) => {
        setSelectedUser(user)
        setDeleteModalOpen(true)
    }

    // Componente de carga interna
    const LoadingSkeleton = () => (
        <Box p="xl">
            <Stack gap="md">
                <Skeleton height={40} radius="xl" />
                <Skeleton height={60} radius="lg" />
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} height={50} radius="lg" />
                ))}
            </Stack>
        </Box>
    )

    return (
        <Container size="xl" py="md">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                            <LoadingSkeleton />
                        </Paper>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                            <Stack gap="lg">
                                {/* Header */}
                                <Group justify="space-between" wrap="wrap">
                                    <div>
                                        <Group gap="xs" mb={4}>
                                            <Users size={24} style={{ color: '#3b82f6' }} />
                                            <Title order={2} style={{ color: 'var(--text-h)' }}>
                                                Gestión de Usuarios
                                            </Title>
                                            <Badge size="lg" color="orange" variant="light">
                                                {users.length} usuarios
                                            </Badge>
                                        </Group>
                                        <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                            Administra todos los usuarios de Chester Recetas
                                        </Text>
                                    </div>
                                    <Group gap="sm">
                                        <Button
                                            component={Link}
                                            to="/admin/users/roles"
                                            leftSection={<Shield size={16} />}
                                            radius="xl"
                                            variant="light"
                                            style={{ 
                                                color: 'var(--accent)',
                                                background: 'var(--accent-bg)',
                                            }}
                                        >
                                            Roles y permisos
                                        </Button>
                                        <Button
                                            leftSection={<UserPlus size={16} />}
                                            radius="xl"
                                            style={{ 
                                                background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                                                border: 'none',
                                                color: 'white',
                                            }}
                                        >
                                            Invitar usuario
                                        </Button>
                                    </Group>
                                </Group>

                                {/* Stats */}
                                <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
                                    {stats.map((stat, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Card 
                                                withBorder 
                                                padding="md" 
                                                radius="lg"
                                                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
                                            >
                                                <Group justify="space-between">
                                                    <div>
                                                        <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{stat.label}</Text>
                                                        <Text size="xl" fw={700} style={{ color: 'var(--text-h)' }}>{stat.value}</Text>
                                                    </div>
                                                    <ThemeIcon size="lg" radius="xl" style={{ background: `${stat.color}20`, color: stat.color }}>
                                                        {stat.icon}
                                                    </ThemeIcon>
                                                </Group>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </SimpleGrid>

                                {/* Filtros */}
                                <Paper withBorder p="md" radius="lg" style={{ background: 'var(--bg-secondary)' }}>
                                    <Group grow wrap="wrap">
                                        <TextInput
                                            placeholder="Buscar por nombre o email..."
                                            leftSection={<Search size={16} />}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            radius="xl"
                                        />
                                        <Select
                                            placeholder="Filtrar por rol"
                                            data={[
                                                { value: 'all', label: 'Todos los roles' },
                                                { value: 'Admin', label: 'Administradores' },
                                                { value: 'Chef', label: 'Chefs' },
                                                { value: 'Moderador', label: 'Moderadores' },
                                                { value: 'Usuario', label: 'Usuarios' },
                                            ]}
                                            value={roleFilter}
                                            onChange={setRoleFilter}
                                            radius="xl"
                                        />
                                        <Select
                                            placeholder="Filtrar por estado"
                                            data={[
                                                { value: 'all', label: 'Todos los estados' },
                                                { value: 'Activo', label: 'Activos' },
                                                { value: 'Bloqueado', label: 'Bloqueados' },
                                                { value: 'Pendiente', label: 'Pendientes' },
                                            ]}
                                            value={statusFilter}
                                            onChange={setStatusFilter}
                                            radius="xl"
                                        />
                                    </Group>
                                </Paper>

                                {/* Tabla de usuarios */}
                                <Box style={{ overflowX: 'auto' }}>
                                    <Table striped highlightOnHover>
                                        <Table.Thead>
                                            <Table.Tr style={{ background: 'var(--bg-secondary)' }}>
                                                <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Usuario</Table.Th>
                                                <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Rol</Table.Th>
                                                <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Estado</Table.Th>
                                                <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Recetas</Table.Th>
                                                <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Comentarios</Table.Th>
                                                <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Fecha</Table.Th>
                                                <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Acciones</Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {paginatedUsers.map((user, idx) => {
                                                const role = getRoleColor(user.role)
                                                const status = getStatusColor(user.status)
                                                return (
                                                    <motion.tr
                                                        key={user.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.03 }}
                                                    >
                                                        <Table.Td>
                                                            <Group gap="sm">
                                                                <Avatar size="md" radius="xl" color="orange">
                                                                    {user.name.charAt(0)}
                                                                </Avatar>
                                                                <div>
                                                                    <Text fw={500} style={{ color: 'var(--text-h)' }}>{user.name}</Text>
                                                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{user.email}</Text>
                                                                </div>
                                                            </Group>
                                                        </Table.Td>
                                                        <Table.Td>
                                                            <Badge 
                                                                style={{ 
                                                                    background: role.bg,
                                                                    color: role.color,
                                                                }}
                                                                leftSection={role.icon}
                                                            >
                                                                {role.label}
                                                            </Badge>
                                                        </Table.Td>
                                                        <Table.Td>
                                                            <Badge 
                                                                style={{ 
                                                                    background: status.bg,
                                                                    color: status.color,
                                                                }}
                                                                leftSection={status.icon}
                                                            >
                                                                {user.status}
                                                            </Badge>
                                                        </Table.Td>
                                                        <Table.Td>
                                                            <Group gap="xs">
                                                                <BookOpen size={14} style={{ color: 'var(--text-secondary)' }} />
                                                                <Text size="sm" style={{ color: 'var(--text-secondary)' }}>{user.recipesCount}</Text>
                                                            </Group>
                                                        </Table.Td>
                                                        <Table.Td>
                                                            <Group gap="xs">
                                                                <MessageCircle size={14} style={{ color: 'var(--text-secondary)' }} />
                                                                <Text size="sm" style={{ color: 'var(--text-secondary)' }}>{user.commentsCount}</Text>
                                                            </Group>
                                                        </Table.Td>
                                                        <Table.Td>
                                                            <Group gap="xs">
                                                                <Calendar size={14} style={{ color: 'var(--text-secondary)' }} />
                                                                <Text size="sm" style={{ color: 'var(--text-secondary)' }}>{user.date}</Text>
                                                            </Group>
                                                        </Table.Td>
                                                        <Table.Td>
                                                            <Group gap="xs">
                                                                <ActionIcon variant="subtle" color="blue" size="sm">
                                                                    <Eye size={16} />
                                                                </ActionIcon>
                                                                <ActionIcon 
                                                                    component={Link}
                                                                    to={`/admin/users/edit/${user.id}`}
                                                                    variant="subtle" 
                                                                    color="orange" 
                                                                    size="sm"
                                                                >
                                                                    <Edit size={16} />
                                                                </ActionIcon>
                                                                {user.status === 'Activo' ? (
                                                                    <ActionIcon 
                                                                        variant="subtle" 
                                                                        color="red" 
                                                                        size="sm"
                                                                        onClick={() => handleBlock(user)}
                                                                    >
                                                                        <Ban size={16} />
                                                                    </ActionIcon>
                                                                ) : (
                                                                    <ActionIcon 
                                                                        variant="subtle" 
                                                                        color="green" 
                                                                        size="sm"
                                                                        onClick={() => handleBlock(user)}
                                                                    >
                                                                        <CheckCircle size={16} />
                                                                    </ActionIcon>
                                                                )}
                                                                <Menu shadow="md" position="bottom-end">
                                                                    <Menu.Target>
                                                                        <ActionIcon variant="subtle" size="sm">
                                                                            <MoreVertical size={16} />
                                                                        </ActionIcon>
                                                                    </Menu.Target>
                                                                    <Menu.Dropdown>
                                                                        <Menu.Item leftSection={<Eye size={14} />}>Ver perfil</Menu.Item>
                                                                        <Menu.Item 
                                                                            leftSection={<Shield size={14} />}
                                                                            component={Link}
                                                                            to="/admin/users/roles"
                                                                        >
                                                                            Cambiar rol
                                                                        </Menu.Item>
                                                                        {user.status === 'Activo' ? (
                                                                            <Menu.Item leftSection={<Ban size={14} />} color="red">Bloquear</Menu.Item>
                                                                        ) : (
                                                                            <Menu.Item leftSection={<CheckCircle size={14} />} color="green">Desbloquear</Menu.Item>
                                                                        )}
                                                                        <Menu.Divider />
                                                                        <Menu.Item 
                                                                            leftSection={<Trash2 size={14} />} 
                                                                            color="red"
                                                                            onClick={() => handleDelete(user)}
                                                                        >
                                                                            Eliminar
                                                                        </Menu.Item>
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

                                {filteredUsers.length === 0 && (
                                    <Box ta="center" py={60}>
                                        <Users size={48} style={{ color: 'var(--border)', marginBottom: 16 }} />
                                        <Text fw={500} style={{ color: 'var(--text-h)' }}>No hay usuarios</Text>
                                        <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                            No se encontraron usuarios con los filtros aplicados
                                        </Text>
                                    </Box>
                                )}

                                {/* Paginación */}
                                {Math.ceil(filteredUsers.length / itemsPerPage) > 1 && (
                                    <Group justify="space-between" mt="md">
                                        <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                            Mostrando {paginatedUsers.length} de {filteredUsers.length} usuarios
                                        </Text>
                                        <Pagination
                                            total={Math.ceil(filteredUsers.length / itemsPerPage)}
                                            value={currentPage}
                                            onChange={setCurrentPage}
                                            color="orange"
                                            radius="xl"
                                        />
                                    </Group>
                                )}
                            </Stack>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modales */}
            <Modal
                opened={blockModalOpen}
                onClose={() => setBlockModalOpen(false)}
                title={selectedUser?.status === 'Activo' ? 'Bloquear usuario' : 'Desbloquear usuario'}
                radius="xl"
                centered
            >
                <Stack gap="md">
                    <Alert color={selectedUser?.status === 'Activo' ? 'red' : 'green'} variant="light">
                        {selectedUser?.status === 'Activo' 
                            ? `¿Estás seguro de que deseas bloquear al usuario "${selectedUser?.name}"?`
                            : `¿Estás seguro de que deseas desbloquear al usuario "${selectedUser?.name}"?`
                        }
                    </Alert>
                    <Group justify="flex-end">
                        <Button variant="subtle" onClick={() => setBlockModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button 
                            color={selectedUser?.status === 'Activo' ? 'red' : 'green'} 
                            onClick={confirmBlock}
                        >
                            {selectedUser?.status === 'Activo' ? 'Bloquear' : 'Desbloquear'}
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            <Modal
                opened={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Eliminar usuario"
                radius="xl"
                centered
            >
                <Stack gap="md">
                    <Alert color="red" variant="light">
                        ¿Estás seguro de que deseas eliminar al usuario "{selectedUser?.name}"?
                        Esta acción no se puede deshacer.
                    </Alert>
                    <Group justify="flex-end">
                        <Button variant="subtle" onClick={() => setDeleteModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button color="red" onClick={() => setDeleteModalOpen(false)}>
                            Eliminar
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Container>
    )
}

export default UsersModule
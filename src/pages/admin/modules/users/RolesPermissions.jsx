import { useState } from 'react'
import {
    Container, Paper, Title, Text, Stack, Group,
    Card, Badge, Button, ThemeIcon, SimpleGrid,
    Switch, Divider, Table, Alert, Box, Tabs,
    ActionIcon, Tooltip
} from '@mantine/core'
import {
    Shield, Crown, UserCog, User, Users,
    BookOpen, MessageCircle, Settings, Trash2,
    Edit, Eye, Check, X, Lock, Unlock,
    Sparkles, ArrowLeft, Save, CheckCircle,
    UserCheck, UserX, Award
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Datos de roles y permisos
const rolesData = [
    {
        id: 'admin',
        name: 'Administrador',
        icon: <Crown size={20} />,
        color: '#f59e0b',
        description: 'Acceso completo a todas las funcionalidades',
        users: 1,
        permissions: {
            users: { view: true, create: true, edit: true, delete: true },
            recipes: { view: true, create: true, edit: true, delete: true },
            comments: { view: true, create: true, edit: true, delete: true },
            settings: { view: true, create: true, edit: true, delete: true },
            categories: { view: true, create: true, edit: true, delete: true },
        }
    },
    {
        id: 'chef',
        name: 'Chef',
        icon: <Award size={20} />,
        color: '#10b981',
        description: 'Puede crear y gestionar recetas',
        users: 12,
        permissions: {
            users: { view: false, create: false, edit: false, delete: false },
            recipes: { view: true, create: true, edit: true, delete: true },
            comments: { view: true, create: true, edit: false, delete: false },
            settings: { view: false, create: false, edit: false, delete: false },
            categories: { view: true, create: false, edit: false, delete: false },
        }
    },
    {
        id: 'moderator',
        name: 'Moderador',
        icon: <Shield size={20} />,
        color: '#3b82f6',
        description: 'Gestiona comentarios y contenido',
        users: 5,
        permissions: {
            users: { view: true, create: false, edit: false, delete: false },
            recipes: { view: true, create: false, edit: false, delete: false },
            comments: { view: true, create: true, edit: true, delete: true },
            settings: { view: false, create: false, edit: false, delete: false },
            categories: { view: false, create: false, edit: false, delete: false },
        }
    },
    {
        id: 'user',
        name: 'Usuario',
        icon: <User size={20} />,
        color: '#6b7280',
        description: 'Acceso básico a la plataforma',
        users: 234,
        permissions: {
            users: { view: false, create: false, edit: false, delete: false },
            recipes: { view: true, create: false, edit: false, delete: false },
            comments: { view: true, create: true, edit: false, delete: false },
            settings: { view: false, create: false, edit: false, delete: false },
            categories: { view: false, create: false, edit: false, delete: false },
        }
    }
]

const modules = [
    { id: 'users', label: 'Usuarios', icon: <Users size={16} /> },
    { id: 'recipes', label: 'Recetas', icon: <BookOpen size={16} /> },
    { id: 'comments', label: 'Comentarios', icon: <MessageCircle size={16} /> },
    { id: 'settings', label: 'Configuración', icon: <Settings size={16} /> },
    { id: 'categories', label: 'Categorías', icon: <Shield size={16} /> },
]

const actions = [
    { id: 'view', label: 'Ver', icon: <Eye size={14} />, color: '#3b82f6' },
    { id: 'create', label: 'Crear', icon: <Check size={14} />, color: '#10b981' },
    { id: 'edit', label: 'Editar', icon: <Edit size={14} />, color: '#f59e0b' },
    { id: 'delete', label: 'Eliminar', icon: <Trash2 size={14} />, color: '#ef4444' },
]

const RolesPermissions = () => {
    const [selectedRole, setSelectedRole] = useState('admin')
    const [permissions, setPermissions] = useState(rolesData)
    const [saved, setSaved] = useState(false)
    const [loading, setLoading] = useState(false)

    const currentRole = permissions.find(r => r.id === selectedRole)

    const handlePermissionChange = (roleId, moduleId, action) => {
        setPermissions(prev => prev.map(role => {
            if (role.id === roleId) {
                return {
                    ...role,
                    permissions: {
                        ...role.permissions,
                        [moduleId]: {
                            ...role.permissions[moduleId],
                            [action]: !role.permissions[moduleId][action]
                        }
                    }
                }
            }
            return role
        }))
    }

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }, 800)
    }

    // Verificar si un permiso está activo
    const isPermissionActive = (roleId, moduleId, action) => {
        const role = permissions.find(r => r.id === roleId)
        return role?.permissions[moduleId]?.[action] || false
    }

    return (
        <Container size="xl" py="md">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                    <Stack gap="lg">
                        {/* Header */}
                        <Group justify="space-between" wrap="wrap">
                            <Group gap="md">
                                <Button
                                    variant="subtle"
                                    leftSection={<ArrowLeft size={16} />}
                                    component={Link}
                                    to="/admin/users"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    Volver
                                </Button>
                                <div>
                                    <Group gap="xs" mb={4}>
                                        <Shield size={24} style={{ color: '#8b5cf6' }} />
                                        <Title order={2} style={{ color: 'var(--text-h)' }}>
                                            Roles y Permisos
                                        </Title>
                                    </Group>
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                        Gestiona los roles y permisos de los usuarios
                                    </Text>
                                </div>
                            </Group>
                            <Group gap="sm">
                                {saved && (
                                    <Badge
                                        color="green"
                                        size="lg"
                                        variant="light"
                                        leftSection={<CheckCircle size={14} />}
                                    >
                                        Guardado
                                    </Badge>
                                )}
                                <Button
                                    leftSection={<Save size={16} />}
                                    radius="xl"
                                    onClick={handleSave}
                                    loading={loading}
                                    style={{
                                        background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                                        border: 'none',
                                        color: 'white',
                                    }}
                                >
                                    Guardar cambios
                                </Button>
                            </Group>
                        </Group>

                        <Divider style={{ borderColor: 'var(--border)' }} />

                        {/* Grid de roles */}
                        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
                            {permissions.map((role) => (
                                <motion.div
                                    key={role.id}
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Card
                                        withBorder
                                        padding="md"
                                        radius="lg"
                                        style={{
                                            background: selectedRole === role.id ? 'var(--accent-bg)' : 'var(--bg-secondary)',
                                            borderColor: selectedRole === role.id ? 'var(--accent)' : 'var(--border)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onClick={() => setSelectedRole(role.id)}
                                    >
                                        <Group justify="space-between">
                                            <Group gap="sm">
                                                <ThemeIcon
                                                    size="lg"
                                                    radius="xl"
                                                    style={{
                                                        background: `${role.color}20`,
                                                        color: role.color,
                                                    }}
                                                >
                                                    {role.icon}
                                                </ThemeIcon>
                                                <div>
                                                    <Text fw={600} size="sm" style={{ color: 'var(--text-h)' }}>
                                                        {role.name}
                                                    </Text>
                                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                                        {role.users} usuarios
                                                    </Text>
                                                </div>
                                            </Group>
                                            {selectedRole === role.id && (
                                                <Badge color="orange" variant="light">Activo</Badge>
                                            )}
                                        </Group>
                                    </Card>
                                </motion.div>
                            ))}
                        </SimpleGrid>

                        {currentRole && (
                            <motion.div
                                key={selectedRole}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card withBorder p="xl" radius="lg" style={{ background: 'var(--bg-secondary)' }}>
                                    <Group justify="space-between" mb="lg">
                                        <div>
                                            <Group gap="xs">
                                                <ThemeIcon
                                                    size="md"
                                                    radius="xl"
                                                    style={{
                                                        background: `${currentRole.color}20`,
                                                        color: currentRole.color,
                                                    }}
                                                >
                                                    {currentRole.icon}
                                                </ThemeIcon>
                                                <Text fw={700} size="lg" style={{ color: 'var(--text-h)' }}>
                                                    {currentRole.name}
                                                </Text>
                                                <Badge
                                                    style={{
                                                        background: `${currentRole.color}20`,
                                                        color: currentRole.color,
                                                    }}
                                                >
                                                    {currentRole.users} usuarios
                                                </Badge>
                                            </Group>
                                            <Text size="sm" style={{ color: 'var(--text-secondary)' }} mt="xs">
                                                {currentRole.description}
                                            </Text>
                                        </div>
                                        <Tooltip label="Este rol no se puede eliminar" position="bottom">
                                            <ActionIcon variant="subtle" color="red" size="sm">
                                                <Trash2 size={16} />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Group>

                                    <Divider style={{ borderColor: 'var(--border)' }} mb="lg" />

                                    {/* Tabla de permisos */}
                                    <Box style={{ overflowX: 'auto' }}>
                                        <Table striped highlightOnHover>
                                            <Table.Thead>
                                                <Table.Tr style={{ background: 'var(--card-bg)' }}>
                                                    <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600, minWidth: 120 }}>
                                                        Módulo
                                                    </Table.Th>
                                                    {actions.map((action) => (
                                                        <Table.Th
                                                            key={action.id}
                                                            style={{
                                                                color: 'var(--text-h)',
                                                                fontWeight: 600,
                                                                textAlign: 'center',
                                                                minWidth: 80,
                                                            }}
                                                        >
                                                            <Group gap="xs" justify="center">
                                                                {action.icon}
                                                                <Text size="xs">{action.label}</Text>
                                                            </Group>
                                                        </Table.Th>
                                                    ))}
                                                </Table.Tr>
                                            </Table.Thead>
                                            <Table.Tbody>
                                                {modules.map((module) => (
                                                    <Table.Tr key={module.id}>
                                                        <Table.Td>
                                                            <Group gap="xs">
                                                                <ThemeIcon
                                                                    size="sm"
                                                                    radius="xl"
                                                                    style={{
                                                                        background: 'var(--accent-bg)',
                                                                        color: 'var(--accent)',
                                                                    }}
                                                                >
                                                                    {module.icon}
                                                                </ThemeIcon>
                                                                <Text fw={500} style={{ color: 'var(--text-h)' }}>
                                                                    {module.label}
                                                                </Text>
                                                            </Group>
                                                        </Table.Td>
                                                        {actions.map((action) => (
                                                            <Table.Td key={`${module.id}-${action.id}`} style={{ textAlign: 'center' }}>
                                                                <Switch
                                                                    checked={isPermissionActive(selectedRole, module.id, action.id)}
                                                                    onChange={() => handlePermissionChange(
                                                                        selectedRole,
                                                                        module.id,
                                                                        action.id
                                                                    )}
                                                                    size="md"
                                                                    color="orange"
                                                                    thumbIcon={
                                                                        isPermissionActive(selectedRole, module.id, action.id)
                                                                            ? <Check size={10} />
                                                                            : <X size={10} />
                                                                    }
                                                                    styles={{
                                                                        track: {
                                                                            '&[data-checked]': {
                                                                                backgroundColor: '#e67e22',
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Table.Td>
                                                        ))}
                                                    </Table.Tr>
                                                ))}
                                            </Table.Tbody>
                                        </Table>
                                    </Box>

                                    <Alert color="orange" variant="light" mt="lg">
                                        <Group gap="xs">
                                            <Sparkles size={16} style={{ color: '#f59e0b' }} />
                                            <Text size="sm">
                                                Los cambios en los permisos se aplicarán a todos los usuarios con este rol
                                            </Text>
                                        </Group>
                                    </Alert>
                                </Card>
                            </motion.div>
                        )}

                        <Divider style={{ borderColor: 'var(--border)' }} />

                        {/* Resumen de roles */}
                        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
                            {permissions.map((role) => (
                                <Card
                                    key={role.id}
                                    withBorder
                                    padding="sm"
                                    radius="lg"
                                    style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
                                >
                                    <Group justify="space-between">
                                        <Group gap="xs">
                                            <ThemeIcon
                                                size="sm"
                                                radius="xl"
                                                style={{
                                                    background: `${role.color}20`,
                                                    color: role.color,
                                                }}
                                            >
                                                {role.icon}
                                            </ThemeIcon>
                                            <Text size="sm" fw={500} style={{ color: 'var(--text-h)' }}>
                                                {role.name}
                                            </Text>
                                        </Group>
                                        <Badge size="sm" variant="light" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            {role.users}
                                        </Badge>
                                    </Group>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Paper>
            </motion.div>
        </Container>
    )
}

export default RolesPermissions
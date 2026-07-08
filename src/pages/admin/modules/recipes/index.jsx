import { useState } from 'react'
import { 
    Container, Paper, Title, Text, Table, Badge, Button, 
    Group, ActionIcon, Avatar, ThemeIcon, Menu, Box, 
    TextInput, Select, Pagination, Stack, Chip, Modal,
    Alert, LoadingOverlay
} from '@mantine/core'
import { 
    Edit, Trash2, Eye, Plus, Clock, Star, Sparkles, 
    MoreVertical, CheckCircle, XCircle, AlertCircle, 
    Search, Filter, BookOpen, Calendar
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../hooks/useAdmin'

const getStatusColor = (status) => {
    switch(status) {
        case 'Publicada': return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' }
        case 'Pendiente': return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' }
        case 'Borrador': return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' }
        case 'Rechazada': return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' }
        default: return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' }
    }
}

const getStatusIcon = (status) => {
    switch(status) {
        case 'Publicada': return <CheckCircle size={14} />
        case 'Pendiente': return <AlertCircle size={14} />
        case 'Borrador': return <Clock size={14} />
        case 'Rechazada': return <XCircle size={14} />
        default: return null
    }
}

const RecipesModule = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    
    const { recipes, deleteRecipe, isLoading } = useAdmin()
    const itemsPerPage = 10

    // Filtrar recetas
    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             recipe.author.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || recipe.status === statusFilter
        const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter
        return matchesSearch && matchesStatus && matchesCategory
    })

    // Paginación
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage)
    const paginatedRecipes = filteredRecipes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleDelete = (recipe) => {
        setSelectedRecipe(recipe)
        setDeleteModalOpen(true)
    }

    const confirmDelete = () => {
        if (selectedRecipe) {
            deleteRecipe(selectedRecipe.id)
            setDeleteModalOpen(false)
            setSelectedRecipe(null)
        }
    }

    // Categorías para el filtro
    const categories = ['all', ...new Set(recipes.map(r => r.category))]

    return (
        <Container size="xl" py="md">
            <LoadingOverlay visible={isLoading} />
            
            <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                <Stack gap="lg">
                    {/* Header */}
                    <Group justify="space-between" wrap="wrap">
                        <div>
                            <Group gap="xs" mb={4}>
                                <BookOpen size={24} style={{ color: '#e67e22' }} />
                                <Title order={2} style={{ color: 'var(--text-h)' }}>
                                    Gestión de Recetas
                                </Title>
                            </Group>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                Administra todas las recetas de Chester Recetas
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
                            }}
                        >
                            Nueva receta
                        </Button>
                    </Group>

                    {/* Filtros */}
                    <Paper withBorder p="md" radius="lg" style={{ background: 'var(--bg-secondary)' }}>
                        <Group grow wrap="wrap">
                            <TextInput
                                placeholder="Buscar por título o autor..."
                                leftSection={<Search size={16} />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                radius="xl"
                            />
                            <Select
                                placeholder="Filtrar por estado"
                                data={[
                                    { value: 'all', label: 'Todos los estados' },
                                    { value: 'Publicada', label: 'Publicadas' },
                                    { value: 'Pendiente', label: 'Pendientes' },
                                    { value: 'Borrador', label: 'Borradores' },
                                    { value: 'Rechazada', label: 'Rechazadas' },
                                ]}
                                value={statusFilter}
                                onChange={setStatusFilter}
                                radius="xl"
                            />
                            <Select
                                placeholder="Filtrar por categoría"
                                data={categories.map(c => ({ value: c, label: c === 'all' ? 'Todas las categorías' : c }))}
                                value={categoryFilter}
                                onChange={setCategoryFilter}
                                radius="xl"
                            />
                        </Group>
                    </Paper>

                    {/* Tabla de recetas */}
                    <Box style={{ overflowX: 'auto' }}>
                        <Table striped highlightOnHover>
                            <Table.Thead>
                                <Table.Tr style={{ background: 'var(--bg-secondary)' }}>
                                    <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Receta</Table.Th>
                                    <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Categoría</Table.Th>
                                    <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Estado</Table.Th>
                                    <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Vistas</Table.Th>
                                    <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Rating</Table.Th>
                                    <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Fecha</Table.Th>
                                    <Table.Th style={{ color: 'var(--text-h)', fontWeight: 600 }}>Acciones</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {paginatedRecipes.map((recipe, idx) => {
                                    const status = getStatusColor(recipe.status)
                                    return (
                                        <motion.tr
                                            key={recipe.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.03 }}
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
                                                    <Calendar size={14} style={{ color: 'var(--text-secondary)' }} />
                                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>{recipe.date}</Text>
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
                                                    <ActionIcon 
                                                        variant="subtle" 
                                                        color="red" 
                                                        size="sm"
                                                        onClick={() => handleDelete(recipe)}
                                                    >
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

                    {filteredRecipes.length === 0 && (
                        <Box ta="center" py={60}>
                            <BookOpen size={48} style={{ color: 'var(--border)', marginBottom: 16 }} />
                            <Text fw={500} style={{ color: 'var(--text-h)' }}>No hay recetas</Text>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                No se encontraron recetas con los filtros aplicados
                            </Text>
                        </Box>
                    )}

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <Group justify="space-between" mt="md">
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                Mostrando {paginatedRecipes.length} de {filteredRecipes.length} recetas
                            </Text>
                            <Pagination
                                total={totalPages}
                                value={currentPage}
                                onChange={setCurrentPage}
                                color="orange"
                                radius="xl"
                            />
                        </Group>
                    )}
                </Stack>
            </Paper>

            {/* Modal de confirmación de eliminación */}
            <Modal
                opened={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Eliminar receta"
                radius="xl"
                centered
            >
                <Stack gap="md">
                    <Alert color="red" variant="light">
                        ¿Estás seguro de que deseas eliminar la receta "{selectedRecipe?.title}"?
                        Esta acción no se puede deshacer.
                    </Alert>
                    <Group justify="flex-end">
                        <Button variant="subtle" onClick={() => setDeleteModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button color="red" onClick={confirmDelete}>
                            Eliminar
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Container>
    )
}

export default RecipesModule
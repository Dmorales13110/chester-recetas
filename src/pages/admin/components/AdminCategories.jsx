import { useState } from 'react'
import {
    Paper, Title, Text, Group, Badge, Button,
    ActionIcon, SimpleGrid, Card, ThemeIcon,
    TextInput, Modal, Stack, Alert, LoadingOverlay,
    Menu, Select, ColorInput, Box
} from '@mantine/core'
import {
    Tag, Plus, Edit, Trash2, MoreVertical,
    Coffee, Salad, Pizza, Cake, Soup, Utensils,
    Fish, Beef, Egg, Cookie, Search,
    CheckCircle, XCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

const iconMap = {
    Coffee: <Coffee size={24} />,
    Salad: <Salad size={24} />,
    Pizza: <Pizza size={24} />,
    Cake: <Cake size={24} />,
    Soup: <Soup size={24} />,
    Utensils: <Utensils size={24} />,
    Fish: <Fish size={24} />,
    Beef: <Beef size={24} />,
    Egg: <Egg size={24} />,
    Cookie: <Cookie size={24} />,
    Cheese: <Cookie size={24} />,
}

const categoriesData = [
    { id: 1, name: 'Desayunos', icon: 'Coffee', count: 24, color: '#f59e0b', slug: 'desayunos' },
    { id: 2, name: 'Ensaladas', icon: 'Salad', count: 18, color: '#10b981', slug: 'ensaladas' },
    { id: 3, name: 'Pastas', icon: 'Pizza', count: 32, color: '#e67e22', slug: 'pastas' },
    { id: 4, name: 'Postres', icon: 'Cake', count: 45, color: '#ec4899', slug: 'postres' },
    { id: 5, name: 'Sopas', icon: 'Soup', count: 28, color: '#3b82f6', slug: 'sopas' },
    { id: 6, name: 'Pescados', icon: 'Fish', count: 16, color: '#06b6d4', slug: 'pescados' },
    { id: 7, name: 'Carnes', icon: 'Beef', count: 20, color: '#ef4444', slug: 'carnes' },
    { id: 8, name: 'Quesos', icon: 'Cheese', count: 24, color: '#f5a623', slug: 'quesos' },
    { id: 9, name: 'Galletas', icon: 'Cookie', count: 30, color: '#8b5cf6', slug: 'galletas' },
    { id: 10, name: 'Huevos', icon: 'Egg', count: 14, color: '#fbbf24', slug: 'huevos' },
]

const AdminCategories = () => {
    const [categories, setCategories] = useState(categoriesData)
    const [searchTerm, setSearchTerm] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ name: '', icon: 'Utensils', color: '#e67e22' })

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSave = () => {
        setIsLoading(true)
        setTimeout(() => {
            if (editingCategory) {
                setCategories(categories.map(c =>
                    c.id === editingCategory.id
                        ? { ...c, ...formData }
                        : c
                ))
            } else {
                const newCategory = {
                    id: categories.length + 1,
                    ...formData,
                    count: 0,
                    slug: formData.name.toLowerCase().replace(/\s/g, '-')
                }
                setCategories([...categories, newCategory])
            }
            setIsLoading(false)
            setModalOpen(false)
            setEditingCategory(null)
            setFormData({ name: '', icon: 'Utensils', color: '#e67e22' })
        }, 1000)
    }

    const handleDelete = (id) => {
        setCategories(categories.filter(c => c.id !== id))
    }

    const openEditModal = (category) => {
        setEditingCategory(category)
        setFormData({
            name: category.name,
            icon: category.icon,
            color: category.color
        })
        setModalOpen(true)
    }

    return (
        <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
            <LoadingOverlay visible={isLoading} />

            <Group justify="space-between" mb="lg">
                <div>
                    <Group gap="xs" mb={4}>
                        <Tag size={24} style={{ color: '#8b5cf6' }} />
                        <Title order={3} style={{ color: 'var(--text-h)' }}>Categorías</Title>
                        <Badge size="lg" color="orange" variant="light">
                            {categories.length} categorías
                        </Badge>
                    </Group>
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                        Gestiona las categorías de recetas
                    </Text>
                </div>
                <Button
                    leftSection={<Plus size={16} />}
                    radius="xl"
                    onClick={() => {
                        setEditingCategory(null)
                        setFormData({ name: '', icon: 'Utensils', color: '#e67e22' })
                        setModalOpen(true)
                    }}
                    style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                        border: 'none',
                        color: 'white',
                    }}
                >
                    Nueva categoría
                </Button>
            </Group>

            <TextInput
                placeholder="Buscar categoría..."
                leftSection={<Search size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                radius="xl"
                mb="lg"
                styles={{
                    input: {
                        backgroundColor: 'var(--input-bg)',
                        borderColor: 'var(--border)',
                        color: 'var(--input-text)',
                    }
                }}
            />

            <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
                {filteredCategories.map((category, idx) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.03 }}
                        whileHover={{ y: -5 }}
                    >
                        <Card
                            withBorder
                            padding="lg"
                            radius="xl"
                            style={{
                                background: 'var(--card-bg)',
                                borderColor: 'var(--border)',
                                transition: 'all 0.3s ease',
                                textAlign: 'center',
                                position: 'relative',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = category.color
                                e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <Menu shadow="md" position="top-end" style={{ position: 'absolute', top: 8, right: 8 }}>
                                <Menu.Target>
                                    <ActionIcon variant="subtle" size="sm">
                                        <MoreVertical size={16} style={{ color: 'var(--text-secondary)' }} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<Edit size={14} />} onClick={() => openEditModal(category)}>
                                        Editar
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={<Trash2 size={14} />}
                                        color="red"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        Eliminar
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>

                            <ThemeIcon
                                size={50}
                                radius="xl"
                                variant="light"
                                mx="auto"
                                style={{
                                    background: `${category.color}20`,
                                    color: category.color,
                                }}
                            >
                                {iconMap[category.icon] || <Utensils size={24} />}
                            </ThemeIcon>

                            <Text fw={600} mt="md" style={{ color: 'var(--text-h)' }}>
                                {category.name}
                            </Text>

                            <Badge
                                variant="light"
                                size="sm"
                                mt={4}
                                style={{
                                    background: `${category.color}20`,
                                    color: category.color,
                                }}
                            >
                                {category.count} recetas
                            </Badge>
                        </Card>
                    </motion.div>
                ))}
            </SimpleGrid>

            {filteredCategories.length === 0 && (
                <Box ta="center" py={60}>
                    <Tag size={48} style={{ color: 'var(--border)', marginBottom: 16 }} />
                    <Text fw={500} style={{ color: 'var(--text-h)' }}>No hay categorías</Text>
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                        No se encontraron categorías con el filtro aplicado
                    </Text>
                </Box>
            )}

            {/* Modal de creación/edición */}
            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingCategory ? 'Editar categoría' : 'Nueva categoría'}
                radius="xl"
                centered
            >
                <Stack gap="md">
                    <TextInput
                        label="Nombre"
                        placeholder="Ej: Desayunos"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        radius="md"
                        required
                    />

                    <Select
                        label="Icono"
                        data={Object.keys(iconMap).map(key => ({ value: key, label: key }))}
                        value={formData.icon}
                        onChange={(value) => setFormData({ ...formData, icon: value })}
                        radius="md"
                    />

                    <ColorInput
                        label="Color"
                        value={formData.color}
                        onChange={(value) => setFormData({ ...formData, color: value })}
                        radius="md"
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={() => setModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSave}
                            style={{
                                background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                                border: 'none',
                                color: 'white',
                            }}
                        >
                            {editingCategory ? 'Guardar cambios' : 'Crear categoría'}
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Paper>
    )
}

export default AdminCategories
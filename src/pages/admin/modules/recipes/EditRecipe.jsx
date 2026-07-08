import { useState, useEffect } from 'react'
import { 
    Container, Paper, Title, Text, Stack, Group, 
    TextInput, Textarea, Select, Button, Image, 
    FileInput, Chip, SimpleGrid, Divider, Alert,
    NumberInput, LoadingOverlay, Badge
} from '@mantine/core'
import { 
    ArrowLeft, Save, Upload, X, ChefHat, 
    Clock, Users, Star, Tag, Sparkles, Trash2
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdmin } from '../../hooks/useAdmin'

const EditRecipe = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { recipes, updateRecipe, isLoading } = useAdmin()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        cookTime: '',
        difficulty: '',
        servings: 4,
        calories: '',
        tags: [],
        image: '',
        status: 'Borrador'
    })

    const categories = ['Desayunos', 'Ensaladas', 'Pastas', 'Postres', 'Cenas', 'Sopas', 'Pescados', 'Carnes', 'Quesos']
    const difficulties = ['Fácil', 'Media', 'Difícil']
    const popularTags = ['Rápido', 'Saludable', 'Vegetariano', 'Sin gluten', 'Bajo en carbohidratos', 'Alta proteína']

    // Cargar datos de la receta
    useEffect(() => {
        const recipe = recipes.find(r => r.id === parseInt(id))
        if (recipe) {
            setFormData({
                title: recipe.title,
                category: recipe.category,
                description: recipe.description || '',
                ingredients: recipe.ingredients || '',
                instructions: recipe.instructions || '',
                prepTime: recipe.prepTime || '',
                cookTime: recipe.cookTime || '',
                difficulty: recipe.difficulty || '',
                servings: recipe.servings || 4,
                calories: recipe.calories || '',
                tags: recipe.tags || [],
                image: recipe.image || '',
                status: recipe.status || 'Borrador'
            })
        }
    }, [id, recipes])

    const handleImageUpload = (file) => {
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setTimeout(() => {
            updateRecipe(parseInt(id), formData)
            setIsSubmitting(false)
            navigate('/admin/recipes')
        }, 1500)
    }

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta receta?')) {
            // Lógica de eliminación
            navigate('/admin/recipes')
        }
    }

    if (isLoading) {
        return (
            <Container size="xl" py="md">
                <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                    <LoadingOverlay visible={true} />
                </Paper>
            </Container>
        )
    }

    return (
        <Container size="xl" py="md">
            <LoadingOverlay visible={isSubmitting} />

            <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                <form onSubmit={handleSubmit}>
                    <Stack gap="lg">
                        {/* Header */}
                        <Group justify="space-between" wrap="wrap">
                            <Group gap="md">
                                <Button
                                    variant="subtle"
                                    leftSection={<ArrowLeft size={16} />}
                                    onClick={() => navigate('/admin/recipes')}
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    Volver
                                </Button>
                                <div>
                                    <Group gap="xs" mb={4}>
                                        <ChefHat size={24} style={{ color: '#e67e22' }} />
                                        <Title order={2} style={{ color: 'var(--text-h)' }}>
                                            Editar receta
                                        </Title>
                                        <Badge 
                                            color={formData.status === 'Publicada' ? 'green' : 'orange'} 
                                            variant="light"
                                        >
                                            {formData.status}
                                        </Badge>
                                    </Group>
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                        Edita los detalles de la receta
                                    </Text>
                                </div>
                            </Group>
                            <Group gap="sm">
                                <Button 
                                    variant="light" 
                                    color="red"
                                    leftSection={<Trash2 size={16} />}
                                    onClick={handleDelete}
                                >
                                    Eliminar
                                </Button>
                                <Button variant="light" onClick={() => navigate('/admin/recipes')}>
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit"
                                    leftSection={<Save size={16} />}
                                    radius="xl"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                                        border: 'none',
                                        color: 'white',
                                    }}
                                >
                                    Guardar cambios
                                </Button>
                            </Group>
                        </Group>

                        <Divider style={{ borderColor: 'var(--border)' }} />

                        {/* Resto del formulario igual que CreateRecipe */}
                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                            {/* Columna izquierda */}
                            <Stack gap="md">
                                <TextInput
                                    label="Título de la receta"
                                    placeholder="Ej: Pasta al Pesto"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    radius="md"
                                    required
                                />

                                <Select
                                    label="Categoría"
                                    placeholder="Selecciona una categoría"
                                    data={categories}
                                    value={formData.category}
                                    onChange={(value) => setFormData({...formData, category: value})}
                                    radius="md"
                                    required
                                />

                                <Textarea
                                    label="Descripción"
                                    placeholder="Describe tu receta brevemente..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    minRows={3}
                                    radius="md"
                                />

                                <Textarea
                                    label="Ingredientes"
                                    placeholder="Lista de ingredientes (uno por línea)"
                                    value={formData.ingredients}
                                    onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                                    minRows={5}
                                    radius="md"
                                    required
                                />

                                <Textarea
                                    label="Instrucciones"
                                    placeholder="Paso a paso de la preparación"
                                    value={formData.instructions}
                                    onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                                    minRows={6}
                                    radius="md"
                                    required
                                />
                            </Stack>

                            {/* Columna derecha */}
                            <Stack gap="md">
                                <FileInput
                                    label="Imagen de la receta"
                                    placeholder="Sube una imagen"
                                    accept="image/png,image/jpeg,image/webp"
                                    leftSection={<Upload size={16} />}
                                    onChange={handleImageUpload}
                                    radius="md"
                                    styles={{
                                        input: {
                                            backgroundColor: 'var(--input-bg)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--input-text)',
                                        }
                                    }}
                                />

                                {previewImage || formData.image ? (
                                    <div style={{ position: 'relative' }}>
                                        <Image 
                                            src={previewImage || formData.image} 
                                            height={200} 
                                            fit="cover" 
                                            radius="md"
                                            style={{ border: '1px solid var(--border)' }}
                                        />
                                        <Button
                                            variant="subtle"
                                            color="red"
                                            size="xs"
                                            style={{ 
                                                position: 'absolute', 
                                                top: 8, 
                                                right: 8,
                                                background: 'rgba(0,0,0,0.5)',
                                            }}
                                            onClick={() => {
                                                setPreviewImage(null)
                                                setFormData({...formData, image: ''})
                                            }}
                                        >
                                            <X size={14} />
                                        </Button>
                                    </div>
                                ) : null}

                                <SimpleGrid cols={2} spacing="md">
                                    <TextInput
                                        label="Tiempo de preparación"
                                        placeholder="15 min"
                                        value={formData.prepTime}
                                        onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
                                        radius="md"
                                        leftSection={<Clock size={14} />}
                                    />
                                    <TextInput
                                        label="Tiempo de cocción"
                                        placeholder="30 min"
                                        value={formData.cookTime}
                                        onChange={(e) => setFormData({...formData, cookTime: e.target.value})}
                                        radius="md"
                                        leftSection={<Clock size={14} />}
                                    />
                                </SimpleGrid>

                                <Select
                                    label="Dificultad"
                                    placeholder="Selecciona la dificultad"
                                    data={difficulties}
                                    value={formData.difficulty}
                                    onChange={(value) => setFormData({...formData, difficulty: value})}
                                    radius="md"
                                    leftSection={<Star size={14} />}
                                />

                                <SimpleGrid cols={2} spacing="md">
                                    <NumberInput
                                        label="Porciones"
                                        value={formData.servings}
                                        onChange={(value) => setFormData({...formData, servings: value})}
                                        min={1}
                                        max={20}
                                        radius="md"
                                        leftSection={<Users size={14} />}
                                    />
                                    <TextInput
                                        label="Calorías"
                                        placeholder="320 kcal"
                                        value={formData.calories}
                                        onChange={(e) => setFormData({...formData, calories: e.target.value})}
                                        radius="md"
                                    />
                                </SimpleGrid>

                                <div>
                                    <Text size="sm" fw={500} mb="xs" style={{ color: 'var(--text-h)' }}>
                                        Etiquetas
                                    </Text>
                                    <Chip.Group
                                        value={formData.tags}
                                        onChange={(value) => setFormData({...formData, tags: value})}
                                    >
                                        <Group gap="xs">
                                            {popularTags.map((tag) => (
                                                <Chip 
                                                    key={tag} 
                                                    value={tag} 
                                                    variant="light"
                                                    radius="xl"
                                                    styles={{
                                                        label: {
                                                            backgroundColor: 'var(--bg-secondary)',
                                                            color: 'var(--text)',
                                                            '&[data-checked]': {
                                                                backgroundColor: 'var(--accent-bg)',
                                                                color: 'var(--accent)',
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {tag}
                                                </Chip>
                                            ))}
                                        </Group>
                                    </Chip.Group>
                                </div>

                                <Select
                                    label="Estado"
                                    data={[
                                        { value: 'Borrador', label: 'Borrador' },
                                        { value: 'Pendiente', label: 'Pendiente de revisión' },
                                        { value: 'Publicada', label: 'Publicada' },
                                    ]}
                                    value={formData.status}
                                    onChange={(value) => setFormData({...formData, status: value})}
                                    radius="md"
                                />

                                <Alert color="orange" variant="light">
                                    <Group gap="xs">
                                        <Sparkles size={16} />
                                        <Text size="sm">
                                            Recuerda revisar todos los campos antes de guardar los cambios
                                        </Text>
                                    </Group>
                                </Alert>
                            </Stack>
                        </SimpleGrid>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

export default EditRecipe
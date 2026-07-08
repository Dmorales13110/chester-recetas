import { useState } from 'react'
import { 
    Container, Paper, Title, Text, Stack, Group, 
    TextInput, Textarea, Select, Button, Image, 
    FileInput, Chip, SimpleGrid, Divider, Alert,
    NumberInput, LoadingOverlay, Badge
} from '@mantine/core'
import { 
    ArrowLeft, Save, Upload, X, ChefHat, 
    Clock, Users, Star, Tag, Sparkles
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const CreateRecipe = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
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
    })

    const categories = ['Desayunos', 'Ensaladas', 'Pastas', 'Postres', 'Cenas', 'Sopas', 'Pescados', 'Carnes', 'Quesos']
    const difficulties = ['Fácil', 'Media', 'Difícil']
    const popularTags = ['Rápido', 'Saludable', 'Vegetariano', 'Sin gluten', 'Bajo en carbohidratos', 'Alta proteína']

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
        setIsLoading(true)
        // Simular envío
        setTimeout(() => {
            setIsLoading(false)
            navigate('/admin/recipes')
        }, 1500)
    }

    return (
        <Container size="xl" py="md">
            <LoadingOverlay visible={isLoading} />

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
                                            Nueva receta
                                        </Title>
                                        <Badge color="orange" variant="light">Borrador</Badge>
                                    </Group>
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                        Crea una nueva receta para Chester Recetas
                                    </Text>
                                </div>
                            </Group>
                            <Group gap="sm">
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
                                    Guardar receta
                                </Button>
                            </Group>
                        </Group>

                        <Divider style={{ borderColor: 'var(--border)' }} />

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

                                {previewImage && (
                                    <div style={{ position: 'relative' }}>
                                        <Image 
                                            src={previewImage} 
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
                                            onClick={() => setPreviewImage(null)}
                                        >
                                            <X size={14} />
                                        </Button>
                                    </div>
                                )}

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

                                <Alert color="orange" variant="light">
                                    <Group gap="xs">
                                        <Sparkles size={16} />
                                        <Text size="sm">
                                            Recuerda revisar todos los campos antes de publicar la receta
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

export default CreateRecipe
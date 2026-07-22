import { useState } from 'react'
import { Paper, TextInput, Textarea, Button, Group, Title, Text, Select, Image, Alert, LoadingOverlay, Chip, ThemeIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Upload, CheckCircle, X, Clock, Star, ChefHat, List, BookOpen, Sparkles } from 'lucide-react'
import { recipeService } from '../../../services'
import { useAuth } from '../../../context/AuthContext'

const categories = [
    'Desayunos', 'Ensaladas', 'Pastas', 'Postres', 'Cenas', 'Sopas', 'Pescados', 'Carnes', 'Quesos'
]

const difficulties = [
    { value: 'facil', label: 'Fácil' },
    { value: 'media', label: 'Media' },
    { value: 'dificil', label: 'Difícil' },
]

const ShareRecipeForm = () => {
    const { user, isAuthenticated } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')
    const [previewImage, setPreviewImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)

    const form = useForm({
        initialValues: {
            recipeName: '',
            category: '',
            description: '',
            ingredients: '',
            instructions: '',
            prepTime: '',
            cookTime: '',
            difficulty: '',
            authorName: user?.name || '',
            authorEmail: user?.email || '',
            notes: '',
        },
        validate: {
            recipeName: (value) => value.length < 3 ? 'El nombre de la receta es requerido' : null,
            category: (value) => !value ? 'Selecciona una categoría' : null,
            description: (value) => value.length < 20 ? 'Describe brevemente tu receta' : null,
            ingredients: (value) => value.length < 20 ? 'Ingresa los ingredientes' : null,
            instructions: (value) => value.length < 30 ? 'Describe el paso a paso' : null,
            authorName: (value) => value.length < 2 ? 'Tu nombre es requerido' : null,
            authorEmail: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
        },
    })

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setPreviewImage(null)
        setImageFile(null)
    }

    // Función para preparar los datos de la receta para el backend
    const prepareRecipeData = (values) => {
        // Convertir ingredientes de texto a array
        const ingredientsList = values.ingredients
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => {
                // Intentar parsear cantidad, unidad e ingrediente
                const match = line.match(/^([\d.]+)\s*([a-zA-Z]+)?\s*(.+)/)
                if (match) {
                    return {
                        cantidad: parseFloat(match[1]),
                        unidad: match[2] || '',
                        ingrediente: match[3] || line
                    }
                }
                return {
                    cantidad: 0,
                    unidad: '',
                    ingrediente: line
                }
            })

        // Convertir instrucciones de texto a array
        const instructionsList = values.instructions
            .split('\n')
            .filter(line => line.trim() !== '')

        // Preparar el objeto de receta
        const recipeData = {
            receta: {
                nombre: values.recipeName,
                descripcion: values.description,
                id_categoria: getCategoryId(values.category),
                info_nutri: {
                    calorias: 0,
                    proteinas: '0g',
                    carbohidratos: '0g',
                    grasas: '0g'
                },
                instrucciones: instructionsList,
                consejos: {
                    conservacion: values.notes || 'Conservar en nevera',
                    tip_cocina: 'Disfruta de tu creación'
                },
                id_user: user?.id || null
            },
            ingredientes: ingredientsList
        }

        return recipeData
    }

    // Obtener ID de categoría (simplificado - en producción vendría de la API)
    const getCategoryId = (categoryName) => {
        const categoryMap = {
            'Desayunos': 1,
            'Ensaladas': 2,
            'Pastas': 3,
            'Postres': 4,
            'Cenas': 5,
            'Sopas': 6,
            'Pescados': 7,
            'Carnes': 8,
            'Quesos': 9
        }
        return categoryMap[categoryName] || 1
    }

    const handleSubmit = async (values) => {
        setError('')
        setIsSubmitting(true)

        try {
            // Verificar autenticación
            if (!isAuthenticated) {
                setError('Debes iniciar sesión para compartir una receta')
                setIsSubmitting(false)
                return
            }

            // Preparar datos
            const recipeData = prepareRecipeData(values)
            console.log('📦 Datos a enviar:', recipeData)

            // Enviar al backend
            const response = await recipeService.createRecipe(recipeData)
            console.log('✅ Receta creada:', response)

            setIsSuccess(true)
            form.reset()
            removeImage()
            
            setTimeout(() => {
                setIsSuccess(false)
            }, 5000)

        } catch (error) {
            console.error('❌ Error al enviar receta:', error)
            setError(error.message || 'Error al enviar la receta. Intenta nuevamente.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Estilos para inputs
    const inputStyles = {
        input: {
            backgroundColor: 'var(--input-bg) !important',
            border: '1px solid var(--border) !important',
            color: 'var(--input-text) !important',
            '&:focus': {
                borderColor: '#e67e22',
            }
        },
        label: {
            color: 'var(--text-h)',
            marginBottom: 6,
            fontWeight: 500,
        },
        dropdown: {
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
        },
        option: {
            color: 'var(--text)',
            '&[data-selected]': {
                backgroundColor: '#e67e22',
                color: 'white',
            }
        }
    }

    return (
        <Paper withBorder p="xl" radius="xl" style={{
            background: 'var(--card-bg)',
            borderColor: 'var(--border)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute',
                bottom: -50,
                left: -50,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'var(--accent-bg)',
                opacity: 0.5,
            }} />

            <LoadingOverlay visible={isSubmitting} />

            <Group justify="space-between" align="flex-start" mb="md">
                <div>
                    <Group gap="xs" mb="xs">
                        <ThemeIcon size="md" radius="xl" color="orange" variant="light">
                            <Sparkles size={16} />
                        </ThemeIcon>
                        <Text size="sm" c="orange" fw={500}>¡Comparte tu talento!</Text>
                    </Group>
                    <Title order={3} style={{ color: 'var(--text-h)' }}>Comparte tu receta</Title>
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                        ¿Tienes una receta especial? ¡<strong style={{ color: '#e67e22' }}>Chester</strong> y la comunidad quieren conocerla!
                    </Text>
                </div>
                <Chip
                    checked={false}
                    variant="light"
                    color="orange"
                    icon={<Clock size={14} />}
                    style={{ background: 'var(--accent-bg)', color: '#e67e22' }}
                >
                    Revisión en 24-48h
                </Chip>
            </Group>

            {isSuccess && (
                <Alert
                    icon={<CheckCircle size={16} />}
                    title="¡Receta enviada!"
                    color="green"
                    mb="lg"
                    withCloseButton
                    onClose={() => setIsSuccess(false)}
                    style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: '#10b981' }}
                >
                    ¡Gracias por compartir! Chester revisará tu receta y te notificará cuando esté publicada. 🐕
                </Alert>
            )}

            {error && (
                <Alert
                    icon={<X size={16} />}
                    title="Error"
                    color="red"
                    mb="lg"
                    withCloseButton
                    onClose={() => setError('')}
                    style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444' }}
                >
                    {error}
                </Alert>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Title order={4} mb="md" size="sm" style={{ color: 'var(--text-h)' }}>📋 Información básica</Title>

                <TextInput
                    label="Nombre de la receta"
                    placeholder="Ej: Brownie de chocolate"
                    leftSection={<BookOpen size={16} />}
                    {...form.getInputProps('recipeName')}
                    mb="md"
                    radius="md"
                    styles={inputStyles}
                />

                <Select
                    label="Categoría"
                    placeholder="Selecciona una categoría"
                    data={categories}
                    {...form.getInputProps('category')}
                    mb="md"
                    radius="md"
                    styles={inputStyles}
                />

                <Textarea
                    label="Descripción breve"
                    placeholder="Cuéntanos de qué trata tu receta..."
                    {...form.getInputProps('description')}
                    mb="md"
                    radius="md"
                    styles={inputStyles}
                />

                <Title order={4} mb="md" mt="lg" size="sm" style={{ color: 'var(--text-h)' }}>🥘 Ingredientes y preparación</Title>

                <Textarea
                    label="Ingredientes"
                    placeholder="Lista de ingredientes (uno por línea)"
                    leftSection={<List size={16} />}
                    {...form.getInputProps('ingredients')}
                    minRows={4}
                    mb="md"
                    radius="md"
                    styles={inputStyles}
                />

                <Textarea
                    label="Instrucciones"
                    placeholder="Paso a paso de la preparación"
                    {...form.getInputProps('instructions')}
                    minRows={5}
                    mb="md"
                    radius="md"
                    styles={inputStyles}
                />

                <Group grow mb="md">
                    <TextInput
                        label="Tiempo de preparación"
                        placeholder="Ej: 15 min"
                        {...form.getInputProps('prepTime')}
                        radius="md"
                        styles={inputStyles}
                    />
                    <TextInput
                        label="Tiempo de cocción"
                        placeholder="Ej: 30 min"
                        {...form.getInputProps('cookTime')}
                        radius="md"
                        styles={inputStyles}
                    />
                    <Select
                        label="Dificultad"
                        placeholder="Selecciona"
                        data={difficulties}
                        {...form.getInputProps('difficulty')}
                        radius="md"
                        styles={inputStyles}
                    />
                </Group>

                <Title order={4} mb="md" mt="lg" size="sm" style={{ color: 'var(--text-h)' }}>📸 Foto de la receta</Title>

                <Paper withBorder p="md" radius="md" mb="md" ta="center" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                    {previewImage ? (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Image src={previewImage} height={200} fit="contain" radius="md" />
                            <Button
                                variant="subtle"
                                color="red"
                                size="xs"
                                style={{ position: 'absolute', top: 5, right: 5 }}
                                onClick={removeImage}
                            >
                                <X size={14} />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                                id="recipe-image"
                            />
                            <label htmlFor="recipe-image">
                                <Button component="span" variant="light" leftSection={<Upload size={16} />} radius="xl" color="orange">
                                    Subir imagen
                                </Button>
                            </label>
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }} mt="sm">
                                Formatos: JPG, PNG. Máx 5MB.
                            </Text>
                        </>
                    )}
                </Paper>

                <Title order={4} mb="md" mt="lg" size="sm" style={{ color: 'var(--text-h)' }}>👨‍🍳 Información del autor</Title>

                <TextInput
                    label="Tu nombre"
                    placeholder="Cómo quieres aparecer"
                    leftSection={<ChefHat size={16} />}
                    {...form.getInputProps('authorName')}
                    mb="md"
                    radius="md"
                    styles={inputStyles}
                />

                <TextInput
                    label="Tu correo"
                    placeholder="Para contactarte si es necesario"
                    {...form.getInputProps('authorEmail')}
                    mb="lg"
                    radius="md"
                    styles={inputStyles}
                />

                <Textarea
                    label="Notas adicionales"
                    placeholder="Alguna observación, consejo, etc."
                    {...form.getInputProps('notes')}
                    minRows={2}
                    mb="lg"
                    radius="md"
                    styles={inputStyles}
                />

                <Button
                    type="submit"
                    color="orange"
                    radius="xl"
                    size="lg"
                    fullWidth
                    leftSection={<Star size={18} />}
                    loading={isSubmitting}
                    style={{
                        background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                        border: 'none',
                        transition: 'all 0.2s',
                    }}
                    styles={{
                        root: {
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 10px 20px -5px rgba(230, 126, 34, 0.3)',
                            }
                        }
                    }}
                >
                    Enviar receta
                </Button>

                <Text size="xs" style={{ color: 'var(--text-secondary)' }} ta="center" mt="md">
                    Al enviar, aceptas que tu receta sea revisada y publicada en Chester Recetas.
                    Te daremos crédito como autor de la receta. 🐕
                </Text>
            </form>
        </Paper>
    )
}

export default ShareRecipeForm
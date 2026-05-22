import { useState } from 'react'
import { Paper, TextInput, Textarea, Button, Group, Title, Text, Select, Image, Alert, LoadingOverlay, Chip, ThemeIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Upload, CheckCircle, X, Clock, Star, ChefHat, List, BookOpen, Sparkles } from 'lucide-react'

const categories = [
    'Desayunos', 'Ensaladas', 'Pastas', 'Postres', 'Cenas', 'Sopas', 'Pescados', 'Carnes', 'Quesos'
]

const difficulties = [
    { value: 'facil', label: 'Fácil' },
    { value: 'media', label: 'Media' },
    { value: 'dificil', label: 'Difícil' },
]

const ShareRecipeForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)

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
            authorName: '',
            authorEmail: '',
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
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (values) => {
        setIsSubmitting(true)
        setTimeout(() => {
            console.log('Receta enviada:', { ...values, image: previewImage })
            setIsSubmitting(false)
            setIsSuccess(true)
            form.reset()
            setPreviewImage(null)
            setTimeout(() => setIsSuccess(false), 5000)
        }, 2000)
    }

    const inputStyles = {
        input: {
            backgroundColor: '#ffffff !important',
            border: '1px solid #e9ecef',
            color: '#1a1a2e !important',
            '&:focus': {
                borderColor: '#e67e22',
            }
        },
        label: {
            color: '#1a1a2e',
            marginBottom: 6,
            fontWeight: 500,
        },
        dropdown: {
            backgroundColor: '#ffffff',
            borderColor: '#e9ecef',
        },
        option: {
            color: '#1a1a2e',
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

                <Paper withBorder p="md" radius="md" mb="md" ta="center" style={{ background: '#f8f9fa', borderColor: '#e9ecef' }}>
                    {previewImage ? (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Image src={previewImage} height={200} fit="contain" radius="md" />
                            <Button
                                variant="subtle"
                                color="red"
                                size="xs"
                                style={{ position: 'absolute', top: 5, right: 5 }}
                                onClick={() => setPreviewImage(null)}
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
                            <Text size="xs" style={{ color: '#6c757d' }} mt="sm">
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
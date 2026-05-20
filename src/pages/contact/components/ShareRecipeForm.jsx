import { useState } from 'react'
import { Paper, TextInput, Textarea, Button, Group, Title, Text, Select, Image, Alert, LoadingOverlay, Chip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Upload, Image as ImageIcon, CheckCircle, X, Clock, Star, ChefHat, List, BookOpen } from 'lucide-react'

const categories = [
    'Desayunos', 'Ensaladas', 'Pastas', 'Postres', 'Cenas', 'Sopas', 'Pescados', 'Carnes'
]

const difficulties = [
    { value: 'facil', label: 'Fácil' },
    { value: 'media', label: 'Media' },
    { value: 'dificil', label: 'Difícil' },
]

//formulario para que el usuario pueda compartir una receta
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

    return (
        <Paper withBorder p="xl" radius="xl" bg="white" style={{ position: 'relative' }}>
            <LoadingOverlay visible={isSubmitting} />

            <Group justify="space-between" align="flex-start" mb="md">
                <div>
                    <Title order={3}>Comparte tu receta</Title>
                    <Text c="dimmed" size="sm">
                        ¿Tienes una receta especial? ¡Compártela con nuestra comunidad!
                    </Text>
                </div>
                <Chip checked={false} variant="light" color="orange" icon={<Clock size={14} />}>
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
                >
                    Gracias por compartir tu receta. La revisaremos y te notificaremos cuando esté publicada.
                </Alert>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Title order={4} mb="md" size="sm">Información básica</Title>

                <TextInput
                    label="Nombre de la receta"
                    placeholder="Ej: Brownie de chocolate"
                    leftSection={<BookOpen size={16} />}
                    {...form.getInputProps('recipeName')}
                    mb="md"
                    radius="md"
                />

                <Select
                    label="Categoría"
                    placeholder="Selecciona una categoría"
                    data={categories}
                    {...form.getInputProps('category')}
                    mb="md"
                    radius="md"
                />

                <Textarea
                    label="Descripción breve"
                    placeholder="Cuéntanos de qué trata tu receta..."
                    {...form.getInputProps('description')}
                    mb="md"
                    radius="md"
                />

                <Title order={4} mb="md" mt="lg" size="sm">Ingredientes y preparación</Title>

                <Textarea
                    label="Ingredientes"
                    placeholder="Lista de ingredientes (uno por línea)"
                    leftSection={<List size={16} />}
                    {...form.getInputProps('ingredients')}
                    minRows={4}
                    mb="md"
                    radius="md"
                />

                <Textarea
                    label="Instrucciones"
                    placeholder="Paso a paso de la preparación"
                    {...form.getInputProps('instructions')}
                    minRows={5}
                    mb="md"
                    radius="md"
                />

                <Group grow mb="md">
                    <TextInput
                        label="Tiempo de preparación"
                        placeholder="Ej: 15 min"
                        {...form.getInputProps('prepTime')}
                        radius="md"
                    />
                    <TextInput
                        label="Tiempo de cocción"
                        placeholder="Ej: 30 min"
                        {...form.getInputProps('cookTime')}
                        radius="md"
                    />
                    <Select
                        label="Dificultad"
                        placeholder="Selecciona"
                        data={difficulties}
                        {...form.getInputProps('difficulty')}
                        radius="md"
                    />
                </Group>

                <Title order={4} mb="md" mt="lg" size="sm">Foto de la receta</Title>

                <Paper withBorder p="md" radius="md" mb="md" ta="center">
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
                                <Button component="span" variant="light" leftSection={<Upload size={16} />} radius="xl">
                                    Subir imagen
                                </Button>
                            </label>
                            <Text size="xs" c="dimmed" mt="sm">
                                Formatos: JPG, PNG. Máx 5MB.
                            </Text>
                        </>
                    )}
                </Paper>

                <Title order={4} mb="md" mt="lg" size="sm">Información del autor</Title>

                <TextInput
                    label="Tu nombre"
                    placeholder="Cómo quieres aparecer"
                    leftSection={<ChefHat size={16} />}
                    {...form.getInputProps('authorName')}
                    mb="md"
                    radius="md"
                />

                <TextInput
                    label="Tu correo"
                    placeholder="Para contactarte si es necesario"
                    {...form.getInputProps('authorEmail')}
                    mb="lg"
                    radius="md"
                />

                <Textarea
                    label="Notas adicionales"
                    placeholder="Alguna observación, consejo, etc."
                    {...form.getInputProps('notes')}
                    minRows={2}
                    mb="lg"
                    radius="md"
                />

                <Button type="submit" color="orange" radius="xl" size="lg" fullWidth leftSection={<Star size={18} />}>
                    Enviar receta
                </Button>

                <Text size="xs" c="dimmed" ta="center" mt="md">
                    Al enviar, aceptas que tu receta sea revisada y publicada en Chester Recetas.
                    Te daremos crédito como autor de la receta.
                </Text>
            </form>
        </Paper>
    )
}

export default ShareRecipeForm
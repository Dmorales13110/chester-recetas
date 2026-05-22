import { useState } from 'react'
import { Paper, TextInput, Textarea, Button, Group, Title, Text, Select, Alert, LoadingOverlay, ThemeIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, AlertCircle, Users, Star, Dog } from 'lucide-react'

const contactTopics = [
    { value: 'consulta', label: 'Consulta general' },
    { value: 'receta', label: 'Sugerencia de receta' },
    { value: 'problema', label: 'Reportar problema' },
    { value: 'colaboracion', label: 'Colaboración' },
    { value: 'otro', label: 'Otro' },
]

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            topic: 'consulta',
            message: '',
        },
        validate: {
            name: (value) => value.length < 2 ? 'El nombre es requerido' : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
            message: (value) => value.length < 10 ? 'El mensaje debe tener al menos 10 caracteres' : null,
        },
    })

    const handleSubmit = async (values) => {
        setIsSubmitting(true)
        setTimeout(() => {
            console.log('Formulario enviado:', values)
            setIsSubmitting(false)
            setIsSuccess(true)
            form.reset()
            setTimeout(() => setIsSuccess(false), 5000)
        }, 1500)
    }

    const getTopicIcon = (topic) => {
        switch (topic) {
            case 'consulta': return <MessageCircle size={14} />
            case 'receta': return <Star size={14} />
            case 'problema': return <AlertCircle size={14} />
            case 'colaboracion': return <Users size={14} />
            default: return <Send size={14} />
        }
    }

    return (
        <Paper withBorder p="xl" radius="xl" style={{
            background: 'var(--card-bg)',
            borderColor: 'var(--border)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decoración */}
            <div style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'var(--accent-bg)',
                opacity: 0.5,
            }} />

            <LoadingOverlay visible={isSubmitting} />

            <Group gap="xs" mb="xs">
                <ThemeIcon size="md" radius="xl" color="orange" variant="light">
                    <Dog size={16} />
                </ThemeIcon>
                <Text size="sm" c="orange" fw={500}>¡Cuéntanos!</Text>
            </Group>
            <Title order={3} mb="xs" style={{ color: 'var(--text-h)' }}>Envíanos un mensaje</Title>
            <Text style={{ color: 'var(--text-secondary)' }} mb="lg">
                ¿Tienes preguntas, sugerencias o quieres reportar un problema?
                <strong style={{ color: '#e67e22' }}> Chester</strong> te leerá con atención.
            </Text>

            {isSuccess && (
                <Alert
                    icon={<CheckCircle size={16} />}
                    title="¡Mensaje enviado!"
                    color="green"
                    mb="lg"
                    withCloseButton
                    onClose={() => setIsSuccess(false)}
                    style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: '#10b981' }}
                >
                    Gracias por contactarnos. ¡Chester te responderá en menos de 24 horas!
                </Alert>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Nombre completo"
                    placeholder="Tu nombre"
                    {...form.getInputProps('name')}
                    mb="md"
                    radius="md"
                    styles={{
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
                        }
                    }}
                />
                <TextInput
                    label="Correo electrónico"
                    placeholder="tu@email.com"
                    {...form.getInputProps('email')}
                    mb="md"
                    radius="md"
                    styles={{
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
                        }
                    }}
                />
                <Select
                    label="Motivo de contacto"
                    data={contactTopics}
                    {...form.getInputProps('topic')}
                    mb="md"
                    radius="md"
                    styles={{
                        input: {
                            backgroundColor: '#ffffff !important',
                            border: '1px solid #e9ecef',
                            color: '#1a1a2e !important',
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
                    }}
                    renderOption={(option) => (
                        <Group gap="xs">
                            {getTopicIcon(option.value)}
                            <Text size="sm">{option.label}</Text>
                        </Group>
                    )}
                />
                <Textarea
                    label="Mensaje"
                    placeholder="Escribe tu mensaje aquí..."
                    minRows={4}
                    {...form.getInputProps('message')}
                    mb="lg"
                    radius="md"
                    styles={{
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
                        }
                    }}
                />
                <Button
                    type="submit"
                    color="orange"
                    radius="xl"
                    size="lg"
                    fullWidth
                    leftSection={<Send size={18} />}
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
                    Enviar mensaje
                </Button>
            </form>

            <Group justify="space-between" mt="xl" pt="md" style={{ borderTop: `1px solid var(--border)` }}>
                <Group gap="xs">
                    <Mail size={16} color="#e67e22" />
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>hola@chesterrecetas.com</Text>
                </Group>
                <Group gap="xs">
                    <Phone size={16} color="#e67e22" />
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>+34 900 123 456</Text>
                </Group>
                <Group gap="xs">
                    <MapPin size={16} color="#e67e22" />
                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>Chesterjaus, Venezuela</Text>
                </Group>
            </Group>
        </Paper>
    )
}

export default ContactForm
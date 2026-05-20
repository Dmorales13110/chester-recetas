import { useState } from 'react'
import { Paper, TextInput, Textarea, Button, Group, Title, Text, Select, Alert, LoadingOverlay } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, AlertCircle, Users, Star } from 'lucide-react'

const contactTopics = [
    { value: 'consulta', label: 'Consulta general' },
    { value: 'receta', label: 'Sugerencia de receta' },
    { value: 'problema', label: 'Reportar problema' },
    { value: 'colaboracion', label: 'Colaboración' },
    { value: 'otro', label: 'Otro' },
]

// formualario de contacto para que el usuario pueda reportar o enviar cualquier boberia
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
        switch(topic) {
            case 'consulta': return <MessageCircle size={14} />
            case 'receta': return <Star size={14} />
            case 'problema': return <AlertCircle size={14} />
            case 'colaboracion': return <Users size={14} />
            default: return <Send size={14} />
        }
    }

    return (
        <Paper withBorder p="xl" radius="xl" bg="white" style={{ position: 'relative' }}>
            <LoadingOverlay visible={isSubmitting} />
            
            <Title order={3} mb="xs">Envíanos un mensaje</Title>
            <Text c="dimmed" mb="lg">
                ¿Tienes preguntas, sugerencias o quieres reportar un problema? Escríbenos y te responderemos a la brevedad.
            </Text>

            {isSuccess && (
                <Alert
                    icon={<CheckCircle size={16} />}
                    title="¡Mensaje enviado!"
                    color="green"
                    mb="lg"
                    withCloseButton
                    onClose={() => setIsSuccess(false)}
                >
                    Gracias por contactarnos. Te responderemos en menos de 24 horas.
                </Alert>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Nombre completo"
                    placeholder="Tu nombre"
                    {...form.getInputProps('name')}
                    mb="md"
                    radius="md"
                />
                <TextInput
                    label="Correo electrónico"
                    placeholder="tu@email.com"
                    {...form.getInputProps('email')}
                    mb="md"
                    radius="md"
                />
                <Select
                    label="Motivo de contacto"
                    data={contactTopics}
                    {...form.getInputProps('topic')}
                    mb="md"
                    radius="md"
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
                />
                <Button type="submit" color="orange" radius="xl" size="lg" fullWidth leftSection={<Send size={18} />}>
                    Enviar mensaje
                </Button>
            </form>

            <Group justify="space-between" mt="xl" pt="md" style={{ borderTop: '1px solid #eee' }}>
                <Group gap="xs">
                    <Mail size={16} color="#e67e22" />
                    <Text size="sm">hola@chesterrecetas.com</Text>
                </Group>
                <Group gap="xs">
                    <Phone size={16} color="#e67e22" />
                    <Text size="sm">+34 900 123 456</Text>
                </Group>
                <Group gap="xs">
                    <MapPin size={16} color="#e67e22" />
                    <Text size="sm">Madrid, España</Text>
                </Group>
            </Group>
        </Paper>
    )
}

export default ContactForm
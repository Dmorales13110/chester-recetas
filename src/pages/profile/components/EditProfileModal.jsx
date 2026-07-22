import { Modal, TextInput, Button, Stack, Group, Avatar, FileInput, Text, Divider, Alert } from '@mantine/core'
import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Upload, CheckCircle, XCircle } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { authService } from '../../../services'

const EditProfileModal = ({ opened, onClose, userData, onUpdate }) => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telefono: '',
        ubicacion: '',
        foto_perfil: null
    })
    const [previewImage, setPreviewImage] = useState(null)

    // Cargar datos del usuario cuando se abre el modal
    useEffect(() => {
        if (userData && opened) {
            setFormData({
                name: userData.name || '',
                email: userData.email || '',
                telefono: userData.phone || '',
                ubicacion: userData.location || '',
                foto_perfil: null
            })
            setPreviewImage(userData.avatar || null)
        }
    }, [userData, opened])

    const handleImageUpload = (file) => {
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)
            setFormData({ ...formData, foto_perfil: file })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            // Preparar datos para enviar
            const updateData = {
                nombre: formData.name,
                email: formData.email,
                telefono: formData.telefono,
                ubicacion: formData.ubicacion
            }

            // Si hay imagen, subirla (simplificado, en producción usar FormData)
            if (formData.foto_perfil instanceof File) {
                // Aquí iría la lógica para subir la imagen
                // Por ahora solo simulamos
                console.log('Subiendo imagen:', formData.foto_perfil.name)
            }

            // Actualizar perfil en el backend
            const response = await authService.updateProfile(user.id, updateData)
            
            setSuccess('¡Perfil actualizado exitosamente!')
            
            // Actualizar datos en el padre
            if (onUpdate) {
                const updatedData = {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.telefono,
                    location: formData.ubicacion,
                    avatar: previewImage
                }
                onUpdate(updatedData)
            }

            // Cerrar modal después de 1.5 segundos
            setTimeout(() => {
                setSuccess('')
                onClose()
            }, 1500)

        } catch (error) {
            console.error('Error al actualizar perfil:', error)
            setError(error.message || 'Error al actualizar el perfil. Intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Editar perfil"
            size="md"
            radius="xl"
            centered
            styles={{
                header: {
                    borderBottom: '1px solid var(--border)',
                    padding: '16px 24px',
                },
                title: {
                    fontWeight: 700,
                    color: 'var(--text-h)',
                },
                body: {
                    padding: '24px',
                },
                content: {
                    background: 'var(--modal-bg)',
                }
            }}
        >
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    {/* Avatar */}
                    <Group justify="center">
                        <Avatar
                            size={100}
                            radius={100}
                            src={previewImage}
                            style={{
                                border: '3px solid var(--accent)',
                            }}
                        >
                            {!previewImage && <User size={40} style={{ color: 'var(--accent)' }} />}
                        </Avatar>
                    </Group>

                    <FileInput
                        label="Foto de perfil"
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
                            },
                            label: {
                                color: 'var(--text-h)',
                                fontWeight: 500,
                            }
                        }}
                    />

                    <Divider style={{ borderColor: 'var(--border)' }} />

                    <TextInput
                        label="Nombre completo"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        leftSection={<User size={16} />}
                        radius="md"
                        required
                        styles={{
                            input: {
                                backgroundColor: 'var(--input-bg)',
                                borderColor: 'var(--border)',
                                color: 'var(--input-text)',
                                '&:focus': {
                                    borderColor: '#e67e22',
                                }
                            },
                            label: {
                                color: 'var(--text-h)',
                                fontWeight: 500,
                            }
                        }}
                    />

                    <TextInput
                        label="Correo electrónico"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        leftSection={<Mail size={16} />}
                        radius="md"
                        required
                        styles={{
                            input: {
                                backgroundColor: 'var(--input-bg)',
                                borderColor: 'var(--border)',
                                color: 'var(--input-text)',
                                '&:focus': {
                                    borderColor: '#e67e22',
                                }
                            },
                            label: {
                                color: 'var(--text-h)',
                                fontWeight: 500,
                            }
                        }}
                    />

                    <TextInput
                        label="Teléfono"
                        placeholder="+58 123 456 7890"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        leftSection={<Phone size={16} />}
                        radius="md"
                        styles={{
                            input: {
                                backgroundColor: 'var(--input-bg)',
                                borderColor: 'var(--border)',
                                color: 'var(--input-text)',
                                '&:focus': {
                                    borderColor: '#e67e22',
                                }
                            },
                            label: {
                                color: 'var(--text-h)',
                                fontWeight: 500,
                            }
                        }}
                    />

                    <TextInput
                        label="Ubicación"
                        placeholder="Ciudad, País"
                        value={formData.ubicacion}
                        onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                        leftSection={<MapPin size={16} />}
                        radius="md"
                        styles={{
                            input: {
                                backgroundColor: 'var(--input-bg)',
                                borderColor: 'var(--border)',
                                color: 'var(--input-text)',
                                '&:focus': {
                                    borderColor: '#e67e22',
                                }
                            },
                            label: {
                                color: 'var(--text-h)',
                                fontWeight: 500,
                            }
                        }}
                    />

                    {error && (
                        <Alert color="red" variant="light" icon={<XCircle size={16} />}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert color="green" variant="light" icon={<CheckCircle size={16} />}>
                            {success}
                        </Alert>
                    )}

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose} style={{ color: 'var(--text-secondary)' }}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            loading={loading}
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
                </Stack>
            </form>
        </Modal>
    )
}

export default EditProfileModal
import { Modal, Stack, Group, Text, Divider, Button, ScrollArea, ActionIcon, Avatar, Paper, Badge } from '@mantine/core'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'
import { User, Mail, Phone, MapPin, LogOut, X, ChevronRight, Edit, Key, Bell, Shield, HelpCircle } from 'lucide-react'

const SettingsModal = ({ opened, onClose }) => {
    const { isDarkMode } = useTheme()
    
    const gradientStart = isDarkMode ? '#f5a623' : '#e67e22'
    const gradientEnd = isDarkMode ? '#f7b53e' : '#f39c12'

    // Datos de usuario
    const user = {
        name: 'Usuario Demo',
        email: 'usuario@chesterrecetas.com',
        phone: '+34 900 123 456',
        location: 'Madrid, España',
        memberSince: '2024',
    }

    const menuItems = [
        { icon: <User size={18} />, label: 'Información personal', description: 'Edita tus datos personales' },
        { icon: <Key size={18} />, label: 'Seguridad', description: 'Cambia tu contraseña' },
        { icon: <Bell size={18} />, label: 'Notificaciones', description: 'Configura tus alertas' },
        { icon: <Shield size={18} />, label: 'Privacidad', description: 'Controla tus datos' },
        { icon: <HelpCircle size={18} />, label: 'Ayuda y soporte', description: 'Centro de ayuda' },
    ]

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="md"
            radius="xl"
            centered
            scrollAreaComponent={ScrollArea}
            styles={{
                root: {
                    '--modal-shadow': 'var(--shadow)',
                },
                content: {
                    background: 'var(--modal-bg)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    maxHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                },
                body: {
                    padding: 0,
                    flex: 1,
                    overflow: 'auto',
                },
                header: {
                    display: 'none',
                },
            }}
        >
            {/* Header con gradiente dinámico */}
            <div style={{
                background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                padding: '24px',
                position: 'relative',
                flexShrink: 0,
            }}>
                <ActionIcon
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                        padding: 8,
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                    <X size={20} color="white" />
                </ActionIcon>
                
                <Group gap="md" wrap="nowrap">
                    <Avatar size="lg" radius="xl" style={{ background: 'white', color: gradientStart }}>
                        <User size={28} />
                    </Avatar>
                    <div>
                        <Text size="xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Mi cuenta</Text>
                        <Text fw={700} size="xl" style={{ color: 'white' }}>{user.name}</Text>
                        <Text size="xs" style={{ color: 'rgba(255,255,255,0.8)' }}>{user.email}</Text>
                    </div>
                </Group>
            </div>

            {/* Contenido scrolleable */}
            <ScrollArea style={{ flex: 1, maxHeight: 'calc(85vh - 120px)' }} offsetScrollbars>
                <div style={{ padding: '20px' }}>
                    <Stack gap="md">
                        {/* Información rápida del usuario */}
                        <Paper withBorder p="md" radius="lg" style={{
                            background: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}>
                            <Stack gap="sm">
                                <Group gap="sm">
                                    <Mail size={16} style={{ color: 'var(--accent)' }} />
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>{user.email}</Text>
                                </Group>
                                <Group gap="sm">
                                    <Phone size={16} style={{ color: 'var(--accent)' }} />
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>{user.phone}</Text>
                                </Group>
                                <Group gap="sm">
                                    <MapPin size={16} style={{ color: 'var(--accent)' }} />
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>{user.location}</Text>
                                </Group>
                                <Badge variant="light" style={{ alignSelf: 'flex-start', background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                    Miembro desde {user.memberSince}
                                </Badge>
                            </Stack>
                        </Paper>

                        {/* Menú de opciones de cuenta */}
                        {menuItems.map((item, idx) => (
                            <Paper
                                key={idx}
                                withBorder
                                p="md"
                                radius="lg"
                                style={{
                                    background: 'var(--bg-secondary)',
                                    borderColor: 'var(--border)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--accent-bg)'
                                    e.currentTarget.style.borderColor = 'var(--accent)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                }}
                            >
                                <Group justify="space-between" wrap="nowrap">
                                    <Group gap="md" wrap="nowrap">
                                        <div style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 40,
                                            background: 'var(--accent-bg)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--accent)',
                                        }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <Text fw={600} style={{ color: 'var(--text-h)' }}>{item.label}</Text>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{item.description}</Text>
                                        </div>
                                    </Group>
                                    <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
                                </Group>
                            </Paper>
                        ))}

                        <Divider style={{ borderColor: 'var(--border)', margin: '8px 0' }} />

                        {/* Botón cerrar sesión */}
                        <Button 
                            color="red" 
                            variant="light" 
                            fullWidth
                            leftSection={<LogOut size={18} />}
                            radius="xl"
                            size="md"
                            styles={{
                                root: {
                                    transition: 'all 0.2s',
                                    backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.15)' : '#fee2e2',
                                    color: '#dc2626',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.25)' : '#fecaca',
                                    }
                                }
                            }}
                        >
                            Cerrar sesión
                        </Button>
                    </Stack>
                </div>
            </ScrollArea>
        </Modal>
    )
}

export default SettingsModal
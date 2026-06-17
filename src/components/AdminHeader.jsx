import { Box, Group, Text, Avatar, Menu, Divider, Button, ActionIcon, Tooltip, Badge } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DogIcon, LogOut, User, Settings, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export const AdminHeader = () => {
    const { user, logout } = useAuth()
    const { isDarkMode, toggleTheme } = useTheme()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <Box
            style={{
                background: 'var(--card-bg)',
                borderBottom: '1px solid var(--border)',
                padding: '10px 24px',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Group gap="sm">
                <Text fw={700} size="lg" style={{ color: 'var(--text-h)' }}>
                    Panel Administrativo
                </Text>
                <Badge
                    size="sm"
                    variant="light"
                    style={{
                        background: 'var(--accent-bg)',
                        color: 'var(--accent)',
                        fontSize: 10,
                        padding: '0 8px',
                        height: 20,
                    }}
                >
                    {user?.role || 'Admin'}
                </Badge>
            </Group>

            <Group gap="sm">
                <Tooltip label="Volver al sitio" position="bottom">
                    <Button
                        component={Link}
                        to="/"
                        variant="subtle"
                        size="sm"
                        radius="xl"
                        style={{ color: 'var(--text)' }}
                        styles={{
                            root: {
                                '&:hover': {
                                    backgroundColor: 'var(--accent-bg)',
                                    color: 'var(--accent)',
                                }
                            }
                        }}
                    >
                        Ver sitio
                    </Button>
                </Tooltip>

                <ActionIcon
                    variant="subtle"
                    onClick={toggleTheme}
                    radius="xl"
                    style={{ color: 'var(--text)' }}
                    styles={{
                        root: {
                            '&:hover': {
                                backgroundColor: 'var(--accent-bg)',
                                color: 'var(--accent)',
                            }
                        }
                    }}
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </ActionIcon>

                <Menu shadow="md" width={200} position="bottom-end" offset={5}>
                    <Menu.Target>
                        <Group gap="xs" style={{ cursor: 'pointer' }}>
                            <Avatar size="sm" radius="xl" style={{
                                cursor: 'pointer',
                                background: 'var(--accent-bg)',
                                color: 'var(--accent)',
                            }}>
                                {user?.name?.charAt(0) || 'A'}
                            </Avatar>
                            <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />
                        </Group>
                    </Menu.Target>
                    <Menu.Dropdown style={{
                        background: 'var(--card-bg)',
                        borderColor: 'var(--border)',
                    }}>
                        <Menu.Label style={{ color: 'var(--text-h)' }}>
                            {user?.name || 'Administrador'}
                        </Menu.Label>
                        <Menu.Divider style={{ borderColor: 'var(--border)' }} />
                        <Menu.Item
                            leftSection={<User size={14} />}
                            style={{ color: 'var(--text)' }}
                            styles={{
                                item: {
                                    '&:hover': {
                                        backgroundColor: 'var(--accent-bg)',
                                        color: 'var(--accent)',
                                    }
                                }
                            }}
                        >
                            Mi perfil
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<Settings size={14} />}
                            style={{ color: 'var(--text)' }}
                            styles={{
                                item: {
                                    '&:hover': {
                                        backgroundColor: 'var(--accent-bg)',
                                        color: 'var(--accent)',
                                    }
                                }
                            }}
                        >
                            Configuración
                        </Menu.Item>
                        <Menu.Divider style={{ borderColor: 'var(--border)' }} />
                        <Menu.Item
                            leftSection={<LogOut size={14} />}
                            color="red"
                            onClick={handleLogout}
                            styles={{
                                item: {
                                    '&:hover': {
                                        backgroundColor: '#fee2e2',
                                    }
                                }
                            }}
                        >
                            Cerrar sesión
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Box>
    )
}
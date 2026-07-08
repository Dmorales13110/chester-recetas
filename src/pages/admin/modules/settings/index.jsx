import { useState } from 'react'
import { 
    Container, Paper, Title, Text, Stack, Group, 
    Card, Switch, Divider, Button, TextInput, 
    PasswordInput, Badge, ThemeIcon, SimpleGrid,
    Alert, Avatar, Box
} from '@mantine/core'
import { 
    Settings, User, Mail, Lock, Shield, 
    Save, CheckCircle, UserCog, Key,
    Smartphone, Bell, Moon, Sun
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../../../context/ThemeContext'
import { useAuth } from '../../../../context/AuthContext'

const SettingsModule = () => {
    const { isDarkMode, toggleTheme } = useTheme()
    const { user } = useAuth()
    const [saved, setSaved] = useState(false)
    const [loading, setLoading] = useState(false)

    // Datos del usuario
    const [userData, setUserData] = useState({
        name: user?.name || 'Administrador',
        email: user?.email || 'admin@chester.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    // Preferencias del usuario
    const [preferences, setPreferences] = useState({
        darkMode: isDarkMode,
        emailNotifications: true,
        twoFactorAuth: false,
    })

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }, 800)
    }

    return (
        <Container size="lg" py="md">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                    <Stack gap="lg">
                        {/* Header */}
                        <Group justify="space-between" wrap="wrap">
                            <div>
                                <Group gap="xs" mb={4}>
                                    <Settings size={24} style={{ color: '#6b7280' }} />
                                    <Title order={2} style={{ color: 'var(--text-h)' }}>
                                        Mi cuenta
                                    </Title>
                                </Group>
                                <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                    Administra la configuración de tu cuenta
                                </Text>
                            </div>
                            <Group gap="sm">
                                {saved && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <Badge 
                                            color="green" 
                                            size="lg" 
                                            variant="light"
                                            leftSection={<CheckCircle size={14} />}
                                        >
                                            ✅ Guardado
                                        </Badge>
                                    </motion.div>
                                )}
                                <Button
                                    leftSection={<Save size={16} />}
                                    radius="xl"
                                    onClick={handleSave}
                                    loading={loading}
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

                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                            {/* Columna izquierda - Información personal */}
                            <Stack gap="md">
                                <Card withBorder p="lg" radius="lg" style={{ background: 'var(--bg-secondary)' }}>
                                    <Group gap="xs" mb="md">
                                        <UserCog size={18} style={{ color: 'var(--accent)' }} />
                                        <Title order={4} style={{ color: 'var(--text-h)' }}>Información personal</Title>
                                    </Group>

                                    <Stack gap="md">
                                        <Group gap="md">
                                            <Avatar 
                                                size="lg" 
                                                radius="xl" 
                                                color="orange"
                                                style={{ 
                                                    background: 'var(--accent-bg)',
                                                    color: 'var(--accent)',
                                                    border: '2px solid var(--accent)',
                                                }}
                                            >
                                                {userData.name.charAt(0)}
                                            </Avatar>
                                            <div>
                                                <Text fw={600} style={{ color: 'var(--text-h)' }}>
                                                    {userData.name}
                                                </Text>
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                                    {userData.email}
                                                </Text>
                                                <Badge 
                                                    size="sm" 
                                                    style={{ 
                                                        marginTop: 4,
                                                        background: 'var(--accent-bg)',
                                                        color: 'var(--accent)',
                                                    }}
                                                >
                                                    {user?.role || 'Admin'}
                                                </Badge>
                                            </div>
                                        </Group>

                                        <TextInput
                                            label="Nombre completo"
                                            value={userData.name}
                                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                                            radius="md"
                                            leftSection={<User size={16} />}
                                        />

                                        <TextInput
                                            label="Correo electrónico"
                                            value={userData.email}
                                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                                            radius="md"
                                            leftSection={<Mail size={16} />}
                                        />
                                    </Stack>
                                </Card>

                                <Card withBorder p="lg" radius="lg" style={{ background: 'var(--bg-secondary)' }}>
                                    <Group gap="xs" mb="md">
                                        <Lock size={18} style={{ color: 'var(--accent)' }} />
                                        <Title order={4} style={{ color: 'var(--text-h)' }}>Cambiar contraseña</Title>
                                    </Group>

                                    <Stack gap="md">
                                        <PasswordInput
                                            label="Contraseña actual"
                                            placeholder="Ingresa tu contraseña actual"
                                            value={userData.currentPassword}
                                            onChange={(e) => setUserData({...userData, currentPassword: e.target.value})}
                                            radius="md"
                                            leftSection={<Key size={16} />}
                                        />

                                        <PasswordInput
                                            label="Nueva contraseña"
                                            placeholder="Ingresa tu nueva contraseña"
                                            value={userData.newPassword}
                                            onChange={(e) => setUserData({...userData, newPassword: e.target.value})}
                                            radius="md"
                                            leftSection={<Lock size={16} />}
                                        />

                                        <PasswordInput
                                            label="Confirmar nueva contraseña"
                                            placeholder="Confirma tu nueva contraseña"
                                            value={userData.confirmPassword}
                                            onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                                            radius="md"
                                            leftSection={<Lock size={16} />}
                                        />
                                    </Stack>
                                </Card>
                            </Stack>

                            {/* Columna derecha - Preferencias */}
                            <Stack gap="md">
                                <Card withBorder p="lg" radius="lg" style={{ background: 'var(--bg-secondary)' }}>
                                    <Group gap="xs" mb="md">
                                        <Smartphone size={18} style={{ color: 'var(--accent)' }} />
                                        <Title order={4} style={{ color: 'var(--text-h)' }}>Preferencias</Title>
                                    </Group>

                                    <Stack gap="md">
                                        <Switch
                                            label="Modo oscuro"
                                            description="Cambiar la apariencia de la aplicación"
                                            checked={preferences.darkMode}
                                            onChange={() => {
                                                setPreferences({...preferences, darkMode: !preferences.darkMode})
                                                toggleTheme()
                                            }}
                                            size="lg"
                                            thumbIcon={preferences.darkMode ? <Moon size={12} /> : <Sun size={12} />}
                                            styles={{
                                                track: {
                                                    '&[data-checked]': {
                                                        backgroundColor: '#e67e22',
                                                    }
                                                }
                                            }}
                                        />

                                        <Switch
                                            label="Notificaciones por email"
                                            description="Recibe notificaciones importantes por correo"
                                            checked={preferences.emailNotifications}
                                            onChange={(e) => setPreferences({...preferences, emailNotifications: e.target.checked})}
                                            size="lg"
                                        />

                                        <Switch
                                            label="Autenticación de dos factores"
                                            description="Añade una capa extra de seguridad"
                                            checked={preferences.twoFactorAuth}
                                            onChange={(e) => setPreferences({...preferences, twoFactorAuth: e.target.checked})}
                                            size="lg"
                                        />
                                    </Stack>
                                </Card>

                                <Card withBorder p="lg" radius="lg" style={{ background: 'var(--bg-secondary)' }}>
                                    <Group gap="xs" mb="md">
                                        <Shield size={18} style={{ color: 'var(--accent)' }} />
                                        <Title order={4} style={{ color: 'var(--text-h)' }}>Seguridad de la cuenta</Title>
                                    </Group>

                                    <Stack gap="md">
                                        <Alert color="green" variant="light">
                                            <Group gap="xs">
                                                <CheckCircle size={16} style={{ color: '#10b981' }} />
                                                <Text size="sm">
                                                    Tu cuenta está protegida con autenticación de dos factores
                                                </Text>
                                            </Group>
                                        </Alert>

                                        <Alert color="orange" variant="light">
                                            <Group gap="xs">
                                                <Shield size={16} style={{ color: '#f59e0b' }} />
                                                <Text size="sm">
                                                    Último inicio de sesión: Hoy a las 14:30 desde Caracas, Venezuela
                                                </Text>
                                            </Group>
                                        </Alert>

                                        <Button 
                                            variant="light" 
                                            color="red" 
                                            fullWidth
                                            radius="xl"
                                            leftSection={<Lock size={16} />}
                                        >
                                            Cerrar sesión en todos los dispositivos
                                        </Button>
                                    </Stack>
                                </Card>
                            </Stack>
                        </SimpleGrid>

                        <Divider style={{ borderColor: 'var(--border)' }} />

                        <Group justify="center" gap="xs">
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                Última actualización: Hoy a las {new Date().toLocaleTimeString()}
                            </Text>
                        </Group>
                    </Stack>
                </Paper>
            </motion.div>
        </Container>
    )
}

export default SettingsModule
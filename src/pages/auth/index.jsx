import React, { useState, useEffect } from 'react'
import {
    Container, Paper, Title, Text, Group, Stack, Grid,
    Card, ThemeIcon, Box, LoadingOverlay, Alert, Divider,
    Badge, SimpleGrid, Tooltip, Tabs, ActionIcon, Button
} from '@mantine/core'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import {
    Lock, User, Key, Sparkles, ChefHat, Heart, Coffee,
    Utensils, Star, Shield, BookOpen, Users, Award,
    ArrowRight, CheckCircle, Eye, EyeOff, Zap, DogIcon,
    Info, Sun, Moon
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedDog from './components/AnimatedDog'
import AnimatedRecipesBackground from './components/AnimatedRecipesBackground'
import RecipeCardsCarousel from './components/RecipeCardsCarousel'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ResetPasswordForm from './components/ResetPasswordForm'

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [telefono, setTelefono] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [resetEmail, setResetEmail] = useState('')
    const [resetStep, setResetStep] = useState('request')
    const [resetCode, setResetCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const { login, register, forgotPassword, isAuthenticated, user, isAdmin } = useAuth()
    const { isDarkMode, toggleTheme } = useTheme()
    const navigate = useNavigate()

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (isAuthenticated && user) {
            if (isAdmin) {
                navigate('/admin', { replace: true })
            } else {
                navigate('/', { replace: true })
            }
        }
    }, [isAuthenticated, user, isAdmin, navigate])

    // Login con servicio real
    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await login(email, password)
            if (result.success) {
                setLoading(false)
                // La redirección se maneja en el useEffect
            } else {
                setError(result.error)
                setLoading(false)
            }
        } catch (err) {
            console.error('Error en login:', err)
            setError('Error al iniciar sesión. Intenta nuevamente.')
            setLoading(false)
        }
    }

    // Registro con todos los campos
    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!name || name.trim().length < 2) {
            setError('El nombre debe tener al menos 2 caracteres')
            return
        }

        if (!email || !email.includes('@')) {
            setError('Ingresa un correo electrónico válido')
            return
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setLoading(true)

        try {
            const result = await register(name, email, password, telefono, ubicacion)
            
            if (result.success) {
                setSuccess(result.message || '🎉 ¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.')
                setName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setTelefono('')
                setUbicacion('')
                
                setTimeout(() => {
                    setActiveTab('login')
                    setEmail(email)
                    setSuccess('')
                }, 2500)
            } else {
                setError(result.error)
            }
        } catch (err) {
            console.error('Error en registro:', err)
            setError('Error al crear la cuenta. Intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    // Recuperar contraseña
    const handleResetPassword = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await forgotPassword(resetEmail)
            if (result.success) {
                setResetStep('sent')
                setSuccess(result.message)
            } else {
                setError(result.error)
            }
        } catch (err) {
            console.error('Error en recuperación:', err)
            setError('Error al enviar el correo de recuperación. Intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    const handleConfirmReset = async (e) => {
        e.preventDefault()
        setError('')
        
        if (newPassword !== confirmNewPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setLoading(true)

        try {
            // Aquí se implementaría la confirmación del reset con el token
            setTimeout(() => {
                setResetStep('confirm')
                setSuccess('✅ ¡Contraseña actualizada exitosamente!')
                setLoading(false)
                setTimeout(() => {
                    setActiveTab('login')
                    setResetStep('request')
                    setSuccess('')
                }, 2000)
            }, 1500)
        } catch (err) {
            setError('Error al actualizar la contraseña.')
            setLoading(false)
        }
    }

    const handleBackToLogin = () => {
        setActiveTab('login')
        setResetStep('request')
        setError('')
        setSuccess('')
    }

    // Estadísticas rápidas
    const stats = [
        { label: 'Recetas', value: '+500', icon: <Utensils size={18} /> },
        { label: 'Usuarios', value: '+10k', icon: <Users size={18} /> },
        { label: 'Chefs', value: '+50', icon: <ChefHat size={18} /> },
        { label: 'Favoritos', value: '+2k', icon: <Heart size={18} /> },
    ]

    // Credenciales de prueba
    const demoCredentials = [
        { role: 'Administrador', email: 'admin@chester.com', password: 'admin123', icon: '👑' },
        { role: 'Usuario', email: 'usuario@chester.com', password: 'user123', icon: '👤' },
        { role: 'Chef', email: 'chef@chester.com', password: 'chef123', icon: '👨‍🍳' },
    ]

    return (
        <Box style={{
            minHeight: '100vh',
            background: 'var(--bg)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Fondo decorativo */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: 700,
                    height: 700,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)',
                    opacity: 0.3,
                    pointerEvents: 'none',
                }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -10, 10, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-5%',
                    width: 600,
                    height: 600,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(245, 166, 35, 0.05) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <Container size="xl" py="xl">
                <Stack gap="xl">
                    {/* Header con botón de tema visible */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Paper
                            p="xl"
                            radius="lg"
                            style={{
                                background: 'linear-gradient(135deg, #e67e22 0%, #f39c12 100%)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Botón de tema */}
                            <ActionIcon
                                onClick={toggleTheme}
                                variant="light"
                                size="lg"
                                radius="xl"
                                style={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    background: 'rgba(255,255,255,0.95)',
                                    color: isDarkMode ? '#1a1a2e' : '#e67e22',
                                    borderRadius: '50%',
                                    padding: 10,
                                    transition: 'all 0.3s ease',
                                    zIndex: 10,
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)'
                                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(0,0,0,0.25)'
                                    e.currentTarget.style.background = '#ffffff'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.95)'
                                }}
                            >
                                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                            </ActionIcon>

                            <Group justify="space-between" align="flex-start">
                                <Stack gap="xs" style={{ flex: 1 }}>
                                    {/* Logo clickeable - vuelve al home */}
                                    <Group 
                                        gap="xs" 
                                        component={Link} 
                                        to="/" 
                                        style={{ 
                                            textDecoration: 'none', 
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.opacity = '0.8'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.opacity = '1'
                                        }}
                                    >
                                        <motion.div
                                            animate={{ rotate: [0, -10, 10, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            style={{
                                                background: 'rgba(255,255,255,0.2)',
                                                padding: 8,
                                                borderRadius: 12,
                                                display: 'inline-flex',
                                            }}
                                        >
                                            <ChefHat size={32} color="white" />
                                        </motion.div>
                                        <Title order={1} c="white" fw={800}>
                                            Chester Recetas
                                        </Title>
                                    </Group>
                                    <Text c="white" size="lg" opacity={0.95}>
                                        La mejor plataforma de recetas para toda la familia
                                    </Text>
                                    <Group gap="sm">
                                        <Badge
                                            className="login-badge"
                                            size="lg"
                                            variant="white"
                                            styles={{
                                                root: {
                                                    background: 'rgba(255,255,255,0.15)',
                                                    padding: '8px 18px',
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid rgba(255,255,255,0.15)',
                                                    height: 'auto',
                                                    color: '#ffffff !important',
                                                }
                                            }}
                                            leftSection={<DogIcon size={16} color="white" />}
                                        >
                                            Chester
                                        </Badge>

                                        <Badge
                                            className="login-badge"
                                            size="lg"
                                            variant="white"
                                            styles={{
                                                root: {
                                                    background: 'rgba(255,255,255,0.15)',
                                                    padding: '8px 18px',
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid rgba(255,255,255,0.15)',
                                                    height: 'auto',
                                                    color: '#ffffff !important',
                                                }
                                            }}
                                            leftSection={<Star size={16} color="white" />}
                                        >
                                            +500 Recetas
                                        </Badge>

                                        <Badge
                                            className="login-badge"
                                            size="lg"
                                            variant="white"
                                            styles={{
                                                root: {
                                                    background: 'rgba(255,255,255,0.15)',
                                                    padding: '8px 18px',
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid rgba(255,255,255,0.15)',
                                                    height: 'auto',
                                                    color: '#ffffff !important',
                                                }
                                            }}
                                            leftSection={<ChefHat size={16} color="white" />}
                                        >
                                            Chefs Expertos
                                        </Badge>
                                    </Group>
                                </Stack>
                                <motion.div
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <ThemeIcon
                                        size={80}
                                        radius="xl"
                                        variant="light"
                                        color="white"
                                        style={{ background: 'rgba(255,255,255,0.15)' }}
                                    >
                                        <Zap size={40} stroke={1.5} />
                                    </ThemeIcon>
                                </motion.div>
                            </Group>
                        </Paper>
                    </motion.div>

                    <Grid gutter="xl">
                        {/* Columna Izquierda - Formulario */}
                        <Grid.Col span={{ base: 12, lg: 6 }}>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Card
                                    p="xl"
                                    radius="lg"
                                    withBorder
                                    style={{
                                        background: 'var(--card-bg)',
                                        borderColor: 'var(--border)',
                                        position: 'relative',
                                    }}
                                >
                                    <LoadingOverlay
                                        visible={loading}
                                        zIndex={1000}
                                        overlayProps={{ radius: 'lg', blur: 2 }}
                                    />

                                    <Stack gap="lg">
                                        <Group justify="space-between" align="flex-start">
                                            <Stack gap="xs">
                                                <Title order={2} fw={800} style={{ color: 'var(--text-h)' }}>
                                                    {activeTab === 'login' && 'Iniciar Sesión'}
                                                    {activeTab === 'register' && 'Crear Cuenta'}
                                                    {activeTab === 'reset' && 'Recuperar Acceso'}
                                                </Title>
                                                <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                                    {activeTab === 'login' && 'Ingresa tus credenciales para acceder'}
                                                    {activeTab === 'register' && 'Únete a nuestra comunidad culinaria'}
                                                    {activeTab === 'reset' && 'Recupera tu contraseña fácilmente'}
                                                </Text>
                                            </Stack>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <ThemeIcon
                                                    size={50}
                                                    radius="xl"
                                                    variant="light"
                                                    style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
                                                >
                                                    {activeTab === 'login' && <Lock size={26} stroke={1.5} />}
                                                    {activeTab === 'register' && <User size={26} stroke={1.5} />}
                                                    {activeTab === 'reset' && <Key size={26} stroke={1.5} />}
                                                </ThemeIcon>
                                            </motion.div>
                                        </Group>

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <Alert color="red" variant="light" withCloseButton>
                                                    {error}
                                                </Alert>
                                            </motion.div>
                                        )}

                                        {success && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <Alert color="green" variant="light" withCloseButton>
                                                    {success}
                                                </Alert>
                                            </motion.div>
                                        )}

                                        {/* Perro animado */}
                                        <AnimatedDog currentTab={activeTab} />

                                        <Tabs
                                            value={activeTab}
                                            onChange={setActiveTab}
                                            radius="xl"
                                            styles={{
                                                tab: {
                                                    color: 'var(--text)',
                                                    fontWeight: 500,
                                                    transition: 'all 0.2s',
                                                    padding: '8px 16px',
                                                    '&[data-active]': {
                                                        color: '#e67e22',
                                                        fontWeight: 600,
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'var(--accent-bg)',
                                                        color: '#e67e22',
                                                    }
                                                },
                                                tabLabel: {
                                                    fontSize: 13,
                                                },
                                                tabSection: {
                                                    marginRight: 6,
                                                }
                                            }}
                                        >
                                            <Tabs.List grow mb="lg">
                                                <Tabs.Tab value="login" leftSection={<Lock size={14} />}>
                                                    Login
                                                </Tabs.Tab>
                                                <Tabs.Tab value="register" leftSection={<User size={14} />}>
                                                    Registro
                                                </Tabs.Tab>
                                                <Tabs.Tab value="reset" leftSection={<Key size={14} />}>
                                                    Recuperar
                                                </Tabs.Tab>
                                            </Tabs.List>

                                            <AnimatePresence mode="wait">
                                                {activeTab === 'login' && (
                                                    <LoginForm
                                                        email={email}
                                                        setEmail={setEmail}
                                                        password={password}
                                                        setPassword={setPassword}
                                                        error={error}
                                                        loading={loading}
                                                        onSubmit={handleLogin}
                                                        onForgotPassword={() => setActiveTab('reset')}
                                                    />
                                                )}

                                                {activeTab === 'register' && (
                                                    <RegisterForm
                                                        name={name}
                                                        setName={setName}
                                                        email={email}
                                                        setEmail={setEmail}
                                                        password={password}
                                                        setPassword={setPassword}
                                                        confirmPassword={confirmPassword}
                                                        setConfirmPassword={setConfirmPassword}
                                                        telefono={telefono}
                                                        setTelefono={setTelefono}
                                                        ubicacion={ubicacion}
                                                        setUbicacion={setUbicacion}
                                                        error={error}
                                                        success={success}
                                                        loading={loading}
                                                        onSubmit={handleRegister}
                                                        onBackToLogin={() => setActiveTab('login')}
                                                    />
                                                )}

                                                {activeTab === 'reset' && (
                                                    <ResetPasswordForm
                                                        step={resetStep}
                                                        resetEmail={resetEmail}
                                                        setResetEmail={setResetEmail}
                                                        resetCode={resetCode}
                                                        setResetCode={setResetCode}
                                                        newPassword={newPassword}
                                                        setNewPassword={setNewPassword}
                                                        confirmNewPassword={confirmNewPassword}
                                                        setConfirmNewPassword={setConfirmNewPassword}
                                                        error={error}
                                                        success={success}
                                                        loading={loading}
                                                        onRequestReset={handleResetPassword}
                                                        onConfirmReset={handleConfirmReset}
                                                        onBack={handleBackToLogin}
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </Tabs>
                                    </Stack>
                                </Card>
                            </motion.div>
                        </Grid.Col>

                        {/* Columna Derecha - Información con fondo animado */}
                        <Grid.Col span={{ base: 12, lg: 6 }}>
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                style={{ height: '100%' }}
                            >
                                <Card
                                    p="xl"
                                    radius="lg"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg) 100%)',
                                        border: '1px solid var(--border)',
                                        height: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        minHeight: 500,
                                    }}
                                >
                                    {/* Fondo animado de recetas */}
                                    <AnimatedRecipesBackground />

                                    {/* Contenido sobre el fondo */}
                                    <Box style={{ position: 'relative', zIndex: 1 }}>
                                        <Stack gap="xl" align="center" justify="center" style={{ height: '100%' }}>
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.05, 1],
                                                    rotate: [0, 3, -3, 0]
                                                }}
                                                transition={{
                                                    duration: 5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <ThemeIcon
                                                    size={80}
                                                    radius="xl"
                                                    variant="light"
                                                    style={{
                                                        background: 'linear-gradient(135deg, var(--accent-bg) 0%, rgba(245, 166, 35, 0.05) 100%)',
                                                        color: 'var(--accent)',
                                                        border: '2px solid var(--border)',
                                                    }}
                                                >
                                                    <ChefHat size={40} />
                                                </ThemeIcon>
                                            </motion.div>

                                            <Stack gap="md" align="center">
                                                <Title order={3} ta="center" fw={700} style={{ color: 'var(--text-h)' }}>
                                                    Descubre el mundo de la cocina
                                                </Title>
                                                <Text ta="center" style={{ color: 'var(--text-secondary)' }} size="sm">
                                                    Explora miles de recetas, comparte tus creaciones y
                                                    aprende de los mejores chefs.
                                                </Text>
                                            </Stack>

                                            {/* Estadísticas rápidas */}
                                            <SimpleGrid cols={2} spacing="md" style={{ width: '100%' }}>
                                                {stats.map((stat, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.5 + idx * 0.1 }}
                                                    >
                                                        <Card
                                                            withBorder
                                                            p="md"
                                                            radius="lg"
                                                            style={{
                                                                background: 'var(--card-bg)',
                                                                borderColor: 'var(--border)',
                                                                textAlign: 'center',
                                                                transition: 'all 0.3s',
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.borderColor = '#e67e22'
                                                                e.currentTarget.style.transform = 'translateY(-4px)'
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.borderColor = 'var(--border)'
                                                                e.currentTarget.style.transform = 'translateY(0)'
                                                            }}
                                                        >
                                                            <ThemeIcon
                                                                size={32}
                                                                radius="xl"
                                                                variant="light"
                                                                style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
                                                                mx="auto"
                                                                mb="xs"
                                                            >
                                                                {stat.icon}
                                                            </ThemeIcon>
                                                            <Text fw={700} size="xl" style={{ color: 'var(--text-h)' }}>
                                                                {stat.value}
                                                            </Text>
                                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                                                {stat.label}
                                                            </Text>
                                                        </Card>
                                                    </motion.div>
                                                ))}
                                            </SimpleGrid>

                                            {/* Carrusel de recetas */}
                                            <Box style={{ width: '100%' }}>
                                                <RecipeCardsCarousel />
                                            </Box>

                                            {/* Frase inspiradora */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                                style={{
                                                    padding: 16,
                                                    background: 'var(--accent-bg)',
                                                    borderRadius: 12,
                                                    border: '1px solid var(--border)',
                                                    width: '100%',
                                                }}
                                            >
                                                <Text size="sm" style={{ color: 'var(--text-secondary)' }} ta="center">
                                                    💡 "La cocina es el corazón del hogar. Cada receta cuenta una historia."
                                                </Text>
                                            </motion.div>
                                        </Stack>
                                    </Box>
                                </Card>
                            </motion.div>
                        </Grid.Col>
                    </Grid>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Group justify="center" py="xl">
                            <Stack gap="xs" align="center">
                                <Group gap="xs">
                                    <Heart size={14} style={{ color: '#e74c3c' }} />
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                        Hecho con amor
                                    </Text>
                                    <Coffee size={14} style={{ color: '#e67e22' }} />
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                        Chester Recetas v2.0
                                    </Text>
                                </Group>
                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                    © 2024 Chester Recetas - Todos los derechos reservados
                                </Text>
                            </Stack>
                        </Group>
                    </motion.div>
                </Stack>
            </Container>
        </Box>
    )
}
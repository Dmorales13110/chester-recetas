import { Container, Paper, TextInput, PasswordInput, Button, Stack, Text, Alert, Box, Center, Tabs, Group, Avatar, Divider, Anchor, LoadingOverlay } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { DogIcon, Lock, Mail, User, Sparkles, ChevronRight, Shield, Eye, EyeOff, Key, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [resetEmail, setResetEmail] = useState('')
    const [resetStep, setResetStep] = useState('request') // request | sent | confirm
    const [resetCode, setResetCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    
    const { login } = useAuth()
    const navigate = useNavigate()

    // Estados para animación del perro
    const [dogPosition, setDogPosition] = useState(0)
    const [isJumping, setIsJumping] = useState(false)
    const [dogEyes, setDogEyes] = useState('happy') // happy | sad | excited

    // Animación del perro
    useEffect(() => {
        const interval = setInterval(() => {
            setDogPosition(prev => (prev + 1) % 100)
            if (Math.random() > 0.95) {
                setIsJumping(true)
                setTimeout(() => setIsJumping(false), 500)
            }
            // Cambiar expresión de los ojos
            const expressions = ['happy', 'excited', 'happy', 'happy']
            setDogEyes(expressions[Math.floor(Math.random() * expressions.length)])
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        setTimeout(() => {
            const result = login(email, password)
            if (result.success) {
                navigate('/admin', { replace: true })
            } else {
                setError(result.error)
            }
            setLoading(false)
        }, 1500)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setLoading(true)

        setTimeout(() => {
            setSuccess('¡Cuenta creada exitosamente! Redirigiendo al login...')
            setLoading(false)
            setTimeout(() => {
                setActiveTab('login')
                setSuccess('')
            }, 2000)
        }, 1500)
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        setTimeout(() => {
            setResetStep('sent')
            setLoading(false)
        }, 1500)
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

        setTimeout(() => {
            setResetStep('confirm')
            setSuccess('¡Contraseña actualizada exitosamente!')
            setLoading(false)
            setTimeout(() => {
                setActiveTab('login')
                setResetStep('request')
                setSuccess('')
            }, 2000)
        }, 1500)
    }

    // Componente del perro animado
    const AnimatedDog = () => (
        <motion.div
            animate={{
                x: dogPosition * 0.5 - 25,
                y: isJumping ? -30 : 0,
                rotate: isJumping ? [-5, 5, -5, 0] : 0,
                scale: isJumping ? 1.1 : 1,
            }}
            transition={{
                x: { duration: 3, ease: "linear" },
                y: { duration: 0.5, ease: "easeOut" },
                rotate: { duration: 0.5, ease: "easeOut" },
                scale: { duration: 0.3, ease: "easeOut" },
            }}
            style={{
                position: 'relative',
                width: 80,
                height: 80,
                margin: '0 auto 20px',
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                borderRadius: '50%',
                boxShadow: '0 10px 30px -5px rgba(230, 126, 34, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 42,
                color: 'white',
            }}>
                🐕
            </div>
            <motion.div
                animate={{
                    scale: dogEyes === 'excited' ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 20,
                }}
            >
                {dogEyes === 'happy' && '😊'}
                {dogEyes === 'excited' && '🤩'}
                {dogEyes === 'sad' && '😅'}
            </motion.div>
        </motion.div>
    )

    const tabAnimation = {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 },
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }

    return (
        <Center style={{ 
            minHeight: '100vh', 
            background: 'var(--bg)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Fondo animado */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    height: 600,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)',
                    opacity: 0.5,
                    pointerEvents: 'none',
                }}
            />

            <Container size={420} py="xl">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                >
                    <Paper 
                        withBorder 
                        p="xl" 
                        radius="xl" 
                        style={{ 
                            background: 'var(--card-bg)', 
                            borderColor: 'var(--border)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <LoadingOverlay visible={loading} />

                        {/* Decoración superior */}
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                position: 'absolute',
                                top: -50,
                                right: -50,
                                width: 150,
                                height: 150,
                                borderRadius: '50%',
                                background: 'var(--accent-bg)',
                                pointerEvents: 'none',
                            }}
                        />

                        <AnimatedDog />

                        <Text ta="center" size="xl" fw={700} style={{ color: 'var(--text-h)' }} mb={4}>
                            Chester Recetas
                        </Text>
                        <Text ta="center" size="sm" style={{ color: 'var(--text-secondary)' }} mb="xl">
                            Panel Administrativo
                        </Text>

                        <Tabs 
                            value={activeTab} 
                            onChange={setActiveTab} 
                            radius="xl"
                            styles={{
                                tab: {
                                    color: 'var(--text)',
                                    fontWeight: 500,
                                    '&[data-active]': {
                                        color: '#e67e22',
                                    },
                                },
                                tabLabel: {
                                    fontSize: 14,
                                },
                                tabSection: {
                                    marginRight: 8,
                                }
                            }}
                        >
                            <Tabs.List grow mb="lg">
                                <Tabs.Tab value="login" leftSection={<Lock size={16} />}>
                                    Login
                                </Tabs.Tab>
                                <Tabs.Tab value="register" leftSection={<User size={16} />}>
                                    Registro
                                </Tabs.Tab>
                                <Tabs.Tab value="reset" leftSection={<Key size={16} />}>
                                    Recuperar
                                </Tabs.Tab>
                            </Tabs.List>

                            <AnimatePresence mode="wait">
                                {/* Login Tab */}
                                {activeTab === 'login' && (
                                    <motion.div {...tabAnimation}>
                                        <form onSubmit={handleLogin}>
                                            <Stack gap="md">
                                                <TextInput
                                                    label="Correo electrónico"
                                                    placeholder="admin@chester.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
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
                                                <PasswordInput
                                                    label="Contraseña"
                                                    placeholder="admin123"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    leftSection={<Lock size={16} />}
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
                                                {error && (
                                                    <Alert color="red" variant="light">
                                                        {error}
                                                    </Alert>
                                                )}
                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        size="lg"
                                                        radius="xl"
                                                        loading={loading}
                                                        style={{ 
                                                            background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                                                            border: 'none',
                                                        }}
                                                    >
                                                        Iniciar sesión
                                                    </Button>
                                                </motion.div>
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }} ta="center">
                                                    <Sparkles size={12} style={{ display: 'inline', marginRight: 4, color: '#e67e22' }} />
                                                    Credenciales: admin@chester.com / admin123
                                                </Text>
                                            </Stack>
                                        </form>
                                    </motion.div>
                                )}

                                {/* Register Tab */}
                                {activeTab === 'register' && (
                                    <motion.div {...tabAnimation}>
                                        <form onSubmit={handleRegister}>
                                            <Stack gap="md">
                                                <TextInput
                                                    label="Nombre completo"
                                                    placeholder="Tu nombre"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
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
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
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
                                                <PasswordInput
                                                    label="Contraseña"
                                                    placeholder="Mínimo 6 caracteres"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    leftSection={<Lock size={16} />}
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
                                                <PasswordInput
                                                    label="Confirmar contraseña"
                                                    placeholder="Repite tu contraseña"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    leftSection={<Lock size={16} />}
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
                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        size="lg"
                                                        radius="xl"
                                                        loading={loading}
                                                        style={{ 
                                                            background: 'linear-gradient(135deg, #10b981, #34d399)',
                                                            border: 'none',
                                                        }}
                                                    >
                                                        Crear cuenta
                                                    </Button>
                                                </motion.div>
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }} ta="center">
                                                    Al registrarte aceptas nuestros términos y condiciones
                                                </Text>
                                            </Stack>
                                        </form>
                                    </motion.div>
                                )}

                                {/* Reset Password Tab */}
                                {activeTab === 'reset' && (
                                    <motion.div {...tabAnimation}>
                                        {resetStep === 'request' && (
                                            <form onSubmit={handleResetPassword}>
                                                <Stack gap="md">
                                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }} ta="center">
                                                        Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña
                                                    </Text>
                                                    <TextInput
                                                        label="Correo electrónico"
                                                        placeholder="tu@email.com"
                                                        value={resetEmail}
                                                        onChange={(e) => setResetEmail(e.target.value)}
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
                                                    {error && (
                                                        <Alert color="red" variant="light">
                                                            {error}
                                                        </Alert>
                                                    )}
                                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                        <Button
                                                            type="submit"
                                                            fullWidth
                                                            size="lg"
                                                            radius="xl"
                                                            loading={loading}
                                                            style={{ 
                                                                background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                                                                border: 'none',
                                                            }}
                                                        >
                                                            Enviar código
                                                        </Button>
                                                    </motion.div>
                                                    <Divider style={{ borderColor: 'var(--border)' }} />
                                                    <Button
                                                        variant="subtle"
                                                        fullWidth
                                                        size="sm"
                                                        radius="xl"
                                                        onClick={() => {
                                                            setActiveTab('login')
                                                            setResetStep('request')
                                                        }}
                                                        leftSection={<ArrowLeft size={14} />}
                                                    >
                                                        Volver al login
                                                    </Button>
                                                </Stack>
                                            </form>
                                        )}

                                        {resetStep === 'sent' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <form onSubmit={handleConfirmReset}>
                                                    <Stack gap="md">
                                                        <Alert color="green" variant="light" icon={<CheckCircle size={16} />}>
                                                            ¡Código enviado! Revisa tu correo electrónico
                                                        </Alert>
                                                        <TextInput
                                                            label="Código de verificación"
                                                            placeholder="123456"
                                                            value={resetCode}
                                                            onChange={(e) => setResetCode(e.target.value)}
                                                            leftSection={<Key size={16} />}
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
                                                        <PasswordInput
                                                            label="Nueva contraseña"
                                                            placeholder="Mínimo 6 caracteres"
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            leftSection={<Lock size={16} />}
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
                                                        <PasswordInput
                                                            label="Confirmar nueva contraseña"
                                                            placeholder="Repite tu nueva contraseña"
                                                            value={confirmNewPassword}
                                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                            leftSection={<Lock size={16} />}
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
                                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                            <Button
                                                                type="submit"
                                                                fullWidth
                                                                size="lg"
                                                                radius="xl"
                                                                loading={loading}
                                                                style={{ 
                                                                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                                                                    border: 'none',
                                                                }}
                                                            >
                                                                Actualizar contraseña
                                                            </Button>
                                                        </motion.div>
                                                        <Button
                                                            variant="subtle"
                                                            fullWidth
                                                            size="sm"
                                                            radius="xl"
                                                            onClick={() => {
                                                                setResetStep('request')
                                                                setError('')
                                                                setSuccess('')
                                                            }}
                                                            leftSection={<ArrowLeft size={14} />}
                                                        >
                                                            Volver
                                                        </Button>
                                                    </Stack>
                                                </form>
                                            </motion.div>
                                        )}

                                        {resetStep === 'confirm' && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                style={{ textAlign: 'center', padding: 20 }}
                                            >
                                                <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
                                                <Text size="lg" fw={600} style={{ color: 'var(--text-h)' }} mb={8}>
                                                    ¡Contraseña actualizada!
                                                </Text>
                                                <Text size="sm" style={{ color: 'var(--text-secondary)' }} mb="xl">
                                                    Tu contraseña ha sido restablecida exitosamente
                                                </Text>
                                                <Button
                                                    onClick={() => {
                                                        setActiveTab('login')
                                                        setResetStep('request')
                                                        setSuccess('')
                                                    }}
                                                    radius="xl"
                                                    style={{ 
                                                        background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                                                        border: 'none',
                                                    }}
                                                    leftSection={<ArrowLeft size={16} />}
                                                >
                                                    Volver al login
                                                </Button>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Tabs>

                        {/* Footer */}
                        <Divider style={{ borderColor: 'var(--border)' }} mt="xl" mb="md" />
                        <Group justify="center" gap="xs">
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                🐕 Chester Recetas v1.0
                            </Text>
                        </Group>
                    </Paper>
                </motion.div>
            </Container>
        </Center>
    )
}
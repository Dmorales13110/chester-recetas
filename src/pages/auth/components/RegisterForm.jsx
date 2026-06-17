import { TextInput, PasswordInput, Button, Stack, Alert, Text, Group, Anchor, Checkbox, Tooltip } from '@mantine/core'
import { User, Mail, Lock, CheckCircle, XCircle, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const RegisterForm = ({ 
    name, setName, 
    email, setEmail, 
    password, setPassword, 
    confirmPassword, setConfirmPassword,
    error, success, loading, onSubmit, onBackToLogin 
}) => {
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false)
    const [showConfirmTooltip, setShowConfirmTooltip] = useState(false)

    return (
        <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            onSubmit={onSubmit}
        >
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
                            height: 48,
                            '&:focus': {
                                borderColor: '#e67e22',
                            }
                        },
                        label: {
                            color: 'var(--text-h)',
                            fontWeight: 600,
                            marginBottom: 6,
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
                            height: 48,
                            '&:focus': {
                                borderColor: '#e67e22',
                            }
                        },
                        label: {
                            color: 'var(--text-h)',
                            fontWeight: 600,
                            marginBottom: 6,
                        }
                    }}
                />

                <Tooltip
                    label={password.length >= 6 ? 'Contraseña válida' : 'Mínimo 6 caracteres'}
                    position="bottom-start"
                    withArrow
                    opened={showPasswordTooltip}
                    color={password.length >= 6 ? 'teal' : 'red'}
                    withinPortal
                >
                    <PasswordInput
                        label="Contraseña"
                        placeholder="Mínimo 6 caracteres"
                        value={password}
                        onFocus={() => setShowPasswordTooltip(true)}
                        onBlur={() => setShowPasswordTooltip(false)}
                        onChange={(e) => setPassword(e.target.value)}
                        leftSection={<Lock size={16} />}
                        visibilityToggleIcon={({ reveal }) =>
                            reveal ? <EyeOff size={16} /> : <Eye size={16} />
                        }
                        radius="md"
                        required
                        styles={{
                            input: {
                                backgroundColor: 'var(--input-bg)',
                                borderColor: 'var(--border)',
                                color: 'var(--input-text)',
                                height: 48,
                                '&:focus': {
                                    borderColor: '#e67e22',
                                }
                            },
                            label: {
                                color: 'var(--text-h)',
                                fontWeight: 600,
                                marginBottom: 6,
                            }
                        }}
                    />
                </Tooltip>

                {password.length > 0 && password.length < 6 && (
                    <Text size="xs" c="orange">
                        La contraseña debe tener al menos 6 caracteres
                    </Text>
                )}

                {password.length >= 6 && (
                    <Group gap="xs">
                        <CheckCircle size={14} color="#10b981" />
                        <Text size="xs" c="teal">
                            Contraseña válida
                        </Text>
                    </Group>
                )}

                <Tooltip
                    label={confirmPassword && password === confirmPassword ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                    position="bottom-start"
                    withArrow
                    opened={showConfirmTooltip}
                    color={confirmPassword && password === confirmPassword ? 'teal' : 'red'}
                    withinPortal
                >
                    <PasswordInput
                        label="Confirmar contraseña"
                        placeholder="Repite tu contraseña"
                        value={confirmPassword}
                        onFocus={() => setShowConfirmTooltip(true)}
                        onBlur={() => setShowConfirmTooltip(false)}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        leftSection={<Lock size={16} />}
                        visibilityToggleIcon={({ reveal }) =>
                            reveal ? <EyeOff size={16} /> : <Eye size={16} />
                        }
                        radius="md"
                        required
                        styles={{
                            input: {
                                backgroundColor: 'var(--input-bg)',
                                borderColor: 'var(--border)',
                                color: 'var(--input-text)',
                                height: 48,
                                '&:focus': {
                                    borderColor: '#e67e22',
                                }
                            },
                            label: {
                                color: 'var(--text-h)',
                                fontWeight: 600,
                                marginBottom: 6,
                            }
                        }}
                    />
                </Tooltip>

                {confirmPassword && password !== confirmPassword && (
                    <Text size="xs" c="red">
                        Las contraseñas no coinciden
                    </Text>
                )}

                {confirmPassword && password === confirmPassword && (
                    <Group gap="xs">
                        <CheckCircle size={14} color="#10b981" />
                        <Text size="xs" c="teal">
                            Las contraseñas coinciden
                        </Text>
                    </Group>
                )}

                <Checkbox
                    label="Acepto los términos y condiciones"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.currentTarget.checked)}
                    styles={{
                        label: {
                            color: 'var(--text-secondary)',
                            fontSize: 13,
                        },
                        input: {
                            '&:checked': {
                                backgroundColor: '#e67e22',
                                borderColor: '#e67e22',
                            }
                        }
                    }}
                />

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Alert color="red" variant="light" icon={<XCircle size={16} />}>
                            {error}
                        </Alert>
                    </motion.div>
                )}

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Alert color="green" variant="light" icon={<CheckCircle size={16} />}>
                            {success}
                        </Alert>
                    </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        radius="xl"
                        loading={loading}
                        disabled={!acceptedTerms || !name || !email || !password || !confirmPassword || loading}
                        rightSection={<ArrowRight size={18} />}
                        style={{ 
                            background: 'linear-gradient(135deg, #10b981, #34d399)',
                            border: 'none',
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)',
                            height: 48,
                        }}
                        styles={{
                            root: {
                                '&:hover': {
                                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                                    transform: 'translateY(-2px)',
                                }
                            }
                        }}
                    >
                        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </Button>
                </motion.div>

                <Text size="xs" style={{ color: 'var(--text-secondary)' }} ta="center">
                    <Sparkles size={12} style={{ display: 'inline', marginRight: 4, color: '#10b981' }} />
                    ¿Ya tienes cuenta? <Anchor size="xs" style={{ color: '#e67e22', cursor: 'pointer' }} onClick={onBackToLogin}>Inicia sesión</Anchor>
                </Text>
            </Stack>
        </motion.form>
    )
}

export default RegisterForm
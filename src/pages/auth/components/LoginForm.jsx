import { TextInput, PasswordInput, Button, Stack, Alert, Text, Group, Anchor, Tooltip } from '@mantine/core'
import { Mail, Lock, Sparkles, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const LoginForm = ({ email, setEmail, password, setPassword, error, loading, onSubmit, onForgotPassword }) => {
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false)

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
                    label={password.length >= 6 ? 'Contraseña válida' : 'La contraseña debe tener al menos 6 caracteres'}
                    position="bottom-start"
                    withArrow
                    opened={showPasswordTooltip}
                    color={password.length >= 6 ? 'teal' : 'red'}
                    withinPortal
                >
                    <PasswordInput
                        label="Contraseña"
                        placeholder="********"
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

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Alert color="red" variant="light">
                            {error}
                        </Alert>
                    </motion.div>
                )}
                
                <Group justify="flex-end">
                    <Anchor 
                        size="sm" 
                        style={{ color: '#e67e22', cursor: 'pointer' }}
                        onClick={onForgotPassword}
                    >
                        ¿Olvidaste tu contraseña?
                    </Anchor>
                </Group>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        radius="xl"
                        loading={loading}
                        rightSection={<ArrowRight size={18} />}
                        style={{ 
                            background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                            border: 'none',
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 15px rgba(230, 126, 34, 0.2)',
                            height: 48,
                        }}
                        disabled={!email || !password || loading}
                        styles={{
                            root: {
                                '&:hover': {
                                    boxShadow: '0 8px 25px rgba(230, 126, 34, 0.3)',
                                    transform: 'translateY(-2px)',
                                }
                            }
                        }}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </Button>
                </motion.div>

                <Text size="xs" style={{ color: 'var(--text-secondary)' }} ta="center">
                    <Sparkles size={12} style={{ display: 'inline', marginRight: 4, color: '#e67e22' }} />
                    ¿Nuevo por aquí? <Anchor size="xs" style={{ color: '#e67e22', cursor: 'pointer' }}>Regístrate gratis</Anchor>
                </Text>
            </Stack>
        </motion.form>
    )
}

export default LoginForm
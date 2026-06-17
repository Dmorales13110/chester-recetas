import { TextInput, PasswordInput, Button, Stack, Alert, Divider, Text } from '@mantine/core'
import { Mail, Lock, Key, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const ResetPasswordForm = ({ 
    step, resetEmail, setResetEmail,
    resetCode, setResetCode,
    newPassword, setNewPassword,
    confirmNewPassword, setConfirmNewPassword,
    error, success, loading, 
    onRequestReset, onConfirmReset, onBack 
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            {step === 'request' && (
                <form onSubmit={onRequestReset}>
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
                            onClick={onBack}
                            leftSection={<ArrowLeft size={14} />}
                        >
                            Volver al login
                        </Button>
                    </Stack>
                </form>
            )}

            {step === 'sent' && (
                <form onSubmit={onConfirmReset}>
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
                            onClick={onBack}
                            leftSection={<ArrowLeft size={14} />}
                        >
                            Volver
                        </Button>
                    </Stack>
                </form>
            )}

            {step === 'confirm' && (
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
                        onClick={onBack}
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
    )
}

export default ResetPasswordForm
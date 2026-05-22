import { Paper, Title, Text, ThemeIcon, Group, Box } from '@mantine/core'
import { useState } from 'react'
import { ChefHat, CheckCircle, Circle, ArrowRight, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const RecipeInstructions = ({ instructions = [] }) => {
    const [completedSteps, setCompletedSteps] = useState([])
    const [activeStep, setActiveStep] = useState(null)

    const safeInstructions = Array.isArray(instructions) ? instructions : []

    const toggleStep = (index) => {
        setCompletedSteps(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    const progress = (completedSteps.length / safeInstructions.length) * 100

    return (
        <Paper
            withBorder
            p="xl"
            radius="xl"
            style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border)',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Barra de progreso animada */}
            <Box style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: 'var(--border)',
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #e67e22, #f39c12)',
                        borderRadius: 2,
                    }}
                />
            </Box>

            <Group justify="space-between" mb="xl" wrap="wrap">
                <Group gap="xs">
                    <ThemeIcon size="lg" radius="xl" color="orange" variant="light">
                        <ChefHat size={20} />
                    </ThemeIcon>
                    <div>
                        <Title order={3} style={{ color: 'var(--text-h)' }}>
                            Instrucciones paso a paso
                        </Title>
                        <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                            Sigue cada paso y marca los que ya completaste
                        </Text>
                    </div>
                </Group>

                {completedSteps.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Group gap="xs">
                            <Sparkles size={14} color="#e67e22" />
                            <Text size="sm" fw={500} style={{ color: '#e67e22' }}>
                                {completedSteps.length} de {safeInstructions.length} pasos completados
                            </Text>
                        </Group>
                    </motion.div>
                )}
            </Group>

            <Box>
                {safeInstructions.map((instruction, idx) => {
                    const isCompleted = completedSteps.includes(idx)
                    const isActive = activeStep === idx

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                            whileHover={{ scale: 1.01 }}
                            style={{ marginBottom: 16 }}
                        >
                            <Paper
                                p="md"
                                radius="lg"
                                style={{
                                    background: isCompleted
                                        ? 'var(--accent-bg)'
                                        : 'var(--bg-secondary)',
                                    border: `1px solid ${isActive ? '#e67e22' : 'var(--border)'}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                onClick={() => toggleStep(idx)}
                                onMouseEnter={() => setActiveStep(idx)}
                                onMouseLeave={() => setActiveStep(null)}
                            >
                                <Group gap="md" wrap="nowrap" align="flex-start">
                                    {/* Icono de estado animado */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ThemeIcon
                                            size="lg"
                                            radius="xl"
                                            color={isCompleted ? "green" : "orange"}
                                            variant={isCompleted ? "filled" : "light"}
                                            style={{
                                                cursor: 'pointer',
                                                transition: 'all 0.3s',
                                                minWidth: 40,
                                                height: 40,
                                            }}
                                        >
                                            <AnimatePresence mode="wait">
                                                {isCompleted ? (
                                                    <motion.div
                                                        key="check"
                                                        initial={{ scale: 0, rotate: -180 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        exit={{ scale: 0, rotate: 180 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <CheckCircle size={20} />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="circle"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <Circle size={20} />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </ThemeIcon>
                                    </motion.div>

                                    <div style={{ flex: 1 }}>
                                        <Group justify="space-between" wrap="wrap" mb={4}>
                                            <Text
                                                fw={600}
                                                size="md"
                                                style={{
                                                    color: isCompleted ? '#e67e22' : 'var(--text-h)',
                                                    textDecoration: isCompleted ? 'line-through' : 'none',
                                                    transition: 'all 0.3s',
                                                }}
                                            >
                                                Paso {idx + 1}
                                            </Text>
                                            {isActive && !isCompleted && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                >
                                                    <Group gap="xs">
                                                        <Text size="xs" style={{ color: '#e67e22' }}>
                                                            Haz clic para marcar
                                                        </Text>
                                                        <ArrowRight size={12} color="#e67e22" />
                                                    </Group>
                                                </motion.div>
                                            )}
                                        </Group>
                                        <Text
                                            style={{
                                                color: isCompleted ? 'var(--text-secondary)' : 'var(--text)',
                                                transition: 'all 0.3s',
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {instruction}
                                        </Text>
                                    </div>
                                </Group>

                                {/* Animación de onda al completar */}
                                {isCompleted && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0.5 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            width: 100,
                                            height: 100,
                                            borderRadius: '50%',
                                            background: '#e67e22',
                                            pointerEvents: 'none',
                                        }}
                                    />
                                )}
                            </Paper>
                        </motion.div>
                    )
                })}
            </Box>

            {/* Mensaje de felicitaciones al completar todo */}
            <AnimatePresence>
                {completedSteps.length === safeInstructions.length && safeInstructions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        style={{
                            marginTop: 24,
                            padding: 16,
                            background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                            borderRadius: 16,
                            textAlign: 'center',
                        }}
                    >
                        <Group justify="center" gap="md">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 10, 0] }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <ChefHat size={32} color="white" />
                            </motion.div>
                            <div>
                                <Text fw={700} size="lg" style={{ color: 'white' }}>
                                    ¡Felicitaciones! Has completado todos los pasos
                                </Text>
                                <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                                    ¡Tu platillo está listo para disfrutar!
                                </Text>
                            </div>
                        </Group>
                    </motion.div>
                )}
            </AnimatePresence>
        </Paper>
    )
}

export default RecipeInstructions
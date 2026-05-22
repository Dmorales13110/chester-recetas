import { Paper, Title, Text, ThemeIcon, SimpleGrid, Group, Badge, Tooltip } from '@mantine/core'
import {
    Lightbulb, Sparkles, ChefHat, Clock, ThumbsUp, AlertCircle,
    Heart, Star, Zap, Trophy, Coffee, Salad, Pizza, Cake,
    Soup, Utensils, Mic, Thermometer, Egg, Fish, Beef, Leaf, Gift
} from 'lucide-react'
import { motion } from 'framer-motion'

const getIconForTip = (tip) => {
    const lowerTip = tip.toLowerCase()

    if (lowerTip.includes('tiempo') || lowerTip.includes('minuto') || lowerTip.includes('hora')) {
        return <Clock size={20} />
    }
    if (lowerTip.includes('calor') || lowerTip.includes('horno') || lowerTip.includes('temperatura')) {
        return <Thermometer size={20} />
    }
    if (lowerTip.includes('sabor') || lowerTip.includes('sabroso') || lowerTip.includes('delicioso')) {
        return <Star size={20} />
    }
    if (lowerTip.includes('fresc') || lowerTip.includes('ingrediente')) {
        return <Leaf size={20} />
    }
    if (lowerTip.includes('cocción') || lowerTip.includes('cocinar')) {
        return <Mic size={20} />
    }
    if (lowerTip.includes('huevo')) {
        return <Egg size={20} />
    }
    if (lowerTip.includes('pescado')) {
        return <Fish size={20} />
    }
    if (lowerTip.includes('carne')) {
        return <Beef size={20} />
    }
    if (lowerTip.includes('ensalada')) {
        return <Salad size={20} />
    }
    if (lowerTip.includes('pasta')) {
        return <Pizza size={20} />
    }
    if (lowerTip.includes('postre') || lowerTip.includes('dulce')) {
        return <Cake size={20} />
    }
    if (lowerTip.includes('sopa')) {
        return <Soup size={20} />
    }
    if (lowerTip.includes('café') || lowerTip.includes('desayuno')) {
        return <Coffee size={20} />
    }
    if (lowerTip.includes('consejo') || lowerTip.includes('tip')) {
        return <Lightbulb size={20} />
    }

    return <ChefHat size={20} />
}

const RecipeTips = ({ tips = [] }) => {
    const safeTips = Array.isArray(tips) ? tips : []

    if (safeTips.length === 0) return null

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    }

    return (
        <Paper
            withBorder
            p="xl"
            radius="xl"
            style={{
                background: 'linear-gradient(135deg, var(--accent-bg) 0%, var(--card-bg) 100%)',
                borderColor: 'var(--border)',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Elemento decorativo animado */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
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
                    opacity: 0.3,
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Group justify="space-between" align="flex-start" mb="lg" wrap="wrap">
                    <Group gap="xs">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 10, 0] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <ThemeIcon size="lg" radius="xl" color="orange" variant="filled">
                                <ChefHat size={20} />
                            </ThemeIcon>
                        </motion.div>
                        <div>
                            <Group gap="xs">
                                <Title order={3} style={{ color: 'var(--text-h)' }}>
                                    Consejos de Chester
                                </Title>
                                <Badge
                                    size="sm"
                                    color="orange"
                                    variant="light"
                                    leftSection={<Sparkles size={10} />}
                                >
                                    Tips del Chef
                                </Badge>
                            </Group>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                Nuestro amigo Chester comparte sus secretos culinarios 🐕
                            </Text>
                        </div>
                    </Group>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ThemeIcon size="md" radius="xl" color="orange" variant="light">
                            <Sparkles size={16} />
                        </ThemeIcon>
                    </motion.div>
                </Group>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                    {safeTips.map((tip, idx) => (
                        <Tooltip key={idx} label="Consejo de Chester" position="top" withArrow>
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Paper
                                    p="md"
                                    radius="lg"
                                    style={{
                                        background: 'var(--card-bg)',
                                        border: `1px solid var(--border)`,
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        height: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#e67e22'
                                        e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                >
                                    <Group gap="md" wrap="nowrap" align="flex-start">
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <ThemeIcon
                                                size="xl"
                                                radius="xl"
                                                color="orange"
                                                variant="light"
                                                style={{
                                                    flexShrink: 0,
                                                    background: 'var(--accent-bg)',
                                                    minWidth: 48,
                                                    height: 48,
                                                }}
                                            >
                                                {getIconForTip(tip)}
                                            </ThemeIcon>
                                        </motion.div>
                                        <div style={{ flex: 1 }}>
                                            <Text
                                                size="sm"
                                                fw={500}
                                                style={{ color: '#e67e22' }}
                                                mb={4}
                                            >
                                                💡 Tip #{idx + 1}
                                            </Text>
                                            <Text style={{ color: 'var(--text)', lineHeight: 1.5 }}>
                                                {tip}
                                            </Text>
                                        </div>
                                    </Group>

                                    {/* Animación de brillo al hacer hover */}
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.6 }}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(90deg, transparent, rgba(230,126,34,0.1), transparent)',
                                            pointerEvents: 'none',
                                        }}
                                    />
                                </Paper>
                            </motion.div>
                        </Tooltip>
                    ))}
                </SimpleGrid>
            </motion.div>

            {/* Footer animado */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Group
                    gap="xs"
                    mt="lg"
                    pt="md"
                    justify="center"
                    style={{
                        borderTop: `1px solid var(--border)`,
                        background: 'var(--accent-bg)',
                        borderRadius: 16,
                        padding: 12,
                        marginTop: 24,
                    }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <ThemeIcon size="sm" radius="xl" color="orange" variant="light">
                            <Heart size={12} />
                        </ThemeIcon>
                    </motion.div>
                    <Text size="xs" style={{ color: 'var(--text-secondary)' }} ta="center">
                        "Chester dice: ¡La cocina se hace con amor y buenos ingredientes! No tengas miedo de experimentar" 🐕
                    </Text>
                </Group>
            </motion.div>
        </Paper>
    )
}

export default RecipeTips
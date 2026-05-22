import { Paper, Group, Text, NumberInput, ThemeIcon, SimpleGrid, Tooltip } from '@mantine/core'
import { motion } from 'framer-motion'
import { Clock, Zap, Users, Flame, ChefHat, Award, Heart, Star, Timer } from 'lucide-react'

const RecipeInfo = ({ recipe, servings, onUpdateServings }) => {
    const infoItems = [
        { icon: <Clock size={20} />, label: 'Tiempo', value: recipe.time, color: '#e67e22', tooltip: 'Tiempo total de preparación' },
        { icon: <Zap size={20} />, label: 'Dificultad', value: recipe.difficulty, color: '#f39c12', tooltip: 'Nivel de dificultad' },
        { icon: <Flame size={20} />, label: 'Calorías', value: `${recipe.calories} kcal`, color: '#ef4444', tooltip: 'Calorías por porción' },
        { icon: <ChefHat size={20} />, label: 'Categoría', value: recipe.category, color: '#8b5cf6', tooltip: 'Tipo de cocina' },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <Paper
            withBorder
            p="xl"
            radius="xl"
            style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border)'
            }}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Group justify="space-between" wrap="wrap" gap="md">
                    <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" style={{ flex: 1 }}>
                        {infoItems.map((item, idx) => (
                            <Tooltip key={idx} label={item.tooltip} position="top" withArrow>
                                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
                                    <Group gap="sm" wrap="nowrap">
                                        <ThemeIcon
                                            size="lg"
                                            radius="xl"
                                            variant="light"
                                            style={{
                                                background: `${item.color}20`,
                                                color: item.color,
                                            }}
                                        >
                                            {item.icon}
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{item.label}</Text>
                                            <Text fw={600} style={{ color: 'var(--text-h)' }}>{item.value}</Text>
                                        </div>
                                    </Group>
                                </motion.div>
                            </Tooltip>
                        ))}
                    </SimpleGrid>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        style={{ minWidth: 150 }}
                    >
                        <Group gap="sm" wrap="nowrap">
                            <ThemeIcon
                                size="lg"
                                radius="xl"
                                variant="light"
                                style={{ background: 'var(--accent-bg)', color: '#e67e22' }}
                            >
                                <Users size={20} />
                            </ThemeIcon>
                            <div>
                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Porciones</Text>
                                <NumberInput
                                    value={servings}
                                    onChange={onUpdateServings}
                                    min={1}
                                    max={12}
                                    step={1}
                                    radius="xl"
                                    size="sm"
                                    style={{ width: 80 }}
                                    styles={{
                                        input: {
                                            backgroundColor: 'var(--input-bg)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--input-text)',
                                            textAlign: 'center',
                                            fontWeight: 600,
                                        }
                                    }}
                                />
                            </div>
                        </Group>
                    </motion.div>
                </Group>
            </motion.div>
        </Paper>
    )
}

export default RecipeInfo
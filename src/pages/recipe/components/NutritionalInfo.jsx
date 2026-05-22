import { Paper, Title, Text, Progress, Group, ThemeIcon, SimpleGrid } from '@mantine/core'
import { Flame, Apple, Beef, Cookie, Droplet } from 'lucide-react'

const NutritionalInfo = ({ nutritionalInfo }) => {
    if (!nutritionalInfo) return null

    const items = [
        { icon: <Flame size={18} />, label: 'Calorías', value: nutritionalInfo.calories, unit: 'kcal', color: '#e67e22' },
        { icon: <Apple size={18} />, label: 'Proteínas', value: nutritionalInfo.protein, unit: '', color: '#22c55e' },
        { icon: <Beef size={18} />, label: 'Carbohidratos', value: nutritionalInfo.carbs, unit: '', color: '#eab308' },
        { icon: <Droplet size={18} />, label: 'Grasas', value: nutritionalInfo.fat, unit: '', color: '#ef4444' },
        { icon: <Cookie size={18} />, label: 'Fibra', value: nutritionalInfo.fiber, unit: '', color: '#8b5cf6' },
    ]

    const getPercentage = (value, type) => {
        const numericValue = parseInt(value)
        switch (type) {
            case 'Proteínas': return (numericValue / 50) * 100
            case 'Carbohidratos': return (numericValue / 300) * 100
            case 'Grasas': return (numericValue / 70) * 100
            case 'Fibra': return (numericValue / 25) * 100
            default: return 0
        }
    }

    return (
        <Paper
            withBorder
            p="xl"
            radius="xl"
            style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border)',
                height: '100%'
            }}
        >
            <Title order={3} mb="md" style={{ color: 'var(--text-h)' }}>Información nutricional</Title>
            <Text size="sm" style={{ color: 'var(--text-secondary)' }} mb="lg">
                Por porción ({nutritionalInfo.calories} kcal aprox.)
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {items.slice(1).map((item, idx) => {
                    const percentage = getPercentage(item.value, item.label)
                    return (
                        <div key={idx}>
                            <Group justify="space-between" mb={4}>
                                <Group gap="xs">
                                    <ThemeIcon size="sm" radius="xl" color="orange" variant="light">
                                        {item.icon}
                                    </ThemeIcon>
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>{item.label}</Text>
                                </Group>
                                <Text size="sm" fw={600} style={{ color: 'var(--text-h)' }}>
                                    {item.value}{item.unit}
                                </Text>
                            </Group>
                            <Progress
                                value={Math.min(percentage, 100)}
                                size="sm"
                                radius="xl"
                                color={item.color}
                            />
                        </div>
                    )
                })}
            </SimpleGrid>

            <Group gap="xs" mt="lg" pt="md" style={{ borderTop: `1px solid var(--border)` }}>
                <Flame size={14} color="#e67e22" />
                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                    Valores basados en una dieta diaria de 2000 kcal
                </Text>
            </Group>
        </Paper>
    )
}

export default NutritionalInfo
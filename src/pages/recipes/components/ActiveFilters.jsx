import { Group, Badge, Button, Text } from '@mantine/core'
import { X } from 'lucide-react'

const ActiveFilters = ({
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedTime,
    onRemoveFilter,
    onClearAll,
}) => {
    const hasActiveFilters = searchQuery ||
        selectedCategory !== 'all' ||
        selectedDifficulty !== 'all' ||
        selectedTime !== 'all'

    if (!hasActiveFilters) return null

    const getFilterLabel = () => {
        const labels = []
        if (searchQuery) labels.push(`Búsqueda: "${searchQuery}"`)
        if (selectedCategory !== 'all') labels.push(`Categoría: ${selectedCategory}`)
        if (selectedDifficulty !== 'all') labels.push(`Dificultad: ${selectedDifficulty}`)
        if (selectedTime !== 'all') labels.push(`Tiempo: menos de ${selectedTime} min`)
        return labels
    }

    return (
        <Group justify="space-between" mb="md">
            <Group gap="xs" wrap="wrap">
                <Text size="sm" style={{ color: 'var(--text-secondary)' }}>Filtros activos:</Text>
                {getFilterLabel().map((label, idx) => (
                    <Badge
                        key={idx}
                        variant="light"
                        color="orange"
                        rightSection={
                            <X
                                size={12}
                                style={{ cursor: 'pointer', marginLeft: 4 }}
                                onClick={() => onRemoveFilter(label)}
                            />
                        }
                    >
                        {label}
                    </Badge>
                ))}
            </Group>
            <Button variant="subtle" size="xs" onClick={onClearAll} color="gray">
                Limpiar todos
            </Button>
        </Group>
    )
}

export default ActiveFilters
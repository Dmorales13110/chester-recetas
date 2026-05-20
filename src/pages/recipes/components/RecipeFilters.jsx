import {
    Group,
    TextInput,
    Select,
    Button,
    Paper,
    ActionIcon,
    Tooltip
} from '@mantine/core'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'
import { availableCategories, difficultyOptions, timeOptions, sortOptions } from '../hooks/useRecipes'

//filtros y busqueda generales de la pagina de recetas
//3 horitas sin luz (faltan mas)
const RecipeFilters = ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedTime,
    setSelectedTime,
    sortBy,
    setSortBy,
    clearFilters,
    hasActiveFilters,
}) => {
    return (
        <Paper withBorder p="md" radius="xl" mb="xl" bg="white">
            <Group justify="space-between" wrap="wrap" gap="md">
                {/* Búsqueda */}
                <TextInput
                    placeholder="Buscar recetas..."
                    leftSection={<Search size={18} />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ flex: 2, minWidth: 200 }}
                    radius="xl"
                    rightSection={
                        searchQuery && (
                            <ActionIcon variant="subtle" onClick={() => setSearchQuery('')}>
                                <X size={16} />
                            </ActionIcon>
                        )
                    }
                />

                {/* Categoría */}
                <Select
                    placeholder="Categoría"
                    data={availableCategories}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    style={{ width: 180 }}
                    radius="xl"
                />

                {/* Dificultad */}
                <Select
                    placeholder="Dificultad"
                    data={difficultyOptions}
                    value={selectedDifficulty}
                    onChange={setSelectedDifficulty}
                    style={{ width: 160 }}
                    radius="xl"
                />

                {/* Tiempo */}
                <Select
                    placeholder="Tiempo máximo"
                    data={timeOptions}
                    value={selectedTime}
                    onChange={setSelectedTime}
                    style={{ width: 160 }}
                    radius="xl"
                />

                {/* Ordenar */}
                <Select
                    placeholder="Ordenar por"
                    data={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    style={{ width: 180 }}
                    radius="xl"
                    leftSection={<SlidersHorizontal size={16} />}
                />

                {/* Limpiar filtros */}
                {hasActiveFilters && (
                    <Button
                        variant="light"
                        color="gray"
                        onClick={clearFilters}
                        leftSection={<Filter size={16} />}
                        radius="xl"
                    >
                        Limpiar
                    </Button>
                )}
            </Group>
        </Paper>
    )
}

export default RecipeFilters
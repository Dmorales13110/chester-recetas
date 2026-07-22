import {
    Group,
    TextInput,
    Select,
    Button,
    Paper,
    ActionIcon,
} from '@mantine/core'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'
import { difficultyOptions, timeOptions, sortOptions } from '../hooks/useRecipes'

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
    availableCategories,
}) => {
    // Estilos para inputs
    const inputStyles = {
        input: {
            backgroundColor: '#ffffff !important',
            border: '1px solid #e9ecef',
            color: '#1a1a2e !important',
            transition: 'all 0.2s ease',
            '&:focus': {
                borderColor: '#e67e22',
                boxShadow: '0 0 0 2px rgba(230, 126, 34, 0.1)',
            }
        },
        dropdown: {
            backgroundColor: '#ffffff',
            borderColor: '#e9ecef',
        },
        option: {
            color: '#1a1a2e',
            backgroundColor: '#ffffff',
        }
    }

    return (
        <Paper
            withBorder
            p="md"
            radius="xl"
            mb="xl"
            style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border)'
            }}
        >
            <Group justify="space-between" wrap="wrap" gap="md">
                {/* Búsqueda */}
                <div style={{ flex: 2, minWidth: 200, position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        inset: -2,
                        borderRadius: 50,
                        background: searchQuery ? 'linear-gradient(135deg, #e67e22, #f39c12, #e67e22)' : 'transparent',
                        opacity: searchQuery ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }} />
                    <TextInput
                        placeholder="Buscar recetas..."
                        leftSection={<Search size={18} />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        radius="xl"
                        style={{ position: 'relative', zIndex: 1 }}
                        styles={{
                            input: {
                                backgroundColor: '#ffffff !important',
                                border: searchQuery ? '2px solid transparent' : '1px solid #e9ecef',
                                color: '#1a1a2e !important',
                                transition: 'all 0.2s ease',
                                '&:focus': {
                                    border: '2px solid transparent',
                                    boxShadow: 'none',
                                }
                            }
                        }}
                        rightSection={
                            searchQuery && (
                                <ActionIcon
                                    variant="subtle"
                                    onClick={() => setSearchQuery('')}
                                    style={{ color: '#999' }}
                                >
                                    <X size={16} />
                                </ActionIcon>
                            )
                        }
                    />
                </div>

                {/* Categoría - Dinámica */}
                <Select
                    placeholder="Categoría"
                    data={availableCategories || [{ value: 'all', label: 'Todas' }]}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    style={{ width: 180 }}
                    radius="xl"
                    styles={inputStyles}
                />

                {/* Dificultad */}
                <Select
                    placeholder="Dificultad"
                    data={difficultyOptions}
                    value={selectedDifficulty}
                    onChange={setSelectedDifficulty}
                    style={{ width: 160 }}
                    radius="xl"
                    styles={inputStyles}
                />

                {/* Tiempo */}
                <Select
                    placeholder="Tiempo máximo"
                    data={timeOptions}
                    value={selectedTime}
                    onChange={setSelectedTime}
                    style={{ width: 160 }}
                    radius="xl"
                    styles={inputStyles}
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
                    styles={inputStyles}
                />

                {/* Limpiar filtros */}
                {hasActiveFilters && (
                    <Button
                        variant="light"
                        color="orange"
                        onClick={clearFilters}
                        leftSection={<Filter size={16} />}
                        radius="xl"
                        style={{
                            backgroundColor: 'var(--accent-bg)',
                            color: '#e67e22',
                            transition: 'all 0.2s',
                        }}
                        styles={{
                            root: {
                                '&:hover': {
                                    backgroundColor: 'rgba(230, 126, 34, 0.2)',
                                    transform: 'translateY(-2px)',
                                }
                            }
                        }}
                    >
                        Limpiar
                    </Button>
                )}
            </Group>
        </Paper>
    )
}

export default RecipeFilters
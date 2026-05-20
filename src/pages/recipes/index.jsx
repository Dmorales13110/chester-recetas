import { Container, Pagination, Stack, Box, Loader, Center } from '@mantine/core'
import { useRecipes } from './hooks/useRecipes'
import RecipeFilters from './components/RecipeFilters'
import RecipeGrid from './components/RecipeGrid'
import ResultsHeader from './components/ResultsHeader'

function RecipesPage() {
    const {
        recipes,
        allRecipesCount,
        totalPages,
        currentPage,
        setCurrentPage,
        isLoading,
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
    } = useRecipes()

    if (isLoading) {
        return (
            <Center style={{ height: 'calc(100vh - 200px)' }}>
                <Loader size="xl" color="orange" />
            </Center>
        )
    }

    return (
        <Box style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
            <Stack gap="xl" py="xl">
                {/* Filtros */}
                <RecipeFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedDifficulty={selectedDifficulty}
                    setSelectedDifficulty={setSelectedDifficulty}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    clearFilters={clearFilters}
                    hasActiveFilters={hasActiveFilters}
                />

                {/* Resultados */}
                <ResultsHeader count={allRecipesCount} searchQuery={searchQuery} />

                {/* Grid de recetas */}
                <RecipeGrid recipes={recipes} />

                {/* Paginación */}
                {totalPages > 1 && (
                    <Pagination
                        total={totalPages}
                        value={currentPage}
                        onChange={setCurrentPage}
                        mt="xl"
                        mb="lg"
                        color="orange"
                        radius="xl"
                        withEdges
                    />
                )}
            </Stack>
        </Box>
    )
}

export default RecipesPage
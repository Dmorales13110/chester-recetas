import { Container, Pagination, Stack, Box, Loader, Center } from '@mantine/core'
import { useRecipes } from './hooks/useRecipes'
import RecipeFilters from './components/RecipeFilters'
import RecipeGrid from './components/RecipeGrid'
import ResultsHeader from './components/ResultsHeader'
import ActiveFilters from './components/ActiveFilters'
import { useState } from 'react'

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
        availableCategories,
    } = useRecipes()

    //  Estado para forzar actualización de la UI cuando cambian favoritos
    const [favoriteUpdate, setFavoriteUpdate] = useState(0)

    const handleRemoveFilter = (label) => {
        if (label.includes('Búsqueda')) {
            setSearchQuery('')
        } else if (label.includes('Categoría')) {
            setSelectedCategory('all')
        } else if (label.includes('Dificultad')) {
            setSelectedDifficulty('all')
        } else if (label.includes('Tiempo')) {
            setSelectedTime('all')
        }
    }

    //  Callback cuando cambia un favorito
    const handleFavoriteChange = (recipeId, isFavorite) => {
        // Forzar actualización de la UI
        setFavoriteUpdate(prev => prev + 1)
    }

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
                    availableCategories={availableCategories}
                />

                <ActiveFilters
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    selectedDifficulty={selectedDifficulty}
                    selectedTime={selectedTime}
                    onRemoveFilter={handleRemoveFilter}
                    onClearAll={clearFilters}
                />

                <ResultsHeader 
                    count={allRecipesCount} 
                    searchQuery={searchQuery} 
                />

                {/*  Pasar callback para actualizar favoritos */}
                <RecipeGrid 
                    recipes={recipes} 
                    onFavoriteChange={handleFavoriteChange}
                    key={favoriteUpdate} // Forzar re-render cuando cambian favoritos
                />

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
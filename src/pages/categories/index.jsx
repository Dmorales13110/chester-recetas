import { Container, Box, Loader, Center, Stack, Text, Button } from '@mantine/core'
import { useCategories } from './hooks/useCategories'
import FeaturedCategories from './components/FeaturedCategories'
import CategoryGrid from './components/CategoryGrid'
import CategorySearch from './components/CategorySearch'
import { Search } from 'lucide-react'

function CategoriesPage() {
    const {
        featuredCategories,
        regularCategories,
        isLoading,
        searchQuery,
        setSearchQuery,
        totalRecipes,
        totalCategories,
    } = useCategories()

    if (isLoading) {
        return (
            <Center style={{ height: 'calc(100vh - 200px)' }}>
                <Loader size="xl" color="orange" />
            </Center>
        )
    }

    const hasSearchResults = featuredCategories.length > 0 || regularCategories.length > 0

    return (
        <Box style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
            <Stack gap="xl" py="xl">
                <CategorySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                {!searchQuery && <FeaturedCategories categories={featuredCategories} />}

                {hasSearchResults ? (
                    <CategoryGrid
                        categories={searchQuery ? [...featuredCategories, ...regularCategories] : regularCategories}
                        title={searchQuery ? `Resultados para "${searchQuery}"` : "Todas las categorías"}
                        subtitle={searchQuery ? `${featuredCategories.length + regularCategories.length} categorías encontradas` : "Explora por tipo de cocina"}
                    />
                ) : (
                    <Center py="xl">
                        <Stack align="center" gap="md">
                            <Search size={48} color="#ccc" />
                            <Text size="lg" c="dimmed">No se encontraron categorías</Text>
                            <Text size="sm" c="dimmed">
                                No hay categorías que coincidan con "{searchQuery}"
                            </Text>
                            <Button variant="subtle" onClick={() => setSearchQuery('')} color="orange">
                                Limpiar búsqueda
                            </Button>
                        </Stack>
                    </Center>
                )}
            </Stack>
        </Box>
    )
}

export default CategoriesPage
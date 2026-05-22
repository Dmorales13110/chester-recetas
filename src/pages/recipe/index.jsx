import { Container, Box, Loader, Center, Stack } from '@mantine/core'
import { useRecipe } from './hooks/useRecipe'
import RecipeHero from './components/RecipeHero'
import RecipeInfo from './components/RecipeInfo'
import RecipeIngredients from './components/RecipeIngredients'
import RecipeInstructions from './components/RecipeInstructions'
import RecipeTips from './components/RecipeTips'
import RecipeReviews from './components/RecipeReviews'
import RelatedRecipes from './components/RelatedRecipes'
import RecipeActions from './components/RecipeActions'
import NutritionalInfo from './components/NutritionalInfo'

export default function RecipePage() {
    const { recipe, isLoading, error, isSaved, servings, scaledIngredients, updateServings, toggleSaved, navigate } = useRecipe()

    if (isLoading) {
        return (
            <Center style={{ height: 'calc(100vh - 200px)' }}>
                <Loader size="xl" color="orange" />
            </Center>
        )
    }

    if (error || !recipe) {
        return (
            <Center style={{ height: 'calc(100vh - 200px)', flexDirection: 'column', gap: 20 }}>
                <Box style={{ fontSize: 48 }}>🍳</Box>
                <h2 style={{ color: 'var(--text-h)' }}>¡Ups! Receta no encontrada</h2>
                <p style={{ color: 'var(--text-secondary)' }}>La receta que buscas no existe o ha sido eliminada.</p>
                <button
                    onClick={() => navigate('/recetas')}
                    style={{
                        background: '#e67e22',
                        color: 'white',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: 50,
                        cursor: 'pointer',
                        fontSize: 16
                    }}
                >
                    Ver todas las recetas
                </button>
            </Center>
        )
    }

    return (
        <Box style={{ background: 'var(--bg)' }}>
            <RecipeHero recipe={recipe} />
            <Container size="lg" py="xl">
                <Stack gap="xl">
                    <RecipeActions
                        recipe={recipe}
                        isSaved={isSaved}
                        onToggleSaved={toggleSaved}
                    />

                    <RecipeInfo
                        recipe={recipe}
                        servings={servings}
                        onUpdateServings={updateServings}
                    />

                    <Stack gap="lg">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                            <RecipeIngredients
                                ingredients={scaledIngredients}
                                servings={servings}
                                originalServings={recipe.servings}
                            />
                            <NutritionalInfo nutritionalInfo={recipe.nutritionalInfo} />
                        </div>

                        <RecipeInstructions instructions={recipe.instructions} />

                        {recipe.tips && recipe.tips.length > 0 && (
                            <RecipeTips tips={recipe.tips} />
                        )}

                        <RecipeReviews reviews={recipe.reviews} recipeId={recipe.id} />

                        <RelatedRecipes currentRecipeId={recipe.id} category={recipe.category} />
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}
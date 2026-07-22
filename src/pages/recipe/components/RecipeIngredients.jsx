// pages/recipe/components/RecipeIngredients.jsx
import { Paper, Title, Text, List, ThemeIcon, Group, Badge } from '@mantine/core'
import { CheckCircle, ChefHat } from 'lucide-react'

const RecipeIngredients = ({ ingredients, servings, originalServings }) => {
    // ingredients ya viene como array de strings: ["500 gramos Pechuga de Pollo", "2 cucharadas Curry en Polvo", ...]
    //  Ya no necesitas hacer más transformaciones
    
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
            <Group justify="space-between" mb="md">
                <Title order={3} style={{ color: 'var(--text-h)' }}>Ingredientes</Title>
                {servings !== originalServings && (
                    <Badge color="orange" variant="light">
                        Para {servings} {servings === 1 ? 'persona' : 'personas'}
                    </Badge>
                )}
            </Group>
            
            <List
                spacing="sm"
                size="sm"
                icon={
                    <ThemeIcon color="orange" size={20} radius="xl" variant="light">
                        <CheckCircle size={12} />
                    </ThemeIcon>
                }
            >
                {ingredients.map((ingredient, idx) => (
                    <List.Item key={idx}>
                        <Text style={{ color: 'var(--text)' }}>{ingredient}</Text>
                    </List.Item>
                ))}
            </List>
            
            <Group gap="xs" mt="lg" pt="md" style={{ borderTop: `1px solid var(--border)` }}>
                <ChefHat size={14} color="#e67e22" />
                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                    Consejo: Ten todos los ingredientes listos antes de empezar
                </Text>
            </Group>
        </Paper>
    )
}

export default RecipeIngredients
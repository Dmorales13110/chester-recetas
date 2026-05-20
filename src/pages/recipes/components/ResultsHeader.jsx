import { Group, Text, Title, ThemeIcon } from '@mantine/core'
import { ChefHat, UtensilsCrossed } from 'lucide-react'

//mostrar resultados en el header
const ResultsHeader = ({ count, searchQuery }) => {
    return (
        <Group justify="space-between" mb="lg" wrap="wrap">
            <div>
                <Title order={2} c="#333">Todas las recetas</Title>
                <Text size="sm" c="dimmed" mt={4}>
                    {searchQuery ? (
                        <>Resultados para: <strong>"{searchQuery}"</strong></>
                    ) : (
                        <>Descubre nuestras mejores recetas</>
                    )}
                </Text>
            </div>
            <Group gap="xs">
                <ThemeIcon size="md" radius="xl" color="orange" variant="light">
                    <UtensilsCrossed size={16} />
                </ThemeIcon>
                <Text fw={600} c="#333">{count} {count === 1 ? 'receta encontrada' : 'recetas encontradas'}</Text>
            </Group>
        </Group>
    )
}

export default ResultsHeader
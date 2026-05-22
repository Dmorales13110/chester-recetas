import { Group, Button, ActionIcon, Tooltip, Text } from '@mantine/core'
import { Heart, Bookmark, Share2, Printer, Download, Star, MessageCircle } from 'lucide-react'
import { useFavorites } from '../../../context/FavoritesContext'

const RecipeActions = ({ recipe, isSaved, onToggleSaved }) => {
    const { toggleFavorite, isFavorite } = useFavorites()

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: recipe.title,
                    text: recipe.description,
                    url: window.location.href,
                })
            } catch (err) {
                console.log('Error al compartir:', err)
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('¡Enlace copiado al portapapeles!')
        }
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <Group justify="center" gap="md" wrap="wrap">
            <Button
                variant={isFavorite(recipe.id) ? "filled" : "light"}
                color="red"
                radius="xl"
                size="lg"
                leftSection={<Heart size={18} fill={isFavorite(recipe.id) ? "white" : "none"} />}
                onClick={() => toggleFavorite(recipe)}
                style={{ transition: 'all 0.2s' }}
                styles={{
                    root: {
                        '&:hover': {
                            transform: 'translateY(-2px)',
                        }
                    }
                }}
            >
                {isFavorite(recipe.id) ? 'Guardado en favoritos' : 'Añadir a favoritos'}
            </Button>

            <Button
                variant="light"
                color="orange"
                radius="xl"
                size="lg"
                leftSection={<Bookmark size={18} />}
                onClick={onToggleSaved}
            >
                {isSaved ? 'Guardado' : 'Guardar receta'}
            </Button>

            <Group gap="xs">
                <Tooltip label="Compartir">
                    <ActionIcon
                        variant="light"
                        size="lg"
                        radius="xl"
                        onClick={handleShare}
                        style={{ transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <Share2 size={18} />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="Imprimir">
                    <ActionIcon
                        variant="light"
                        size="lg"
                        radius="xl"
                        onClick={handlePrint}
                        style={{ transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <Printer size={18} />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="Valorar">
                    <ActionIcon
                        variant="light"
                        size="lg"
                        radius="xl"
                        style={{ transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <Star size={18} />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="Comentar">
                    <ActionIcon
                        variant="light"
                        size="lg"
                        radius="xl"
                        style={{ transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <MessageCircle size={18} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Group>
    )
}

export default RecipeActions
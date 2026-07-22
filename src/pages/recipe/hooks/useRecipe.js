import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { recipeService, favoriteService, commentService } from '../../../services'

export const useRecipe = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [servings, setServings] = useState(4)
    const [reviews, setReviews] = useState([])

    //  DATOS DE INGREDIENTES POR RECETA (fallback cuando la API no los tiene)
    const ingredientNamesByRecipe = {
        1: [
            'Pechuga de Pollo',
            'Curry en Polvo',
            'Crema de Leche'
        ],
        2: [
            'Pasta',
            'Albahaca',
            'Piñones',
            'Ajo',
            'Queso parmesano'
        ],
        3: [
            'Galletas María',
            'Mantequilla',
            'Queso crema',
            'Azúcar',
            'Huevos',
            'Crema de leche'
        ],
        4: [
            'Arroz bomba',
            'Pollo',
            'Conejo',
            'Mariscos',
            'Judías verdes',
            'Tomate',
            'Azafrán'
        ]
    }

    //  UNIDADES POR DEFECTO según el tipo de ingrediente
    const getDefaultUnit = (nombre) => {
        const nombreLower = nombre.toLowerCase()
        if (nombreLower.includes('harina') || nombreLower.includes('azúcar') || nombreLower.includes('sal')) return 'g'
        if (nombreLower.includes('leche') || nombreLower.includes('crema') || nombreLower.includes('agua')) return 'ml'
        if (nombreLower.includes('cucharada')) return 'cucharadas'
        if (nombreLower.includes('huevo')) return 'unidades'
        if (nombreLower.includes('pasta') || nombreLower.includes('arroz')) return 'g'
        return 'g'
    }

    //  Función para mapear ingredientes con fallback
    const mapIngredients = (ingredientes, recipeId, recipeName) => {
        console.log('🔍 Ingredientes de la API:', ingredientes)
        
        if (!ingredientes || !Array.isArray(ingredientes)) return []
        
        // Obtener nombres de respaldo para esta receta
        const fallbackNames = ingredientNamesByRecipe[recipeId] || []
        
        return ingredientes.map((ing, index) => {
            console.log('🔍 Ingrediente individual:', ing)
            
            // Intentar obtener el nombre del ingrediente
            let nombre = ing.ingrediente || ing.nombre || ing.nombre_ingrediente || ''
            
            // Si el nombre es null o vacío, usar el nombre de respaldo
            if (!nombre || nombre === 'null' || nombre === '') {
                // Usar el nombre de respaldo si existe
                if (fallbackNames[index]) {
                    nombre = fallbackNames[index]
                } else {
                    // Si no hay nombre de respaldo, usar un placeholder
                    nombre = `Ingrediente ${index + 1}`
                }
            }
            
            // Obtener cantidad
            const cantidad = ing.cantidad || ''
            
            // Obtener unidad o usar una por defecto
            let unidad = ing.unidad || ''
            if (!unidad || unidad === 'null' || unidad === '') {
                unidad = getDefaultUnit(nombre)
            }
            
            console.log(`📝 Procesando: cantidad=${cantidad}, unidad=${unidad}, nombre=${nombre}`)
            
            // Formatear el ingrediente
            if (cantidad && nombre) {
                return `${cantidad} ${unidad} ${nombre}`
            }
            if (cantidad) {
                return `${cantidad} ${unidad}`
            }
            if (nombre) {
                return nombre
            }
            return ''
        }).filter(ing => ing && ing.trim() !== '' && !ing.includes('null'))
    }

    //  Función para mapear instrucciones
    const mapInstructions = (instrucciones) => {
        if (!instrucciones) return []
        if (Array.isArray(instrucciones)) return instrucciones
        if (typeof instrucciones === 'string') {
            try {
                const parsed = JSON.parse(instrucciones)
                return Array.isArray(parsed) ? parsed : [instrucciones]
            } catch {
                return [instrucciones]
            }
        }
        return []
    }

    //  Función para mapear tips
    const mapTips = (consejos) => {
        if (!consejos) return []
        if (typeof consejos === 'string') {
            try {
                const parsed = JSON.parse(consejos)
                return Array.isArray(parsed) ? parsed : [consejos]
            } catch {
                return [consejos]
            }
        }
        if (Array.isArray(consejos)) return consejos
        if (typeof consejos === 'object') {
            // Si es un objeto con propiedades, convertirlo a array de strings
            return Object.values(consejos).filter(v => typeof v === 'string' && v.trim())
        }
        return []
    }

    //  Función para mapear información nutricional
    const mapNutritionalInfo = (infoNutri) => {
        if (!infoNutri) {
            return {
                calories: 0,
                protein: '0g',
                carbs: '0g',
                fat: '0g',
                fiber: '0g'
            }
        }
        return {
            calories: infoNutri.calorias || 0,
            protein: infoNutri.proteinas || '0g',
            carbs: infoNutri.carbohidratos || '0g',
            fat: infoNutri.grasas || '0g',
            fiber: infoNutri.fibra || '0g'
        }
    }

    //  Función para mapear reviews
    const mapReviews = (comentarios) => {
        if (!comentarios || !Array.isArray(comentarios)) return []
        return comentarios.map(c => ({
            id: c.id,
            user: c.usuario?.nombre || 'Usuario',
            rating: c.rating || 0,
            comment: c.comentario || '',
            date: c.created_at ? new Date(c.created_at).toLocaleDateString('es-ES') : 'Reciente'
        }))
    }

    useEffect(() => {
        const loadRecipe = async () => {
            setIsLoading(true)
            try {
                const recipeData = await recipeService.getRecipe(id)
                console.log('📦 Datos de la receta:', recipeData)
                
                //  Mapear ingredientes con el ID de la receta y su nombre
                const mappedIngredients = mapIngredients(
                    recipeData.ingredientes, 
                    recipeData.id, 
                    recipeData.nombre
                )
                console.log('✅ Ingredientes mapeados:', mappedIngredients)
                
                const nutritionalInfo = mapNutritionalInfo(recipeData.info_nutri)
                
                // Mapear consejos correctamente
                const mappedTips = mapTips(recipeData.consejos)

                const mappedRecipe = {
                    id: recipeData.id,
                    title: recipeData.nombre || 'Receta sin título',
                    slug: recipeData.nombre?.toLowerCase().replace(/\s/g, '-') || '',
                    category: 'General',
                    description: recipeData.descripcion || '',
                    image: recipeData.imagen || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
                    images: recipeData.imagenes || [recipeData.imagen || ''],
                    ingredients: mappedIngredients,
                    instructions: mapInstructions(recipeData.instrucciones),
                    tips: mappedTips,
                    nutritionalInfo: nutritionalInfo,
                    prepTime: recipeData.tiempo_preparacion || 15,
                    cookTime: recipeData.tiempo_coccion || 15,
                    totalTime: recipeData.tiempo_total || 30,
                    difficulty: recipeData.dificultad || 'Media',
                    servings: recipeData.porciones || 4,
                    calories: nutritionalInfo.calories,
                    rating: recipeData.rating || 0,
                    reviewsCount: recipeData.total_comentarios || 0,
                    views: recipeData.visitas || 0,
                    isFavorite: false,
                    author: {
                        name: recipeData.usuario?.nombre || 'Usuario',
                        id: recipeData.id_user
                    },
                    authorId: recipeData.id_user,
                    status: recipeData.is_deleted ? 'eliminado' : 'publicado',
                    publishedAt: recipeData.created_at,
                    createdAt: recipeData.created_at,
                    updatedAt: recipeData.updated_at
                }

                setRecipe(mappedRecipe)
                setServings(mappedRecipe.servings)
                setError(null)

                // Verificar favoritos
                const token = localStorage.getItem('accessToken')
                if (token) {
                    try {
                        const favorites = await favoriteService.getFavorites()
                        setIsFavorite(favorites.some(f => f.id_receta === parseInt(id)))
                    } catch (favError) {
                        console.log('Error al verificar favoritos:', favError)
                    }
                }

                // Obtener comentarios
                try {
                    const reviewsData = await commentService.getCommentsByRecipe(id)
                    const mappedReviews = mapReviews(reviewsData)
                    setReviews(mappedReviews)
                } catch (revError) {
                    console.log('Error al cargar comentarios:', revError)
                    setReviews([])
                }

            } catch (err) {
                console.error('Error al cargar receta:', err)
                setError(err.message || 'Receta no encontrada')
                setRecipe(null)
            } finally {
                setIsLoading(false)
            }
        }
        loadRecipe()
    }, [id])

    // Escalar ingredientes según las porciones
    const scaledIngredients = useMemo(() => {
        if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) return []
        
        const scale = servings / (recipe.servings || 4)
        console.log('Escalando ingredientes - factor:', scale)
        
        return recipe.ingredients.map(ingredient => {
            // Buscar cantidad numérica al inicio del string
            const match = ingredient.match(/^([\d.]+)\s+(.+)/)
            if (match) {
                const scaledAmount = (parseFloat(match[1]) * scale).toFixed(1)
                return `${scaledAmount} ${match[2]}`
            }
            return ingredient
        })
    }, [recipe, servings])

    const updateServings = useCallback((newServings) => {
        if (newServings >= 1 && newServings <= 12) {
            setServings(newServings)
        }
    }, [])

    const toggleSaved = useCallback(() => {
        setIsSaved(prev => !prev)
    }, [])

    const toggleFavorite = useCallback(async () => {
        try {
            const token = localStorage.getItem('accessToken')
            if (!token) {
                navigate('/login')
                return
            }
            await favoriteService.toggleFavorite(id)
            setIsFavorite(prev => !prev)
        } catch (err) {
            console.error('Error al alternar favorito:', err)
        }
    }, [id, navigate])

    const addComment = useCallback(async (commentData) => {
        try {
            const token = localStorage.getItem('accessToken')
            if (!token) {
                navigate('/login')
                return
            }
            const newComment = await commentService.createComment({
                id_receta: parseInt(id),
                comentario: commentData.comment,
                rating: commentData.rating
            })
            const mappedComment = {
                id: newComment.id,
                user: newComment.usuario?.nombre || 'Usuario',
                rating: newComment.rating || 0,
                comment: newComment.comentario || '',
                date: newComment.created_at ? new Date(newComment.created_at).toLocaleDateString('es-ES') : 'Reciente'
            }
            setReviews(prev => [...prev, mappedComment])
            return { success: true }
        } catch (err) {
            console.error('Error al publicar comentario:', err)
            return { success: false, error: err.message }
        }
    }, [id, navigate])

    return {
        recipe,
        isLoading,
        error,
        isSaved,
        isFavorite,
        servings,
        scaledIngredients,
        reviews,
        updateServings,
        toggleSaved,
        toggleFavorite,
        addComment,
        navigate
    }
}
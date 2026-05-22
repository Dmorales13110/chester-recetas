import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Mock data - Todas las recetas completas
const allRecipes = [
    {
        id: 1,
        title: 'Pasta al Pesto',
        category: 'Pastas',
        slug: 'pasta-al-pesto',
        time: '20 min',
        difficulty: 'Fácil',
        rating: 4.8,
        calories: 580,
        servings: 4,
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=500&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1481931098730-08b49f4f6f8a?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=500&fit=crop',
        ],
        ingredients: [
            '400g de pasta (spaghetti o fettuccine)',
            '2 tazas de albahaca fresca',
            '1/2 taza de piñones',
            '3 dientes de ajo',
            '1/2 taza de queso parmesano rallado',
            '1/2 taza de aceite de oliva extra virgen',
            'Sal al gusto',
            'Pimienta al gusto',
        ],
        instructions: [
            'Lavar y secar bien las hojas de albahaca.',
            'En un procesador de alimentos, agregar la albahaca, piñones, ajo y queso parmesano.',
            'Procesar mientras se añade el aceite de oliva en forma de hilo hasta obtener una pasta homogénea.',
            'Sazonar con sal y pimienta al gusto.',
            'Cocinar la pasta en agua con sal según las instrucciones del paquete.',
            'Escurrir la pasta, reservando un poco del agua de cocción.',
            'Mezclar la pasta con la salsa pesto, añadiendo un poco de agua de cocción si es necesario.',
            'Servir inmediatamente con más queso parmesano por encima.'
        ],
        description: 'Una deliciosa pasta italiana con salsa pesto casera, fresca y llena de sabor. El pesto es una salsa tradicional de Génova que combina albahaca fresca, piñones, ajo y queso parmesano.',
        tips: [
            'Usa albahaca fresca para un mejor sabor',
            'Puedes tostar los piñones ligeramente para potenciar su sabor',
            'Guarda el pesto sobrante en un frasco con una capa de aceite de oliva'
        ],
        nutritionalInfo: {
            calories: 580,
            protein: '18g',
            carbs: '65g',
            fat: '28g',
            fiber: '4g'
        },
        reviews: [
            { id: 1, user: 'María García', rating: 5, comment: '¡Deliciosa! La mejor pasta que he probado', date: '2024-01-15' },
            { id: 2, user: 'Carlos López', rating: 4, comment: 'Muy buena receta, fácil de hacer', date: '2024-01-20' },
            { id: 3, user: 'Ana Martínez', rating: 5, comment: 'El pesto casero es otra cosa, recomendado', date: '2024-02-01' },
        ]
    },
    {
        id: 2,
        title: 'Ensalada César',
        category: 'Ensaladas',
        slug: 'ensalada-cesar',
        time: '15 min',
        difficulty: 'Fácil',
        rating: 4.6,
        calories: 320,
        servings: 2,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54dd8ca?w=800&h=500&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1550304943-4f24f54dd8ca?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1546793665-c74683f296c2?w=800&h=500&fit=crop',
        ],
        ingredients: [
            '1 lechuga romana',
            '200g de pechuga de pollo',
            '1 taza de crutones',
            '1/2 taza de queso parmesano rallado',
            'Para la salsa: 2 filetes de anchoa, 1 diente de ajo, 1 huevo, jugo de limón, mostaza, aceite de oliva'
        ],
        instructions: [
            'Lavar y secar la lechuga romana, cortar en trozos.',
            'Cocinar la pechuga de pollo a la plancha con sal y pimienta, cortar en tiras.',
            'Para la salsa: mezclar anchoas, ajo, yema de huevo, mostaza y jugo de limón en un procesador.',
            'Añadir aceite de oliva gradualmente mientras se procesa hasta emulsionar.',
            'Mezclar la lechuga con la salsa, añadir el pollo, crutones y queso parmesano.',
            'Servir inmediatamente.'
        ],
        description: 'La clásica ensalada César con pollo a la plancha y crutones crujientes.',
        tips: ['Usa pollo a la plancha para una versión más ligera', 'Los crutones caseros son mejores'],
        nutritionalInfo: {
            calories: 320,
            protein: '25g',
            carbs: '15g',
            fat: '18g',
            fiber: '3g'
        },
        reviews: [
            { id: 1, user: 'Pedro Ruiz', rating: 5, comment: 'Excelente ensalada, la salsa quedó perfecta', date: '2024-01-10' },
        ]
    },
    {
        id: 3,
        title: 'Tarta de Queso',
        category: 'Postres',
        slug: 'tarta-de-queso',
        time: '45 min',
        difficulty: 'Media',
        rating: 4.9,
        calories: 420,
        servings: 8,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9589?w=800&h=500&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9589?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&h=500&fit=crop',
        ],
        ingredients: [
            '200g de galletas María',
            '100g de mantequilla derretida',
            '600g de queso crema',
            '200g de azúcar',
            '4 huevos',
            '200ml de nata para montar',
            '1 cucharadita de esencia de vainilla'
        ],
        instructions: [
            'Triturar las galletas y mezclar con la mantequilla derretida.',
            'Presionar la mezcla en un molde desmontable para formar la base.',
            'Hornear la base a 180°C por 10 minutos.',
            'Batir el queso crema con el azúcar hasta que esté cremoso.',
            'Añadir los huevos uno a uno, luego la nata y la vainilla.',
            'Verter la mezcla sobre la base y hornear a 160°C por 40 minutos.',
            'Dejar enfriar en el horno con la puerta entreabierta.',
            'Refrigerar por al menos 4 horas antes de servir.'
        ],
        description: 'Tarta de queso cremosa con base de galleta, horneada a la perfección.',
        tips: ['Usa ingredientes a temperatura ambiente', 'No abras el horno mientras se hornea'],
        nutritionalInfo: {
            calories: 420,
            protein: '8g',
            carbs: '35g',
            fat: '28g',
            fiber: '1g'
        },
        reviews: [
            { id: 1, user: 'Laura Fernández', rating: 5, comment: 'La mejor tarta de queso que he hecho', date: '2024-01-25' },
            { id: 2, user: 'Miguel Torres', rating: 5, comment: 'Cremosa y deliciosa, un éxito en casa', date: '2024-02-05' },
        ]
    },
    {
        id: 4,
        title: 'Paella Mixta',
        category: 'Arroces',
        slug: 'paella-mixta',
        time: '60 min',
        difficulty: 'Media',
        rating: 4.7,
        calories: 680,
        servings: 6,
        image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&h=500&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&h=500&fit=crop',
        ],
        ingredients: [
            '400g de arroz bomba',
            '300g de pollo',
            '200g de conejo',
            '200g de mariscos (gambas, mejillones)',
            '100g de judías verdes',
            '1 tomate rallado',
            'Azafrán',
            'Caldo de pescado',
            'Aceite de oliva'
        ],
        instructions: [
            'Sofreír el pollo y conejo en una paellera con aceite de oliva.',
            'Añadir las judías verdes y el tomate rallado.',
            'Incorporar el arroz y rehogar por un minuto.',
            'Añadir el caldo caliente (el doble que de arroz) y el azafrán.',
            'Cocinar a fuego alto durante 10 minutos.',
            'Bajar el fuego y añadir los mariscos.',
            'Cocinar por 8-10 minutos más hasta que el arroz esté en su punto.',
            'Dejar reposar 5 minutos antes de servir.'
        ],
        description: 'La auténtica paella valenciana con mariscos y carne, llena de sabor y color.',
        tips: ['Usa caldo casero para mejor sabor', 'No remuevas el arroz mientras se cocina'],
        nutritionalInfo: {
            calories: 680,
            protein: '32g',
            carbs: '75g',
            fat: '25g',
            fiber: '4g'
        },
        reviews: []
    },
    {
        id: 5,
        title: 'Huevos Rancheros',
        category: 'Desayunos',
        slug: 'huevos-rancheros',
        time: '25 min',
        difficulty: 'Fácil',
        rating: 4.5,
        calories: 450,
        servings: 2,
        image: 'https://images.unsplash.com/photo-1525351486363-ef6f36f1f6a4?w=800&h=500&fit=crop',
        images: [],
        ingredients: [
            '4 huevos',
            '4 tortillas de maíz',
            '1 taza de frijoles refritos',
            '2 tomates',
            '1 cebolla',
            '1 chile jalapeño',
            'Aguacate',
            'Queso fresco'
        ],
        instructions: [
            'Preparar la salsa con tomates, cebolla y chile.',
            'Calentar los frijoles refritos.',
            'Freír los huevos al gusto.',
            'Calentar las tortillas.',
            'Servir las tortillas con frijoles, huevos y salsa.',
            'Acompañar con aguacate y queso fresco.'
        ],
        description: 'Huevos fritos sobre tortillas con salsa de tomate y frijoles refritos.',
        tips: ['Añade cilantro fresco para más sabor', 'Sirve inmediatamente'],
        nutritionalInfo: {
            calories: 450,
            protein: '20g',
            carbs: '35g',
            fat: '25g',
            fiber: '8g'
        },
        reviews: []
    },
    {
        id: 6,
        title: 'Sopa de Tomate',
        category: 'Sopas',
        slug: 'sopa-de-tomate',
        time: '30 min',
        difficulty: 'Fácil',
        rating: 4.4,
        calories: 180,
        servings: 4,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=500&fit=crop',
        images: [],
        ingredients: [
            '1kg de tomates maduros',
            '1 cebolla',
            '2 dientes de ajo',
            '500ml de caldo de verduras',
            'Albahaca fresca',
            'Aceite de oliva',
            'Sal y pimienta'
        ],
        instructions: [
            'Sofreír la cebolla y el ajo en aceite de oliva.',
            'Añadir los tomates pelados y troceados.',
            'Cocinar por 10 minutos.',
            'Agregar el caldo y la albahaca.',
            'Cocinar por 15 minutos.',
            'Triturar hasta obtener una textura suave.',
            'Servir caliente con crutones.'
        ],
        description: 'Sopa cremosa de tomate casera, perfecta para acompañar con crutones.',
        tips: ['Usa tomates maduros para mejor sabor', 'Añade un poco de nata para más cremosidad'],
        nutritionalInfo: {
            calories: 180,
            protein: '4g',
            carbs: '25g',
            fat: '8g',
            fiber: '5g'
        },
        reviews: []
    },
    {
        id: 7,
        title: 'Brownie de Chocolate',
        category: 'Postres',
        slug: 'brownie-de-chocolate',
        time: '35 min',
        difficulty: 'Fácil',
        rating: 4.9,
        calories: 380,
        servings: 9,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=500&fit=crop',
        images: [],
        ingredients: [
            '200g de chocolate negro',
            '150g de mantequilla',
            '200g de azúcar',
            '3 huevos',
            '100g de harina',
            '100g de nueces'
        ],
        instructions: [
            'Derretir el chocolate con la mantequilla.',
            'Mezclar el azúcar con los huevos.',
            'Incorporar la mezcla de chocolate.',
            'Añadir la harina tamizada y las nueces.',
            'Hornear a 180°C por 25 minutos.',
            'Dejar enfriar antes de cortar.'
        ],
        description: 'Brownies de chocolate súper húmedos con trozos de nuez.',
        tips: ['No hornees de más para que quede jugoso', 'Usa chocolate de buena calidad'],
        nutritionalInfo: {
            calories: 380,
            protein: '6g',
            carbs: '40g',
            fat: '22g',
            fiber: '3g'
        },
        reviews: []
    },
    {
        id: 8,
        title: 'Ceviche Peruano',
        category: 'Pescados',
        slug: 'ceviche-peruano',
        time: '20 min',
        difficulty: 'Media',
        rating: 4.8,
        calories: 250,
        servings: 4,
        image: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=800&h=500&fit=crop',
        images: [],
        ingredients: [
            '500g de pescado blanco',
            '12 limones',
            '1 cebolla morada',
            'Cilantro',
            'Ají limo',
            'Camote',
            'Choclo'
        ],
        instructions: [
            'Cortar el pescado en cubos.',
            'Exprimir los limones.',
            'Mezclar el pescado con el jugo de limón, sal y pimienta.',
            'Añadir la cebolla en juliana y el ají.',
            'Dejar reposar por 5 minutos.',
            'Servir con camote cocido y choclo.'
        ],
        description: 'Ceviche fresco con pescado marinado en jugo de limón y ají.',
        tips: ['El pescado debe estar muy fresco', 'No dejar marinar más de 10 minutos'],
        nutritionalInfo: {
            calories: 250,
            protein: '28g',
            carbs: '15g',
            fat: '8g',
            fiber: '2g'
        },
        reviews: []
    },
    {
        id: 9,
        title: 'Risotto de Champiñones',
        category: 'Arroces',
        slug: 'risotto-de-champinones',
        time: '40 min',
        difficulty: 'Media',
        rating: 4.7,
        calories: 520,
        servings: 4,
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=500&fit=crop',
        images: [],
        ingredients: [
            '300g de arroz arborio',
            '200g de champiñones',
            '1 cebolla',
            '1 diente de ajo',
            '1L de caldo de verduras',
            '50ml de vino blanco',
            '50g de queso parmesano',
            'Aceite de oliva'
        ],
        instructions: [
            'Sofreír la cebolla y el ajo.',
            'Añadir los champiñones laminados.',
            'Agregar el arroz y tostar por un minuto.',
            'Añadir el vino blanco y dejar evaporar.',
            'Ir añadiendo caldo poco a poco mientras se remueve.',
            'Cocinar por 18-20 minutos.',
            'Fuera del fuego, añadir el queso parmesano.',
            'Dejar reposar por 2 minutos antes de servir.'
        ],
        description: 'Risotto cremoso de champiñones, un clásico italiano.',
        tips: ['Usa caldo caliente', 'Remueve constantemente para liberar el almidón'],
        nutritionalInfo: {
            calories: 520,
            protein: '14g',
            carbs: '70g',
            fat: '18g',
            fiber: '3g'
        },
        reviews: []
    },
    {
        id: 10,
        title: 'Smoothie Bowl',
        category: 'Desayunos',
        slug: 'smoothie-bowl',
        time: '10 min',
        difficulty: 'Fácil',
        rating: 4.5,
        calories: 350,
        servings: 1,
        image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&h=500&fit=crop',
        images: [],
        ingredients: [
            '2 plátanos congelados',
            '1 taza de frutos rojos congelados',
            '1/2 taza de leche vegetal',
            'Granola',
            'Frutos rojos frescos',
            'Semillas de chía'
        ],
        instructions: [
            'Licuar los plátanos, frutos rojos y leche vegetal.',
            'Verter en un bowl.',
            'Decorar con granola, frutos rojos y semillas de chía.',
            'Servir inmediatamente.'
        ],
        description: 'Smoothie bowl nutritivo con frutas y granola.',
        tips: ['Usa frutas congeladas para una textura más cremosa', 'Puedes añadir proteína en polvo'],
        nutritionalInfo: {
            calories: 350,
            protein: '8g',
            carbs: '60g',
            fat: '10g',
            fiber: '12g'
        },
        reviews: []
    }
]

export const useRecipe = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [servings, setServings] = useState(4)

    useEffect(() => {
        const loadRecipe = () => {
            setIsLoading(true)
            setTimeout(() => {
                const foundRecipe = allRecipes.find(r => r.id === parseInt(id))
                if (foundRecipe) {
                    setRecipe(foundRecipe)
                    setServings(foundRecipe.servings)
                    setError(null)
                } else {
                    setError('Receta no encontrada')
                }
                setIsLoading(false)
            }, 500)
        }
        loadRecipe()
    }, [id])

    const scaledIngredients = useMemo(() => {
        if (!recipe) return []
        const scale = servings / recipe.servings
        return recipe.ingredients.map(ingredient => {
            const match = ingredient.match(/^(\d+(?:\.\d+)?)\s+(.+)$/)
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

    return {
        recipe,
        isLoading,
        error,
        isSaved,
        servings,
        scaledIngredients,
        updateServings,
        toggleSaved,
        navigate
    }
}
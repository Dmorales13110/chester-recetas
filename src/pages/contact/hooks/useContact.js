import { useState } from 'react'

const faqs = [
    {
        id: 1,
        question: '¿Cómo puedo subir mis propias recetas?',
        answer: '¡Me encanta que quieras compartir! 🐾 Puedes usar el formulario de "Compartir receta" que está más abajo. Solo necesitas llenar los datos básicos de tu receta, subir una foto y ¡listo! Nuestro equipo la revisará y si cumple con nuestros estándares, la publicaremos en la comunidad. ¡Anímate a compartir tus creaciones!',
        category: 'recetas',
    },
    {
        id: 2,
        question: '¿Cuánto tardan en publicar mi receta?',
        answer: '¡Buena pregunta! 🐶 Normalmente revisamos las recetas en un plazo de 24 a 48 horas hábiles. Te enviaremos un correo cuando tu receta esté publicada. Si hay algún problema, nos pondremos en contacto contigo para ayudarte a mejorarla. ¡Gracias por tu paciencia!',
        category: 'recetas',
    },
    {
        id: 3,
        question: '¿Puedo modificar una receta que ya envié?',
        answer: '¡Claro que sí! 🐕 Una vez que tu receta esté publicada, puedes contactarnos directamente para solicitar cambios. También puedes enviar una nueva versión indicando que es una actualización. ¡Siempre estamos felices de mejorar las recetas!',
        category: 'recetas',
    },
    {
        id: 4,
        question: '¿Cómo funciona el sistema de favoritos?',
        answer: '¡Muy fácil! 🐾 Solo tienes que hacer clic en el corazón ❤️ que aparece en cada receta. Las recetas que guardes aparecerán en tu perfil en la sección "Mis favoritos". Así podrás acceder a ellas rápidamente cuando quieras cocinarlas. ¡Es como tener tu propio recetario personalizado!',
        category: 'cuenta',
    },
    {
        id: 5,
        question: '¿Puedo compartir mis creaciones con la comunidad?',
        answer: '¡Por supuesto! 🐶 Sube fotos de tus platillos en la sección de comentarios de cada receta. A otros usuarios les encanta ver cómo quedaron tus preparaciones. ¡No olvides etiquetarnos en redes sociales con #ChesterRecetas para que podamos ver tus creaciones!',
        category: 'comunidad',
    },
    {
        id: 6,
        question: '¿Cómo reporto un problema con una receta?',
        answer: '¡Ayúdanos a mejorar! 🐕 Si encuentras algún error en una receta (ingredientes, pasos, etc.), usa el botón de "Reportar" que está en cada receta. También puedes escribirnos directamente al correo soporte@chesterrecetas.com. ¡Valoramos mucho tu ayuda para mantener la calidad!',
        category: 'soporte',
    },
    {
        id: 7,
        question: '¿Puedo sugerir una categoría nueva?',
        answer: '¡Claro que sí! 🐾 Nos encanta recibir sugerencias. Escríbenos qué categoría te gustaría ver y por qué. Si vemos que hay interés, la agregaremos. Ejemplos que nos han sugerido: "Comida vegana", "Recetas para niños", "Comida rápida saludable". ¡Tu opinión cuenta!',
        category: 'sugerencias',
    },
    {
        id: 8,
        question: '¿Cómo contacto con soporte?',
        answer: '¡Estamos aquí para ayudarte! 🐶 Puedes usar el formulario de contacto de esta misma página, o escribirnos directamente a hola@chesterrecetas.com. Respondemos en menos de 24 horas. ¡No dudes en escribirnos!',
        category: 'soporte',
    },
]

export const useContact = () => {
    const [activeFaqId, setActiveFaqId] = useState(null)
    const [searchFaq, setSearchFaq] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    // Filtrar FAQs
    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = searchFaq === '' || 
            faq.question.toLowerCase().includes(searchFaq.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchFaq.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const toggleFaq = (id) => {
        setActiveFaqId(activeFaqId === id ? null : id)
    }

       const faqCategories = [
        { value: 'all', label: 'Todas', iconName: null },
        { value: 'recetas', label: 'Recetas', iconName: 'BookOpen' },
        { value: 'cuenta', label: 'Mi cuenta', iconName: 'User' },
        { value: 'comunidad', label: 'Comunidad', iconName: 'Users' },
        { value: 'soporte', label: 'Soporte', iconName: 'Wrench' },
        { value: 'sugerencias', label: 'Sugerencias', iconName: 'Lightbulb' },
    ]

    return {
        faqs: filteredFaqs,
        allFaqs: faqs,
        activeFaqId,
        toggleFaq,
        searchFaq,
        setSearchFaq,
        selectedCategory,
        setSelectedCategory,
        faqCategories,
    }
}
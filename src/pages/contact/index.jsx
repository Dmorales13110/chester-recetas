import { Container, SimpleGrid, Box, Stack } from '@mantine/core'
import { useContact } from './hooks/useContact'
import ContactForm from './components/ContactForm'
import ShareRecipeForm from './components/ShareRecipeForm'
import FaqSection from './components/FaqSection'

function ContactPage() {
    const {
        faqs,
        activeFaqId,
        toggleFaq,
        searchFaq,
        setSearchFaq,
        selectedCategory,
        setSelectedCategory,
        faqCategories,
    } = useContact()

    return (
        <Box style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
            <Stack gap="xl" py="xl">
                {/* Formulario de contacto y compartir receta */}
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                    <ContactForm />
                    <ShareRecipeForm />
                </SimpleGrid>
            </Stack>
        </Box>
    )
}

export default ContactPage
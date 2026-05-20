import { Box, Loader, Center } from '@mantine/core'
import { useHomePage } from './hooks/useHomePage'
import HeroSection from './components/HeroSection'
import CategoriesSection from './components/CategoriesSection'
import FeaturedRecipes from './components/FeaturedRecipes'
import FeaturesSection from './components/FeaturesSection'
import TestimonialsSection from './components/TestimonialsSection'
import NewsletterSection from './components/NewsletterSection'
import StatsSection from './components/StatsSections'

export default function HomePage() {
    const {
        email,
        setEmail,
        isLoading,
        featuredRecipes,
        categories,
        testimonials,
        heroBackgrounds,
        handleSubscribe,
    } = useHomePage()

    if (isLoading) {
        return (
            <Center style={{ height: '100vh' }}>
                <Loader size="xl" color="orange" />
            </Center>
        )
    }

    return (
        <Box style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
            <HeroSection backgrounds={heroBackgrounds} />
            <StatsSection />
            <CategoriesSection categories={categories} />
            <FeaturedRecipes recipes={featuredRecipes} />
            <FeaturesSection />
            <TestimonialsSection testimonials={testimonials} />
            <NewsletterSection email={email} setEmail={setEmail} onSubscribe={handleSubscribe} />
        </Box>
    )
}
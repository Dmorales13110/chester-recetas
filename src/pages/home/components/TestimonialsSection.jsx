import { Title, SimpleGrid, Card, Text, Group, Avatar, Rating, Box } from '@mantine/core'
import { Quote, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonialsData = [
    {
        id: 1,
        text: "¡Chester es el mejor compañero de cocina! Sus recetas siempre me salen perfectas y los consejos que da son increíbles. Ahora cocino todos los días gracias a él. 🐕",
        name: "María García",
        role: "Chef Aficionada",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        id: 2,
        text: "Lo que más me gusta de Chester son sus comentarios tan divertidos mientras cocino. Hace que preparar recetas sea una experiencia única y entretenida. ¡Un 10 para Chester!",
        name: "Carlos López",
        role: "Cocinero en casa",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
        id: 3,
        text: "Desde que descubrí Chester Recetas, mis comidas han mejorado muchísimo. Sus tips y trucos son oro puro. ¡Y la sección de favoritos de Chester es genial!",
        name: "Laura Martínez",
        role: "Foodie",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        id: 4,
        text: "Chester siempre tiene un comentario alentador en cada receta. Me encanta cómo hace sentir que cocinar es fácil y divertido. ¡Mi perro también lo ama! 🐶",
        name: "Ana Rodríguez",
        role: "Mamá cocinera",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?img=9"
    }
]

const TestimonialsSection = () => {
    return (
        <>
            <Title order={2} mb="lg" ta="center" style={{ color: 'var(--text-h)' }}>
                Lo que dicen los <span style={{ color: '#e67e22' }}>Chester Lovers</span>
            </Title>
            <Text ta="center" mb="xl" c="dimmed">
                Nuestra comunidad ama a Chester tanto como nosotros ❤️
            </Text>

            {/* Desktop Grid */}
            <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} mb={60} visibleFrom="md">
                {testimonialsData.map((testimonial, idx) => (
                    <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Card
                            withBorder
                            padding="xl"
                            radius="xl"
                            style={{
                                background: 'var(--card-bg)',
                                borderColor: 'var(--border)',
                                height: '100%',
                                position: 'relative'
                            }}
                        >
                            <Heart size={24} color="#e67e22" style={{ position: 'absolute', top: 16, right: 16, opacity: 0.3 }} />
                            <Quote size={32} color="#e67e22" style={{ marginBottom: 16, opacity: 0.5 }} />
                            <Text size="md" mb="lg" style={{ lineHeight: 1.6, color: 'var(--text)' }}>
                                "{testimonial.text}"
                            </Text>
                            <Group gap="md">
                                <Avatar src={testimonial.avatar} size="lg" radius="xl" />
                                <div>
                                    <Text fw={600} style={{ color: 'var(--text-h)' }}>{testimonial.name}</Text>
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{testimonial.role}</Text>
                                    <Rating value={testimonial.rating} readOnly size="xs" mt={4} />
                                </div>
                            </Group>
                        </Card>
                    </motion.div>
                ))}
            </SimpleGrid>

            {/* Mobile Carousel */}
            <Box mb={60} hiddenFrom="md">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    style={{ paddingBottom: 40 }}
                >
                    {testimonialsData.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <Card
                                withBorder
                                padding="xl"
                                radius="xl"
                                style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
                            >
                                <Quote size={32} color="#e67e22" style={{ marginBottom: 16, opacity: 0.5 }} />
                                <Text size="md" mb="lg" style={{ lineHeight: 1.6, color: 'var(--text)' }}>
                                    "{testimonial.text}"
                                </Text>
                                <Group gap="md">
                                    <Avatar src={testimonial.avatar} size="lg" radius="xl" />
                                    <div>
                                        <Text fw={600} style={{ color: 'var(--text-h)' }}>{testimonial.name}</Text>
                                        <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{testimonial.role}</Text>
                                        <Rating value={testimonial.rating} readOnly size="xs" mt={4} />
                                    </div>
                                </Group>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </>
    )
}

export default TestimonialsSection
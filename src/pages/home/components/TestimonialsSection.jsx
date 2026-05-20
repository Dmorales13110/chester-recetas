import { Title, SimpleGrid, Card, Text, Group, Avatar, Rating, Box } from '@mantine/core'
import { Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const TestimonialsSection = ({ testimonials }) => {
    return (
        <>
            <Title order={2} mb="lg" ta="center" c="#333">Lo que dicen nuestros usuarios</Title>

            {/* Desktop Grid */}
            <SimpleGrid cols={{ base: 1, md: 3 }} mb={60} visibleFrom="md">
                {testimonials.map((testimonial, idx) => (
                    <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Card withBorder padding="xl" radius="xl" bg="white" style={{ height: '100%' }}>
                            <Quote size={32} color="#e67e22" style={{ marginBottom: 16, opacity: 0.5 }} />
                            <Text size="md" mb="lg" style={{ lineHeight: 1.6 }} c="#555">"{testimonial.text}"</Text>
                            <Group gap="md">
                                <Avatar src={testimonial.avatar} size="lg" radius="xl" />
                                <div>
                                    <Text fw={600} c="#333">{testimonial.name}</Text>
                                    <Text size="xs" c="#666">{testimonial.role}</Text>
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
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <Card withBorder padding="xl" radius="xl" bg="white">
                                <Quote size={32} color="#e67e22" style={{ marginBottom: 16, opacity: 0.5 }} />
                                <Text size="md" mb="lg" style={{ lineHeight: 1.6 }} c="#555">"{testimonial.text}"</Text>
                                <Group gap="md">
                                    <Avatar src={testimonial.avatar} size="lg" radius="xl" />
                                    <div>
                                        <Text fw={600} c="#333">{testimonial.name}</Text>
                                        <Text size="xs" c="#666">{testimonial.role}</Text>
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
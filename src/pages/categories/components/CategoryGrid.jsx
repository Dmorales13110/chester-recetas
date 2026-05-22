import { SimpleGrid, Card, Image, Text, Badge, Group, Button, Overlay, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

const CategoryGrid = ({ categories, title, subtitle }) => {
    if (categories.length === 0) return null

    return (
        <>
            {title && (
                <Group justify="space-between" mb="lg" mt="xl">
                    <div>
                        <Title order={2} style={{ color: 'var(--text-h)' }}>{title}</Title>
                        {subtitle && <Text style={{ color: 'var(--text-secondary)' }}>{subtitle}</Text>}
                    </div>
                </Group>
            )}

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {categories.map((category, idx) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <Card
                            component={Link}
                            to={`/recetas?categoria=${category.slug}`}
                            withBorder
                            padding={0}
                            radius="xl"
                            style={{
                                cursor: 'pointer',
                                textDecoration: 'none',
                                overflow: 'hidden',
                                transition: 'all 0.3s',
                                background: 'var(--card-bg)',
                                borderColor: 'var(--border)'
                            }}
                        >
                            <div style={{ position: 'relative', height: 200 }}>
                                <Image
                                    src={category.thumbnail}
                                    height={200}
                                    fit="cover"
                                    alt={category.name}
                                />
                                <Overlay
                                    gradient="linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)"
                                    zIndex={1}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: 16,
                                    zIndex: 2,
                                }}>
                                    <Badge color={category.color} variant="filled" size="sm" mb="xs">
                                        {category.count} recetas
                                    </Badge>
                                    <Text fw={700} size="lg" c="white">{category.name}</Text>
                                    <Text size="xs" c="white" opacity={0.8} lineClamp={1}>
                                        {category.description}
                                    </Text>
                                </div>
                            </div>

                            <Group justify="space-between" p="md">
                                <Group gap={4}>
                                    <Star size={14} color="#e67e22" />
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>4.8</Text>
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>• {category.popularRecipes[0]}</Text>
                                </Group>
                                <Button variant="subtle" size="xs" color="orange" rightSection={<ArrowRight size={12} />}>
                                    Ver más
                                </Button>
                            </Group>
                        </Card>
                    </motion.div>
                ))}
            </SimpleGrid>
        </>
    )
}

export default CategoryGrid
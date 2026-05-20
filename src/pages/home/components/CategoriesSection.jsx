import { Title, Button, Group, SimpleGrid, Card, Text, ThemeIcon } from '@mantine/core'
import { ArrowRight, Coffee, Salad, Pizza, Cake, Soup, Utensils } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const iconMap = {
    Coffee: <Coffee size={28} />,
    Salad: <Salad size={28} />,
    Pizza: <Pizza size={28} />,
    Cake: <Cake size={28} />,
    Soup: <Soup size={28} />,
    Utensils: <Utensils size={28} />,
}

const CategoriesSection = ({ categories }) => {
    return (
        <>
            <Group justify="space-between" mb="lg">
                <Title order={2} c="#333">Categorías populares</Title>
                <Button component={Link} to="/categorias" variant="subtle" color="orange" rightSection={<ArrowRight size={16} />}>
                    Ver todas
                </Button>
            </Group>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} mb={60}>
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <Card withBorder padding="lg" radius="xl" ta="center" style={{ cursor: 'pointer', transition: 'all 0.3s' }}>
                            <ThemeIcon size={50} radius="xl" color={cat.color} variant="light" mx="auto">
                                {iconMap[cat.iconName] || <Utensils size={28} />}
                            </ThemeIcon>
                            <Text fw={600} size="md" mt="md" c="#333">{cat.name}</Text>
                            <Text size="xs" c="#666" mt={4}>{cat.count} recetas</Text>
                        </Card>
                    </motion.div>
                ))}
            </SimpleGrid>
        </>
    )
}

export default CategoriesSection
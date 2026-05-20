import { SimpleGrid, Paper, Title, Text, ThemeIcon } from '@mantine/core'
import { Star, Users, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
    { icon: <Star size={24} />, value: '+500', label: 'Recetas verificadas', color: 'orange' },
    { icon: <Users size={24} />, value: '+10k', label: 'Usuarios activos', color: 'green' },
    { icon: <Clock size={24} />, value: '30 min', label: 'Tiempo promedio', color: 'teal' },
]

const StatsSection = () => {
    return (
        <SimpleGrid cols={{ base: 1, sm: 3 }} mb={60}>
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Paper withBorder p="xl" radius="xl" ta="center" bg="white">
                        <ThemeIcon size={50} radius="xl" color={stat.color} variant="light" mx="auto" mb="md">
                            {stat.icon}
                        </ThemeIcon>
                        <Title order={2} size={32} c="#333">{stat.value}</Title>
                        <Text size="sm" c="#666">{stat.label}</Text>
                    </Paper>
                </motion.div>
            ))}
        </SimpleGrid>
    )
}

export default StatsSection
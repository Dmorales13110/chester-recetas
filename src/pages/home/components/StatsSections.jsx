import { SimpleGrid, Paper, Title, Text, ThemeIcon } from '@mantine/core'
import { Star, Users, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
    { icon: <Star size={24} />, value: '+500', label: 'Recetas verificadas' },
    { icon: <Users size={24} />, value: '+10k', label: 'Usuarios activos' },
    { icon: <Clock size={24} />, value: '30 min', label: 'Tiempo promedio' },
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
                    whileHover={{ y: -8 }}
                >
                    <Paper
                        withBorder
                        p="xl"
                        radius="xl"
                        ta="center"
                        style={{
                            background: 'var(--card-bg)',
                            borderColor: 'var(--border)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <ThemeIcon
                            size={50}
                            radius="xl"
                            variant="light"
                            mx="auto"
                            mb="md"
                            style={{
                                background: 'var(--accent-bg)',
                                color: 'var(--accent)',
                            }}
                        >
                            {stat.icon}
                        </ThemeIcon>
                        <Title
                            order={2}
                            size={32}
                            style={{ color: 'var(--text-h)' }}
                        >
                            {stat.value}
                        </Title>
                        <Text
                            size="sm"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {stat.label}
                        </Text>
                    </Paper>
                </motion.div>
            ))}
        </SimpleGrid>
    )
}

export default StatsSection
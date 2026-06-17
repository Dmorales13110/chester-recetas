import { SimpleGrid, Paper, Text, ThemeIcon, Group, Box } from '@mantine/core'
import {
    Users, BookOpen, Heart, MessageCircle, TrendingUp,
    Clock, Eye
} from 'lucide-react'
import { motion } from 'framer-motion'

const statsData = [
    {
        label: 'Usuarios totales',
        value: '1,234',
        icon: <Users size={22} />,
        color: '#3b82f6',
        bg: 'rgba(59, 130, 246, 0.1)',
        change: '+12%',
        trend: 'up'
    },
    {
        label: 'Recetas publicadas',
        value: '156',
        icon: <BookOpen size={22} />,
        color: '#e67e22',
        bg: 'rgba(230, 126, 34, 0.1)',
        change: '+8%',
        trend: 'up'
    },
    {
        label: 'Favoritos totales',
        value: '892',
        icon: <Heart size={22} />,
        color: '#ef4444',
        bg: 'rgba(239, 68, 68, 0.1)',
        change: '+15%',
        trend: 'up'
    },
    {
        label: 'Comentarios',
        value: '456',
        icon: <MessageCircle size={22} />,
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.1)',
        change: '-3%',
        trend: 'down'
    },
    {
        label: 'Visitas hoy',
        value: '324',
        icon: <Eye size={22} />,
        color: '#8b5cf6',
        bg: 'rgba(139, 92, 246, 0.1)',
        change: '+22%',
        trend: 'up'
    },
    {
        label: 'Tiempo promedio',
        value: '4:32',
        icon: <Clock size={22} />,
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.1)',
        change: '+5%',
        trend: 'up'
    },
]

const AdminStats = () => {
    return (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 6 }} spacing="md" mb="xl">
            {statsData.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    style={{ height: '100%' }}
                >
                    <Paper
                        withBorder
                        p="md"
                        radius="xl"
                        style={{
                            background: 'var(--card-bg)',
                            borderColor: 'var(--border)',
                            transition: 'all 0.3s ease',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: 120,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = stat.color
                            e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                    >
                        <Group justify="space-between" align="flex-start">
                            <Box style={{ flex: 1 }}>
                                <Text size="xs" style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>
                                    {stat.label}
                                </Text>
                                <Text size="xl" fw={700} style={{ color: 'var(--text-h)', marginTop: 4 }}>
                                    {stat.value}
                                </Text>
                            </Box>
                            <ThemeIcon
                                size="md"
                                radius="xl"
                                style={{
                                    background: stat.bg,
                                    color: stat.color,
                                    flexShrink: 0,
                                    width: 40,
                                    height: 40,
                                }}
                            >
                                {stat.icon}
                            </ThemeIcon>
                        </Group>
                        <Group gap="xs" mt="auto">
                            <TrendingUp
                                size={12}
                                style={{
                                    color: stat.trend === 'up' ? '#10b981' : '#ef4444',
                                    transform: stat.trend === 'down' ? 'rotate(180deg)' : 'none'
                                }}
                            />
                            <Text
                                size="xs"
                                fw={600}
                                style={{
                                    color: stat.trend === 'up' ? '#10b981' : '#ef4444',
                                }}
                            >
                                {stat.change}
                            </Text>
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                vs mes anterior
                            </Text>
                        </Group>
                    </Paper>
                </motion.div>
            ))}
        </SimpleGrid>
    )
}

export default AdminStats
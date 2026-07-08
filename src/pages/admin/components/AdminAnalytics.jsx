import { useState } from 'react'
import { 
    Paper, Title, Text, Group, SimpleGrid, Card, 
    ThemeIcon, Badge, Stack, Divider, Button,
    Select, Table, Progress, Box
} from '@mantine/core'
import { 
    BarChart3, TrendingUp, TrendingDown, Users, 
    BookOpen, Heart, MessageCircle, Eye, Clock,
    ArrowUp, ArrowDown, Star, Zap,
    Award, Target, Calendar, Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'

const analyticsData = {
    overview: {
        totalUsers: 1234,
        newUsersToday: 45,
        activeUsers: 876,
        totalRecipes: 156,
        totalFavorites: 892,
        totalComments: 456,
        totalViews: 12456,
        avgTimeSpent: '4:32',
        bounceRate: '32%',
    },
    trends: [
        { label: 'Usuarios', value: '+12%', trend: 'up', color: '#3b82f6', change: 12 },
        { label: 'Recetas', value: '+8%', trend: 'up', color: '#e67e22', change: 8 },
        { label: 'Favoritos', value: '+15%', trend: 'up', color: '#ef4444', change: 15 },
        { label: 'Comentarios', value: '-3%', trend: 'down', color: '#8b5cf6', change: -3 },
    ],
    popularRecipes: [
        { name: 'Pasta al Pesto', views: 1234, rating: 4.8, change: '+12%' },
        { name: 'Paella Mixta', views: 987, rating: 4.7, change: '+8%' },
        { name: 'Tarta de Queso', views: 876, rating: 4.9, change: '+15%' },
        { name: 'Ensalada César', views: 654, rating: 4.6, change: '+5%' },
        { name: 'Brownie de Chocolate', views: 543, rating: 4.9, change: '+20%' },
    ],
    weeklyStats: [
        { day: 'Lun', visits: 120, comments: 12, recipes: 3 },
        { day: 'Mar', visits: 150, comments: 18, recipes: 5 },
        { day: 'Mié', visits: 180, comments: 25, recipes: 7 },
        { day: 'Jue', visits: 200, comments: 30, recipes: 4 },
        { day: 'Vie', visits: 220, comments: 28, recipes: 8 },
        { day: 'Sáb', visits: 190, comments: 22, recipes: 6 },
        { day: 'Dom', visits: 130, comments: 15, recipes: 2 },
    ],
    growthData: [
        { label: 'Crecimiento mensual', value: '18%', trend: 'up', icon: <TrendingUp size={16} /> },
        { label: 'Usuarios nuevos', value: '45', trend: 'up', icon: <Users size={16} /> },
        { label: 'Recetas nuevas', value: '12', trend: 'up', icon: <BookOpen size={16} /> },
        { label: 'Comentarios hoy', value: '28', trend: 'up', icon: <MessageCircle size={16} /> },
    ]
}

const AdminAnalytics = () => {
    const [timeRange, setTimeRange] = useState('week')

    return (
        <Paper withBorder p="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
            <Stack gap="lg">
                {/* Header */}
                <Group justify="space-between" wrap="wrap">
                    <div>
                        <Group gap="xs" mb={4}>
                            <BarChart3 size={24} style={{ color: '#8b5cf6' }} />
                            <Title order={3} style={{ color: 'var(--text-h)' }}>Analíticas</Title>
                            <Badge size="sm" color="orange" variant="light">Actualizado hoy</Badge>
                        </Group>
                        <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                            Estadísticas y métricas de Chester Recetas
                        </Text>
                    </div>
                    <Select
                        data={[
                            { value: 'today', label: ' Hoy' },
                            { value: 'week', label: 'Esta semana' },
                            { value: 'month', label: ' Este mes' },
                            { value: 'year', label: 'Este año' },
                        ]}
                        value={timeRange}
                        onChange={setTimeRange}
                        radius="xl"
                        style={{ width: 150 }}
                    />
                </Group>

                {/* Stats principales */}
                <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                        <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                            <Group justify="space-between">
                                <div>
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Usuarios totales</Text>
                                    <Text size="xl" fw={700} style={{ color: 'var(--text-h)' }}>
                                        {analyticsData.overview.totalUsers}
                                    </Text>
                                    <Group gap="xs" mt={4}>
                                        <TrendingUp size={12} style={{ color: '#10b981' }} />
                                        <Text size="xs" fw={600} style={{ color: '#10b981' }}>+12%</Text>
                                    </Group>
                                </div>
                                <ThemeIcon size="lg" radius="xl" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                    <Users size={20} />
                                </ThemeIcon>
                            </Group>
                        </Card>
                    </motion.div>

                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                        <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                            <Group justify="space-between">
                                <div>
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Recetas publicadas</Text>
                                    <Text size="xl" fw={700} style={{ color: 'var(--text-h)' }}>
                                        {analyticsData.overview.totalRecipes}
                                    </Text>
                                    <Group gap="xs" mt={4}>
                                        <TrendingUp size={12} style={{ color: '#10b981' }} />
                                        <Text size="xs" fw={600} style={{ color: '#10b981' }}>+8%</Text>
                                    </Group>
                                </div>
                                <ThemeIcon size="lg" radius="xl" style={{ background: 'rgba(230, 126, 34, 0.1)', color: '#e67e22' }}>
                                    <BookOpen size={20} />
                                </ThemeIcon>
                            </Group>
                        </Card>
                    </motion.div>

                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                        <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                            <Group justify="space-between">
                                <div>
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Favoritos totales</Text>
                                    <Text size="xl" fw={700} style={{ color: 'var(--text-h)' }}>
                                        {analyticsData.overview.totalFavorites}
                                    </Text>
                                    <Group gap="xs" mt={4}>
                                        <TrendingUp size={12} style={{ color: '#10b981' }} />
                                        <Text size="xs" fw={600} style={{ color: '#10b981' }}>+15%</Text>
                                    </Group>
                                </div>
                                <ThemeIcon size="lg" radius="xl" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                                    <Heart size={20} />
                                </ThemeIcon>
                            </Group>
                        </Card>
                    </motion.div>

                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                        <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                            <Group justify="space-between">
                                <div>
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Visitas totales</Text>
                                    <Text size="xl" fw={700} style={{ color: 'var(--text-h)' }}>
                                        {analyticsData.overview.totalViews}
                                    </Text>
                                    <Group gap="xs" mt={4}>
                                        <TrendingUp size={12} style={{ color: '#10b981' }} />
                                        <Text size="xs" fw={600} style={{ color: '#10b981' }}>+22%</Text>
                                    </Group>
                                </div>
                                <ThemeIcon size="lg" radius="xl" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                                    <Eye size={20} />
                                </ThemeIcon>
                            </Group>
                        </Card>
                    </motion.div>
                </SimpleGrid>

                {/* Métricas adicionales */}
                <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
                    <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                        <Group gap="xs">
                            <Users size={16} style={{ color: '#3b82f6' }} />
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Usuarios activos</Text>
                        </Group>
                        <Text size="xl" fw={700} style={{ color: 'var(--text-h)' }}>{analyticsData.overview.activeUsers}</Text>
                    </Card>
                    <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                        <Group gap="xs">
                            <Clock size={16} style={{ color: '#f59e0b' }} />
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Tiempo promedio</Text>
                        </Group>
                        <Text size="xl" fw={700} style={{ color: 'var(--text-h)' }}>{analyticsData.overview.avgTimeSpent}</Text>
                    </Card>
                    <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                        <Group gap="xs">
                            <Target size={16} style={{ color: '#ef4444' }} />
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Tasa de rebote</Text>
                        </Group>
                        <Text size="xl" fw={700} style={{ color: 'var(--text-h)' }}>{analyticsData.overview.bounceRate}</Text>
                    </Card>
                    <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                        <Group gap="xs">
                            <Users size={16} style={{ color: '#10b981' }} />
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Nuevos hoy</Text>
                        </Group>
                        <Text size="xl" fw={700} style={{ color: 'var(--text-h)' }}>{analyticsData.overview.newUsersToday}</Text>
                    </Card>
                </SimpleGrid>

                <Divider style={{ borderColor: 'var(--border)' }} />

                {/* Recetas populares */}
                <div>
                    <Group justify="space-between" mb="md">
                        <Group gap="xs">
                            <Star size={18} style={{ color: '#f59e0b' }} />
                            <Text fw={600} style={{ color: 'var(--text-h)' }}>Recetas más populares</Text>
                        </Group>
                        <Badge variant="light" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                            🔥 Top 5
                        </Badge>
                    </Group>
                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th style={{ color: 'var(--text-h)' }}>#</Table.Th>
                                <Table.Th style={{ color: 'var(--text-h)' }}>Receta</Table.Th>
                                <Table.Th style={{ color: 'var(--text-h)' }}>Visitas</Table.Th>
                                <Table.Th style={{ color: 'var(--text-h)' }}>Rating</Table.Th>
                                <Table.Th style={{ color: 'var(--text-h)' }}>Cambio</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {analyticsData.popularRecipes.map((recipe, idx) => (
                                <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Table.Td>
                                        <Badge 
                                            size="sm" 
                                            variant="filled"
                                            style={{ 
                                                background: idx === 0 ? '#e67e22' : idx === 1 ? '#f39c12' : idx === 2 ? '#f1c40f' : 'var(--bg-secondary)',
                                                color: idx < 3 ? 'white' : 'var(--text)',
                                            }}
                                        >
                                            {idx + 1}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td style={{ color: 'var(--text-h)' }}>{recipe.name}</Table.Td>
                                    <Table.Td style={{ color: 'var(--text-secondary)' }}>{recipe.views}</Table.Td>
                                    <Table.Td>
                                        <Group gap="xs">
                                            <Star size={14} style={{ color: '#f59e0b' }} />
                                            <Text style={{ color: 'var(--text-secondary)' }}>{recipe.rating}</Text>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge 
                                            size="sm" 
                                            variant="light"
                                            color={recipe.change.startsWith('+') ? 'green' : 'red'}
                                        >
                                            {recipe.change}
                                        </Badge>
                                    </Table.Td>
                                </motion.tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </div>

                <Divider style={{ borderColor: 'var(--border)' }} />

                {/* Actividad semanal */}
                <div>
                    <Group gap="xs" mb="md">
                        <Calendar size={18} style={{ color: '#e67e22' }} />
                        <Text fw={600} style={{ color: 'var(--text-h)' }}>Actividad semanal</Text>
                    </Group>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }} mb="md">Visitas por día</Text>
                            <Stack gap="sm">
                                {analyticsData.weeklyStats.map((day, idx) => (
                                    <Group key={idx} justify="space-between">
                                        <Text size="sm" fw={500} style={{ color: 'var(--text-h)' }}>{day.day}</Text>
                                        <Group gap="xs">
                                            <Eye size={12} style={{ color: 'var(--text-secondary)' }} />
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{day.visits}</Text>
                                            <Progress 
                                                value={(day.visits / 220) * 100} 
                                                size="xs" 
                                                radius="xl"
                                                color="orange"
                                                style={{ width: 80 }}
                                            />
                                        </Group>
                                    </Group>
                                ))}
                            </Stack>
                        </Card>
                        <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                            <Text size="xs" style={{ color: 'var(--text-secondary)' }} mb="md">Comentarios y recetas</Text>
                            <Stack gap="sm">
                                {analyticsData.weeklyStats.map((day, idx) => (
                                    <Group key={idx} justify="space-between">
                                        <Text size="sm" fw={500} style={{ color: 'var(--text-h)' }}>{day.day}</Text>
                                        <Group gap="md">
                                            <Group gap="xs">
                                                <MessageCircle size={12} style={{ color: '#10b981' }} />
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{day.comments}</Text>
                                            </Group>
                                            <Group gap="xs">
                                                <BookOpen size={12} style={{ color: '#e67e22' }} />
                                                <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{day.recipes}</Text>
                                            </Group>
                                        </Group>
                                    </Group>
                                ))}
                            </Stack>
                        </Card>
                    </SimpleGrid>
                </div>

                <Divider style={{ borderColor: 'var(--border)' }} />

                {/* Resumen rápido */}
                <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
                    {analyticsData.growthData.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Card withBorder padding="md" radius="lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                                <Group gap="xs">
                                    {item.icon}
                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{item.label}</Text>
                                </Group>
                                <Group justify="space-between" mt={4}>
                                    <Text size="xl" fw={700} style={{ color: 'var(--text-h)' }}>{item.value}</Text>
                                    <Badge 
                                        size="sm" 
                                        variant="light"
                                        color={item.trend === 'up' ? 'green' : 'red'}
                                    >
                                        {item.trend === 'up' ? '↑' : '↓'}
                                    </Badge>
                                </Group>
                            </Card>
                        </motion.div>
                    ))}
                </SimpleGrid>
            </Stack>
        </Paper>
    )
}

export default AdminAnalytics
import { Container, Grid, SimpleGrid, Title, Text, Paper, Group, ThemeIcon, Box, Button, Card, Stack, Badge } from '@mantine/core'
import {
    Users, BookOpen, Heart, MessageCircle, TrendingUp,
    Calendar, Eye, Clock, Sparkles, ArrowRight, Plus,
    Settings, Tag, Bell, BarChart3, CheckCircle, AlertCircle
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdmin } from './hooks/useAdmin'
import AdminStats from './components/AdminStats'
import AdminRecipes from './components/AdminRecipes'
import AdminUsers from './components/AdminUsers'
import AdminComments from './components/AdminComments'

const quickActions = [
    { label: 'Nueva receta', icon: <BookOpen size={18} />, path: '/admin/recipes/new', color: '#e67e22', bg: 'rgba(230, 126, 34, 0.1)' },
    { label: 'Ver usuarios', icon: <Users size={18} />, path: '/admin/users', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { label: 'Gestionar comentarios', icon: <MessageCircle size={18} />, path: '/admin/comments', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    { label: 'Categorías', icon: <Tag size={18} />, path: '/admin/categories', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
    { label: 'Estadísticas', icon: <BarChart3 size={18} />, path: '/admin/stats', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    { label: 'Configuración', icon: <Settings size={18} />, path: '/admin/settings', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' },
]

export default function AdminPage() {
    const { isAdmin, isLoading: authLoading } = useAuth()
    const { stats, isLoading } = useAdmin()

    if (authLoading || isLoading) return null
    if (!isAdmin) return <Navigate to="/login" replace />

    return (
        <Container size="xl" py="md">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <Paper
                    p="xl"
                    radius="xl"
                    style={{
                        background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                        marginBottom: 24,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: -50,
                        right: -50,
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        pointerEvents: 'none',
                    }} />

                    <Group justify="space-between" align="center" style={{ position: 'relative', zIndex: 1 }}>
                        <Stack gap="xs">
                            <Group gap="xs">
                                <Sparkles size={20} color="white" />
                                <Title order={1} c="white">Panel de Control</Title>
                            </Group>
                            <Text c="white" opacity={0.9} size="sm">
                                Bienvenido al panel administrativo de Chester Recetas
                            </Text>
                            <Group gap="xs">
                                <Badge size="sm" variant="white" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                    🐕 Administrador
                                </Badge>
                                <Badge size="sm" variant="white" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                    📊 {stats.recipes} recetas
                                </Badge>
                            </Group>
                        </Stack>
                        <Button 
                            variant="white" 
                            radius="xl"
                            leftSection={<Plus size={16} />}
                            component={Link}
                            to="/admin/recipes/new"
                            size="sm"
                        >
                            Nueva receta
                        </Button>
                    </Group>
                </Paper>

                {/* Stats */}
                <AdminStats stats={stats} />

                {/* Acciones rápidas */}
                <SimpleGrid cols={{ base: 2, md: 3, lg: 6 }} spacing="md" mb="xl">
                    {quickActions.map((action, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -4 }}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <Card
                                component={Link}
                                to={action.path}
                                withBorder
                                padding="sm"
                                radius="xl"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--border)',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    minHeight: 60,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = action.color
                                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                <Group gap="xs" style={{ flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <ThemeIcon size="md" radius="xl" style={{ background: action.bg, color: action.color, width: 32, height: 32, flexShrink: 0 }}>
                                        {action.icon}
                                    </ThemeIcon>
                                    <Text fw={600} size="sm" style={{ color: 'var(--text-h)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {action.label}
                                    </Text>
                                </Group>
                            </Card>
                        </motion.div>
                    ))}
                </SimpleGrid>

                {/* Grid principal */}
                <Grid gutter="md">
                    <Grid.Col span={{ base: 12, lg: 8 }}>
                        <AdminRecipes recipes={[]} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 4 }}>
                        <AdminUsers users={[]} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <AdminComments comments={[]} />
                    </Grid.Col>
                </Grid>
            </motion.div>
        </Container>
    )
}
import { Container, Box, Title, Text, SimpleGrid, Card, Image, Group, Badge, Button, Avatar, Stack, Divider, Tabs, ThemeIcon, Loader, Center } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Heart, BookOpen, User, Mail, Phone, MapPin, Calendar, Settings, Star, Clock, Trash2, ChefHat, Award, Edit, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProfile } from './hooks/useProfile'
import { useState } from 'react'
import EditProfileModal from './components/EditProfileModal'

const ProfilePage = () => {
    const {
        user,
        favorites,
        isLoading,
        isAuthenticated,
        removeFavorite,
        loadFavorites,
        updateLocalUser
    } = useProfile()

    const [editModalOpen, setEditModalOpen] = useState(false)
    const [userData, setUserData] = useState(user)
    const [updatingFavorites, setUpdatingFavorites] = useState(false)

    //  Función para actualizar los datos del usuario después de editar
    const handleUserUpdate = (updatedData) => {
        setUserData(prev => ({ ...prev, ...updatedData }))
        // Recargar favoritos por si acaso
        loadFavorites()
    }

    //  Función para recargar favoritos manualmente
    const handleRefreshFavorites = async () => {
        setUpdatingFavorites(true)
        await loadFavorites()
        setUpdatingFavorites(false)
    }

    //  Eliminar favorito con actualización visual
    const handleRemoveFavorite = async (recipeId) => {
        const result = await removeFavorite(recipeId)
        if (result.success) {
            // Actualizar el contador localmente
            setUserData(prev => ({
                ...prev,
                totalFavorites: Math.max(0, (prev.totalFavorites || 0) - 1)
            }))
        }
    }

    if (isLoading) {
        return (
            <Center style={{ height: 'calc(100vh - 200px)' }}>
                <Loader size="xl" color="orange" />
            </Center>
        )
    }

    if (!isAuthenticated) {
        return (
            <Center style={{ height: 'calc(100vh - 200px)', flexDirection: 'column', gap: 20 }}>
                <Heart size={64} style={{ color: 'var(--border)' }} />
                <Title order={2} style={{ color: 'var(--text-h)' }}>Inicia sesión para ver tu perfil</Title>
                <Text style={{ color: 'var(--text-secondary)' }}>
                    Necesitas estar autenticado para acceder a tu perfil
                </Text>
                <Button
                    component={Link}
                    to="/login"
                    color="orange"
                    radius="xl"
                    size="lg"
                    leftSection={<User size={18} />}
                >
                    Iniciar sesión
                </Button>
            </Center>
        )
    }

    // Usar userData actualizado o el user del hook
    const displayUser = userData || user

    console.log(' Datos del perfil:', {
        displayUser,
        favorites: favorites?.length || 0,
        totalFavorites: displayUser?.totalFavorites || 0
    })

    return (
        <Container size="lg" py="xl">
            <Stack gap="xl">
                {/* Header del perfil */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box
                        style={{
                            background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                            borderRadius: 24,
                            padding: 40,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Elementos decorativos */}
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
                        <div style={{
                            position: 'absolute',
                            bottom: -30,
                            left: -30,
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            pointerEvents: 'none',
                        }} />

                        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                            <Avatar
                                size={120}
                                radius={120}
                                style={{
                                    margin: '0 auto 20px',
                                    border: '4px solid white',
                                    background: 'white',
                                    color: '#e67e22',
                                    fontSize: 40,
                                }}
                            >
                                {displayUser.avatar ? (
                                    <img src={displayUser.avatar} alt={displayUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    displayUser.name?.charAt(0) || <User size={60} />
                                )}
                            </Avatar>
                            <Title order={1} style={{ color: 'white' }}>{displayUser.name}</Title>
                            <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                                <Calendar size={14} style={{ display: 'inline', marginRight: 4 }} />
                                Miembro desde {displayUser.memberSince}
                            </Text>
                            <Group justify="center" gap="xl" mt="lg">
                                <div>
                                    <Text fw={700} size="xl" style={{ color: 'white' }}>
                                        {displayUser.totalFavorites || favorites?.length || 0}
                                    </Text>
                                    <Text size="xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Recetas guardadas</Text>
                                </div>
                                <div>
                                    <Text fw={700} size="xl" style={{ color: 'white' }}>
                                        {displayUser.totalRecipes || 0}
                                    </Text>
                                    <Text size="xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Recetas publicadas</Text>
                                </div>
                                <div>
                                    <Text fw={700} size="xl" style={{ color: 'white' }}>
                                        {displayUser.totalRecipesCooked || 0}
                                    </Text>
                                    <Text size="xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Recetas cocinadas</Text>
                                </div>
                            </Group>

                            {/* Botones de acción */}
                            <Group justify="center" mt="lg">
                                <Button
                                    variant="white"
                                    radius="xl"
                                    size="sm"
                                    leftSection={<Edit size={16} />}
                                    onClick={() => setEditModalOpen(true)}
                                    style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                                    }}
                                >
                                    Editar perfil
                                </Button>
                                <Button
                                    variant="white"
                                    radius="xl"
                                    size="sm"
                                    leftSection={<RefreshCw size={16} className={updatingFavorites ? 'spin' : ''} />}
                                    onClick={handleRefreshFavorites}
                                    loading={updatingFavorites}
                                    style={{
                                        background: 'rgba(255,255,255,0.15)',
                                        color: 'white',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.25)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                                    }}
                                >
                                    Actualizar
                                </Button>
                            </Group>
                        </div>
                    </Box>
                </motion.div>

                {/* Tabs de perfil */}
                <Tabs
                    defaultValue="favorites"
                    radius="md"
                    styles={{
                        tab: {
                            color: 'var(--text)',
                            backgroundColor: 'transparent',
                            '&[dataActive]': {
                                color: '#e67e22',
                                borderBottomColor: '#e67e22',
                            },
                            '&:hover': {
                                backgroundColor: 'var(--accent-bg)',
                                color: '#e67e22',
                            }
                        },
                        tabLabel: {
                            color: 'inherit',
                        }
                    }}
                >
                    <Tabs.List grow mb="lg">
                        <Tabs.Tab value="favorites" leftSection={<Heart size={16} />}>
                            Mis favoritos ({displayUser.totalFavorites || favorites?.length || 0})
                        </Tabs.Tab>
                        <Tabs.Tab value="profile" leftSection={<User size={16} />}>
                            Información personal
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="favorites">
                        {!favorites || favorites.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', padding: 60 }}
                            >
                                <Heart size={64} style={{ color: 'var(--border)', marginBottom: 20 }} />
                                <Title order={3} style={{ color: 'var(--text-h)' }}>No tienes recetas favoritas</Title>
                                <Text style={{ color: 'var(--text-secondary)' }} mt="sm" mb="lg">
                                    ¡Guarda tus recetas favoritas y aparecerán aquí!
                                </Text>
                                <Button
                                    component={Link}
                                    to="/recetas"
                                    color="orange"
                                    radius="xl"
                                    size="lg"
                                    leftSection={<BookOpen size={18} />}
                                    style={{
                                        background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                                        border: 'none',
                                    }}
                                >
                                    Explorar recetas
                                </Button>
                            </motion.div>
                        ) : (
                            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                                {favorites.map((recipe, idx) => {
                                    // Determinar el ID de la receta
                                    const recipeId = recipe.id_receta || recipe.receta_id || recipe.id
                                    const recipeData = recipe.receta || recipe

                                    return (
                                        <motion.div
                                            key={recipe.id || idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            whileHover={{ y: -5 }}
                                        >
                                            <Card
                                                withBorder
                                                padding="lg"
                                                radius="xl"
                                                style={{
                                                    background: 'var(--card-bg)',
                                                    borderColor: 'var(--border)',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Card.Section>
                                                    <div style={{ position: 'relative' }}>
                                                        <Image
                                                            src={recipeData.imagen || recipeData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop'}
                                                            height={200}
                                                            fit="cover"
                                                            alt={recipeData.nombre || recipeData.title || 'Receta'}
                                                        />
                                                        <Badge
                                                            pos="absolute"
                                                            top={12}
                                                            right={12}
                                                            color="orange"
                                                            variant="filled"
                                                        >
                                                            ⭐ {recipeData.rating || 0}
                                                        </Badge>
                                                    </div>
                                                </Card.Section>

                                                <Group justify="space-between" mt="md" mb="xs">
                                                    <Text fw={700} size="lg" lineClamp={1} style={{ color: 'var(--text-h)' }}>
                                                        {recipeData.nombre || recipeData.title || 'Receta sin título'}
                                                    </Text>
                                                    <Badge color="orange" variant="light">
                                                        {recipeData.categoria || recipeData.category || 'General'}
                                                    </Badge>
                                                </Group>

                                                <Text size="sm" lineClamp={2} style={{ color: 'var(--text-secondary)' }} mb="md">
                                                    {recipeData.descripcion || recipeData.description || 'Una deliciosa receta que no puedes perderte'}
                                                </Text>

                                                <Group gap="xs" mb="md">
                                                    <Group gap={4}>
                                                        <Clock size={14} style={{ color: 'var(--text-secondary)' }} />
                                                        <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                                            {recipeData.tiempo_total || recipeData.time || '30 min'}
                                                        </Text>
                                                    </Group>
                                                    <Group gap={4}>
                                                        <Star size={14} style={{ color: 'var(--text-secondary)' }} />
                                                        <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                                            {recipeData.rating || 0}
                                                        </Text>
                                                    </Group>
                                                </Group>

                                                <Group grow mt="auto">
                                                    <Button
                                                        component={Link}
                                                        to={`/receta/${recipeId}`}
                                                        variant="light"
                                                        color="orange"
                                                        radius="xl"
                                                        size="sm"
                                                    >
                                                        Ver receta
                                                    </Button>
                                                    <Button
                                                        variant="subtle"
                                                        color="red"
                                                        radius="xl"
                                                        size="sm"
                                                        leftSection={<Trash2 size={14} />}
                                                        onClick={() => handleRemoveFavorite(recipeId)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </Group>
                                            </Card>
                                        </motion.div>
                                    )
                                })}
                            </SimpleGrid>
                        )}
                    </Tabs.Panel>

                    <Tabs.Panel value="profile">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card withBorder padding="xl" radius="xl" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                                <Stack gap="md">
                                    <Group justify="space-between">
                                        <Title order={4} style={{ color: 'var(--text-h)' }}>Información personal</Title>
                                        <Button
                                            variant="subtle"
                                            leftSection={<Edit size={14} />}
                                            onClick={() => setEditModalOpen(true)}
                                            style={{ color: 'var(--accent)' }}
                                        >
                                            Editar
                                        </Button>
                                    </Group>

                                    <Divider style={{ borderColor: 'var(--border)' }} />

                                    <Group gap="md" wrap="nowrap">
                                        <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            <User size={18} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Nombre de usuario</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{displayUser.name}</Text>
                                        </div>
                                    </Group>

                                    <Group gap="md" wrap="nowrap">
                                        <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            <Mail size={18} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Correo electrónico</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{displayUser.email}</Text>
                                        </div>
                                    </Group>

                                    <Group gap="md" wrap="nowrap">
                                        <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            <Phone size={18} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Teléfono</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{displayUser.phone}</Text>
                                        </div>
                                    </Group>

                                    <Group gap="md" wrap="nowrap">
                                        <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            <MapPin size={18} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Ubicación</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{displayUser.location}</Text>
                                        </div>
                                    </Group>

                                    <Divider style={{ borderColor: 'var(--border)' }} />

                                    <Group justify="space-between" wrap="wrap">
                                        <Badge 
                                            size="lg" 
                                            variant="light" 
                                            style={{ 
                                                background: 'var(--accent-bg)', 
                                                color: 'var(--accent)',
                                                padding: '8px 16px',
                                            }}
                                            leftSection={<ChefHat size={14} />}
                                        >
                                            {displayUser.totalRecipes || 0} recetas publicadas
                                        </Badge>
                                        <Badge 
                                            size="lg" 
                                            variant="light" 
                                            style={{ 
                                                background: 'var(--accent-bg)', 
                                                color: 'var(--accent)',
                                                padding: '8px 16px',
                                            }}
                                            leftSection={<Award size={14} />}
                                        >
                                            {displayUser.totalFavorites || favorites?.length || 0} recetas guardadas
                                        </Badge>
                                    </Group>
                                </Stack>
                            </Card>
                        </motion.div>
                    </Tabs.Panel>
                </Tabs>
            </Stack>

            {/* Modal de edición de perfil */}
            <EditProfileModal
                opened={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                userData={displayUser}
                onUpdate={handleUserUpdate}
            />

            {/* Estilos para animación de spinner */}
            <style jsx>{`
                .spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Container>
    )
}

export default ProfilePage
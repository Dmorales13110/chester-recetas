import { Container, Box, Title, Text, SimpleGrid, Card, Image, Group, Badge, Button, Avatar, Stack, Divider, Tabs, ThemeIcon } from '@mantine/core'
import { useFavorites } from '../../context/FavoritesContext'
import { Link } from 'react-router-dom'
import { Heart, BookOpen, User, Mail, Phone, MapPin, Calendar, Settings, Star, Clock, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

const ProfilePage = () => {
    const { favorites, removeFavorite } = useFavorites()

    const user = {
        name: 'Usuario Demo',
        email: 'usuario@chesterrecetas.com',
        phone: '+34 900 123 456',
        location: 'Madrid, España',
        memberSince: '2024',
        totalRecipesCooked: 8,
    }

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
                        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                            <Avatar
                                size={120}
                                radius={120}
                                style={{
                                    margin: '0 auto 20px',
                                    border: '4px solid white',
                                    background: 'white',
                                    color: '#e67e22',
                                }}
                            >
                                <User size={60} />
                            </Avatar>
                            <Title order={1} style={{ color: 'white' }}>{user.name}</Title>
                            <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                                <Calendar size={14} style={{ display: 'inline', marginRight: 4 }} />
                                Miembro desde {user.memberSince}
                            </Text>
                            <Group justify="center" gap="xl" mt="lg">
                                <div>
                                    <Text fw={700} size="xl" style={{ color: 'white' }}>{favorites.length}</Text>
                                    <Text size="xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Recetas guardadas</Text>
                                </div>
                                <div>
                                    <Text fw={700} size="xl" style={{ color: 'white' }}>{user.totalRecipesCooked}</Text>
                                    <Text size="xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Recetas cocinadas</Text>
                                </div>
                            </Group>
                        </div>
                    </Box>
                </motion.div>

                {/* Tabs de perfil - Estilos corregidos */}
                <Tabs
                    defaultValue="favorites"
                    radius="md"
                    styles={{
                        tab: {
                            color: 'var(--text)',
                            backgroundColor: 'transparent',
                            '&[data-active]': {
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
                            Mis favoritos ({favorites.length})
                        </Tabs.Tab>
                        <Tabs.Tab value="profile" leftSection={<User size={16} />}>
                            Información personal
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="favorites">
                        {favorites.length === 0 ? (
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
                                >
                                    Explorar recetas
                                </Button>
                            </motion.div>
                        ) : (
                            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                                {favorites.map((recipe, idx) => (
                                    <motion.div
                                        key={recipe.id}
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
                                                        src={recipe.image}
                                                        height={200}
                                                        fit="cover"
                                                        alt={recipe.title}
                                                    />
                                                    <Badge
                                                        pos="absolute"
                                                        top={12}
                                                        right={12}
                                                        color="orange"
                                                        variant="filled"
                                                    >
                                                        ⭐ {recipe.rating}
                                                    </Badge>
                                                </div>
                                            </Card.Section>

                                            <Group justify="space-between" mt="md" mb="xs">
                                                <Text fw={700} size="lg" lineClamp={1} style={{ color: 'var(--text-h)' }}>
                                                    {recipe.title}
                                                </Text>
                                                <Badge color="orange" variant="light">{recipe.category}</Badge>
                                            </Group>

                                            <Text size="sm" lineClamp={2} style={{ color: 'var(--text-secondary)' }} mb="md">
                                                {recipe.description || 'Una deliciosa receta que no puedes perderte'}
                                            </Text>

                                            <Group gap="xs" mb="md">
                                                <Group gap={4}>
                                                    <Clock size={14} style={{ color: 'var(--text-secondary)' }} />
                                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{recipe.time}</Text>
                                                </Group>
                                                <Group gap={4}>
                                                    <Star size={14} style={{ color: 'var(--text-secondary)' }} />
                                                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>{recipe.rating}</Text>
                                                </Group>
                                            </Group>

                                            <Group grow mt="auto">
                                                <Button
                                                    component={Link}
                                                    to={`/receta/${recipe.id}`}
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
                                                    onClick={() => removeFavorite(recipe.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Group>
                                        </Card>
                                    </motion.div>
                                ))}
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
                                    <Group gap="md" wrap="nowrap">
                                        <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            <User size={18} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Nombre de usuario</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{user.name}</Text>
                                        </div>
                                    </Group>

                                    <Group gap="md" wrap="nowrap">
                                        <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            <Mail size={18} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Correo electrónico</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{user.email}</Text>
                                        </div>
                                    </Group>

                                    <Group gap="md" wrap="nowrap">
                                        <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            <Phone size={18} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Teléfono</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{user.phone}</Text>
                                        </div>
                                    </Group>

                                    <Group gap="md" wrap="nowrap">
                                        <ThemeIcon size="lg" radius="xl" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                                            <MapPin size={18} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Ubicación</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{user.location}</Text>
                                        </div>
                                    </Group>

                                    <Divider style={{ borderColor: 'var(--border)' }} />

                                    <Button
                                        variant="light"
                                        fullWidth
                                        radius="xl"
                                        size="lg"
                                        leftSection={<Settings size={16} />}
                                        style={{
                                            backgroundColor: 'var(--accent-bg)',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        Editar perfil
                                    </Button>
                                </Stack>
                            </Card>
                        </motion.div>
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Container>
    )
}

export default ProfilePage
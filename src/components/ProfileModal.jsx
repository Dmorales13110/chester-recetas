import { Modal, Avatar, Text, Group, Button, Stack, Divider, Badge, Tabs, ScrollArea, ThemeIcon, ActionIcon } from '@mantine/core'
import { User, Mail, Phone, MapPin, Heart, BookOpen, Settings, Calendar, Sparkles, X, Star, Clock, ChefHat } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-router-dom'

const ProfileModal = ({ opened, onClose }) => {
    const { favorites, removeFavorite } = useFavorites()
    const { isDarkMode } = useTheme()

    const gradientStart = isDarkMode ? '#f5a623' : '#e67e22'
    const gradientEnd = isDarkMode ? '#f7b53e' : '#f39c12'

    const user = {
        name: 'Usuario Demo',
        email: 'usuario@chesterrecetas.com',
        phone: '+34 900 123 456',
        location: 'Madrid, España',
        memberSince: '2024',
        totalRecipesCooked: 8,
    }

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="lg"
            radius="xl"
            centered
            withCloseButton={false}
            scrollAreaComponent={ScrollArea}
            styles={{
                root: {
                    '--modal-shadow': 'var(--shadow)',
                },
                content: {
                    background: 'var(--modal-bg)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    maxHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                },
                body: {
                    padding: 0,
                    flex: 1,
                    overflow: 'auto',
                },
            }}
        >
            {/* Header con gradiente dinámico - fijo */}
            <div style={{
                background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                padding: '32px 24px 24px 24px',
                position: 'relative',
                textAlign: 'center',
                flexShrink: 0,
            }}>
                <ActionIcon
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                        padding: 8,
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                    <X size={20} color="white" />
                </ActionIcon>
                
                <Avatar 
                    size={100} 
                    radius="xl" 
                    style={{ 
                        background: 'white', 
                        border: '4px solid white',
                        marginBottom: 16,
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                        color: gradientStart,
                    }}
                >
                    <User size={50} />
                </Avatar>
                
                <Text fw={700} size="xl" style={{ color: 'white' }}>{user.name}</Text>
                <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Miembro desde {user.memberSince}
                </Text>
                
                {/* Stats */}
                <Group justify="center" gap="xl" mt="lg">
                    <div style={{ textAlign: 'center' }}>
                        <Text fw={700} size="lg" style={{ color: 'white' }}>{favorites.length}</Text>
                        <Text size="xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Recetas guardadas</Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Text fw={700} size="lg" style={{ color: 'white' }}>{user.totalRecipesCooked}</Text>
                        <Text size="xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Recetas cocinadas</Text>
                    </div>
                </Group>
            </div>

            {/* Tabs con contenido scrolleable */}
            <Tabs defaultValue="profile" radius="md" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Tabs.List grow style={{ borderBottom: `1px solid var(--border)`, padding: '0 16px', flexShrink: 0 }}>
                    <Tabs.Tab 
                        value="profile" 
                        leftSection={<User size={16} />}
                        style={{ color: 'var(--text)', fontWeight: 500 }}
                    >
                        Perfil
                    </Tabs.Tab>
                    <Tabs.Tab 
                        value="favorites" 
                        leftSection={<Heart size={16} />}
                        style={{ color: 'var(--text)', fontWeight: 500 }}
                    >
                        Mis favoritos
                        {favorites.length > 0 && (
                            <Badge size="xs" ml={8} style={{ 
                                backgroundColor: 'var(--accent)',
                                color: 'white',
                            }}>
                                {favorites.length}
                            </Badge>
                        )}
                    </Tabs.Tab>
                </Tabs.List>

                <ScrollArea style={{ flex: 1, maxHeight: 'calc(85vh - 250px)' }} offsetScrollbars>
                    <div style={{ padding: '24px' }}>
                        <Tabs.Panel value="profile">
                            <Stack gap="md">
                                <div style={{
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 16,
                                    padding: 16,
                                }}>
                                    <Group gap="md" mb="md">
                                        <ThemeIcon size="md" radius="xl" style={{
                                            background: 'var(--accent-bg)',
                                            color: 'var(--accent)',
                                        }}>
                                            <Mail size={16} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Correo electrónico</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{user.email}</Text>
                                        </div>
                                    </Group>
                                    <Group gap="md" mb="md">
                                        <ThemeIcon size="md" radius="xl" style={{
                                            background: 'var(--accent-bg)',
                                            color: 'var(--accent)',
                                        }}>
                                            <Phone size={16} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Teléfono</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{user.phone}</Text>
                                        </div>
                                    </Group>
                                    <Group gap="md">
                                        <ThemeIcon size="md" radius="xl" style={{
                                            background: 'var(--accent-bg)',
                                            color: 'var(--accent)',
                                        }}>
                                            <MapPin size={16} />
                                        </ThemeIcon>
                                        <div>
                                            <Text size="xs" style={{ color: 'var(--text-secondary)' }}>Ubicación</Text>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{user.location}</Text>
                                        </div>
                                    </Group>
                                </div>

                                <Button 
                                    variant="light" 
                                    fullWidth 
                                    radius="xl"
                                    size="lg"
                                    leftSection={<Settings size={16} />}
                                    style={{
                                        backgroundColor: 'var(--accent-bg)',
                                        color: 'var(--accent)',
                                        transition: 'all 0.2s',
                                    }}
                                    styles={{
                                        root: {
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                backgroundColor: 'rgba(230, 126, 34, 0.2)',
                                            }
                                        }
                                    }}
                                >
                                    Editar perfil
                                </Button>
                            </Stack>
                        </Tabs.Panel>

                        <Tabs.Panel value="favorites">
                            {favorites.length === 0 ? (
                                <Stack align="center" py={60}>
                                    <Heart size={48} style={{ color: 'var(--border)' }} />
                                    <Text fw={500} style={{ color: 'var(--text-h)' }}>No tienes recetas favoritas</Text>
                                    <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                        ¡Explora nuestras recetas y guarda tus favoritas!
                                    </Text>
                                    <Button 
                                        component={Link} 
                                        to="/recetas" 
                                        variant="light" 
                                        radius="xl"
                                        onClick={onClose}
                                        leftSection={<BookOpen size={16} />}
                                        style={{
                                            backgroundColor: 'var(--accent-bg)',
                                            color: 'var(--accent)',
                                        }}
                                        styles={{
                                            root: {
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    backgroundColor: 'rgba(230, 126, 34, 0.2)',
                                                }
                                            }
                                        }}
                                    >
                                        Explorar recetas
                                    </Button>
                                </Stack>
                            ) : (
                                <Stack gap="sm">
                                    {favorites.map((recipe) => (
                                        <div
                                            key={recipe.id}
                                            style={{
                                                background: 'var(--bg-secondary)',
                                                borderRadius: 12,
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            <Group
                                                component={Link}
                                                to={`/receta/${recipe.id}`}
                                                onClick={onClose}
                                                style={{ 
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                    padding: 12,
                                                }}
                                                wrap="nowrap"
                                            >
                                                <img 
                                                    src={recipe.image} 
                                                    alt={recipe.title}
                                                    style={{ 
                                                        width: 60, 
                                                        height: 60, 
                                                        borderRadius: 12,
                                                        objectFit: 'cover'
                                                    }} 
                                                />
                                                <div style={{ flex: 1 }}>
                                                    <Text fw={600} style={{ color: 'var(--text-h)' }}>{recipe.title}</Text>
                                                    <Group gap="xs" mt={4}>
                                                        <Badge size="sm" variant="light" style={{
                                                            background: 'var(--accent-bg)',
                                                            color: 'var(--accent)',
                                                        }}>
                                                            {recipe.category}
                                                        </Badge>
                                                        <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                                            ⭐ {recipe.rating}
                                                        </Text>
                                                    </Group>
                                                </div>
                                                <Button 
                                                    variant="subtle" 
                                                    size="xs" 
                                                    color="red"
                                                    radius="xl"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        removeFavorite(recipe.id)
                                                    }}
                                                    styles={{
                                                        root: {
                                                            '&:hover': {
                                                                backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2',
                                                            }
                                                        }
                                                    }}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Group>
                                        </div>
                                    ))}
                                </Stack>
                            )}
                        </Tabs.Panel>
                    </div>
                </ScrollArea>
            </Tabs>
        </Modal>
    )
}

export default ProfileModal
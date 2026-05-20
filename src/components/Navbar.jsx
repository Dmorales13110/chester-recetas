import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Group,
    Title,
    Container,
    Button,
    Indicator,
    Avatar,
    Menu,
    Text,
    Divider,
    Burger,
    Drawer,
    Stack
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    DogIcon,
    Search,
    Heart,
    User,
    Sun,
    Moon,
    Settings,
    Home,
    BookOpen,
    FolderTree,
    Mail,
    LogOut,
    ChefHat
} from 'lucide-react'

const navLinks = [
    { path: '/', label: 'Inicio', icon: <Home size={18} /> },
    { path: '/recetas', label: 'Recetas', icon: <BookOpen size={18} /> },
    { path: '/categorias', label: 'Categorías', icon: <FolderTree size={18} /> },
    { path: '/contacto', label: 'Contacto', icon: <Mail size={18} /> },
]

export default function Navbar() {
    const [opened, { toggle, close }] = useDisclosure()
    const [isDarkMode, setIsDarkMode] = useState(false)
    const navigate = useNavigate()

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        // Aquí iría la lógica para cambiar el tema la hago despues me da polo
    }

    return (
        <>
            {/* Desktop Navbar */}
            <div style={{
                background: 'white',
                borderBottom: '1px solid #eee',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                padding: '12px 0'
            }}>
                <Container size="xl">
                    <Group justify="space-between">
                        {/* Logo */}
                        <Group gap="xs" component={Link} to="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            <div style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', padding: 8, borderRadius: 12 }}>
                                <DogIcon size={24} color="white" />
                            </div>
                            <Title order={3} style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Chester Recetas
                            </Title>
                        </Group>

                        {/* Desktop Navigation Links */}
                        <Group gap="md" visibleFrom="md">
                            {navLinks.map((link) => (
                                <Button
                                    key={link.path}
                                    component={Link}
                                    to={link.path}
                                    variant="subtle"
                                    leftSection={link.icon}
                                    radius="xl"
                                    style={{ fontWeight: 500 }}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Group>

                        {/* Desktop Actions */}
                        <Group gap="md" visibleFrom="md">
                            <Button variant="subtle" leftSection={<Search size={18} />} radius="xl">
                                Buscar
                            </Button>
                            <Indicator color="red" size={10} offset={4}>
                                <Heart size={20} cursor="pointer" />
                            </Indicator>
                            <Menu shadow="md" width={200} position="bottom-end">
                                <Menu.Target>
                                    <Avatar size="md" radius="xl" color="orange" style={{ cursor: 'pointer' }}>
                                        U
                                    </Avatar>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<User size={14} />}>Mi perfil</Menu.Item>
                                    <Menu.Item leftSection={<Heart size={14} />}>Mis favoritos</Menu.Item>
                                    <Menu.Item leftSection={<Settings size={14} />}>Configuración</Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item
                                        leftSection={isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                                        onClick={toggleDarkMode}
                                    >
                                        {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                                    </Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item leftSection={<LogOut size={14} />} color="red">
                                        Cerrar sesión
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>

                        {/* Mobile Menu Button */}
                        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
                    </Group>
                </Container>
            </div>

            {/* Mobile Drawer */}
            <Drawer
                opened={opened}
                onClose={close}
                title="Menú"
                position="right"
                size="280px"
                padding="md"
            >
                <Stack gap="md">
                    {/* User Profile Section */}
                    <Group gap="md" p="sm" style={{ background: '#f8f9fa', borderRadius: 12 }}>
                        <Avatar size="lg" radius="xl" color="orange">U</Avatar>
                        <div>
                            <Text fw={600}>Usuario</Text>
                            <Text size="xs" c="dimmed">usuario@example.com</Text>
                        </div>
                    </Group>

                    <Divider />

                    {/* Navigation Links */}
                    {navLinks.map((link) => (
                        <Button
                            key={link.path}
                            component={Link}
                            to={link.path}
                            variant="subtle"
                            leftSection={link.icon}
                            justify="flex-start"
                            fullWidth
                            onClick={close}
                        >
                            {link.label}
                        </Button>
                    ))}

                    <Divider />

                    {/* Actions */}
                    <Button variant="subtle" leftSection={<Heart size={18} />} justify="flex-start" fullWidth>
                        Favoritos
                    </Button>
                    <Button variant="subtle" leftSection={<Settings size={18} />} justify="flex-start" fullWidth>
                        Configuración
                    </Button>
                    <Button
                        variant="subtle"
                        leftSection={isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        justify="flex-start"
                        fullWidth
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                    </Button>

                    <Divider />

                    <Button variant="subtle" color="red" leftSection={<LogOut size={18} />} justify="flex-start" fullWidth>
                        Cerrar sesión
                    </Button>
                </Stack>
            </Drawer>
        </>
    )
}

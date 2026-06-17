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
    Stack,
    ActionIcon,
    Tooltip,
    Switch
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    DogIcon,
    Search,
    Heart,
    User,
    Settings,
    Home,
    BookOpen,
    FolderTree,
    Mail,
    LogOut,
    Sun,
    Moon,
    Info
} from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useTheme } from '../context/ThemeContext'
import SettingsModal from './SettingsModal'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const navLinks = [
    { path: '/', label: 'Inicio', icon: <Home size={18} /> },
    { path: '/recetas', label: 'Recetas', icon: <BookOpen size={18} /> },
    { path: '/categorias', label: 'Categorías', icon: <FolderTree size={18} /> },
    { path: '/sobre-nosotros', label: 'Sobre Nosotros', icon: <Info size={18} /> },
    { path: '/contacto', label: 'Contacto', icon: <Mail size={18} /> },
]

function Navbar() {
    const [opened, { toggle, close }] = useDisclosure()
    const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure()
    const { favorites } = useFavorites()
    const { isDarkMode, toggleTheme } = useTheme()
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
        close()
    }

    // Colores según el tema
    const gradientStart = isDarkMode ? '#f5a623' : '#e67e22'
    const gradientEnd = isDarkMode ? '#f7b53e' : '#f39c12'

    const lightModeColors = {
        navBg: '#ffffff',
        navBorder: '#eef2f6',
        text: '#334155',
        textHover: '#e67e22',
        iconColor: '#64748b',
        iconHoverBg: 'rgba(230, 126, 34, 0.08)',
        avatarBg: 'rgba(230, 126, 34, 0.08)',
        avatarColor: '#e67e22',
        menuHoverBg: '#fef3c7',
        menuHoverColor: '#e67e22',
        dropdownBg: '#ffffff',
        dropdownBorder: '#eef2f6',
    }

    const darkModeColors = {
        navBg: '#0f172a',
        navBorder: '#1e293b',
        text: '#cbd5e1',
        textHover: '#f5a623',
        iconColor: '#94a3b8',
        iconHoverBg: 'rgba(245, 166, 35, 0.15)',
        avatarBg: 'rgba(245, 166, 35, 0.15)',
        avatarColor: '#f5a623',
        menuHoverBg: 'rgba(245, 166, 35, 0.15)',
        menuHoverColor: '#f5a623',
        dropdownBg: '#1e293b',
        dropdownBorder: '#334155',
    }

    const colors = isDarkMode ? darkModeColors : lightModeColors

    return (
        <>
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                style={{
                    background: colors.navBg,
                    borderBottom: `1px solid ${colors.navBorder}`,
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    padding: '12px 0',
                }}
            >
                <Container size="xl">
                    <Group justify="space-between">
                        {/* Logo */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Group gap="xs" component={Link} to="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                <motion.div
                                    animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    style={{
                                        background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                                        padding: 8,
                                        borderRadius: 12
                                    }}
                                >
                                    <DogIcon size={24} color="white" />
                                </motion.div>
                                <Text
                                    component="span"
                                    variant="gradient"
                                    gradient={{ from: gradientStart, to: gradientEnd, deg: 135 }}
                                    fw={700}
                                    size="xl"
                                    style={{ display: 'inline-block' }}
                                    key={isDarkMode ? 'dark' : 'light'}
                                >
                                    Chester Recetas
                                </Text>
                            </Group>
                        </motion.div>

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
                                    style={{
                                        fontWeight: 500,
                                        color: colors.text,
                                        transition: 'all 0.2s ease',
                                    }}
                                    styles={{
                                        root: {
                                            '&:hover': {
                                                backgroundColor: colors.iconHoverBg,
                                                color: colors.textHover,
                                                transform: 'translateY(-2px)',
                                            }
                                        }
                                    }}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Group>

                        {/* Desktop Actions */}
                        <Group gap="md" visibleFrom="md">
                            <Tooltip label="Buscar recetas" position="bottom">
                                <ActionIcon
                                    variant="subtle"
                                    size="lg"
                                    onClick={() => navigate('/recetas')}
                                    radius="xl"
                                    style={{ color: colors.iconColor, transition: 'all 0.2s' }}
                                    styles={{
                                        root: {
                                            '&:hover': {
                                                backgroundColor: colors.iconHoverBg,
                                                color: colors.textHover,
                                                transform: 'translateY(-2px)',
                                            }
                                        }
                                    }}
                                >
                                    <Search size={20} />
                                </ActionIcon>
                            </Tooltip>

                            <Tooltip label="Mis favoritos" position="bottom">
                                <Indicator
                                    color={isDarkMode ? '#f5a623' : '#e67e22'}
                                    size={10}
                                    offset={4}
                                    disabled={favorites.length === 0}
                                >
                                    <ActionIcon
                                        variant="subtle"
                                        size="lg"
                                        onClick={() => navigate('/perfil')}
                                        radius="xl"
                                        style={{ color: colors.iconColor, transition: 'all 0.2s' }}
                                        styles={{
                                            root: {
                                                '&:hover': {
                                                    backgroundColor: colors.iconHoverBg,
                                                    color: colors.textHover,
                                                    transform: 'translateY(-2px)',
                                                }
                                            }
                                        }}
                                    >
                                        <Heart size={20} />
                                    </ActionIcon>
                                </Indicator>
                            </Tooltip>

                            <Tooltip label={isDarkMode ? "Modo claro" : "Modo oscuro"} position="bottom">
                                <ActionIcon
                                    variant="subtle"
                                    size="lg"
                                    onClick={toggleTheme}
                                    radius="xl"
                                    style={{
                                        color: colors.iconColor,
                                        transition: 'all 0.2s',
                                        background: 'transparent',
                                    }}
                                    styles={{
                                        root: {
                                            '&:hover': {
                                                backgroundColor: colors.iconHoverBg,
                                                color: colors.textHover,
                                                transform: 'translateY(-2px)',
                                            }
                                        }
                                    }}
                                >
                                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </ActionIcon>
                            </Tooltip>

                            {/* Menú de usuario */}
                            <Menu shadow="md" width={220} position="bottom-end" offset={5}>
                                <Menu.Target>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Avatar
                                            size="md"
                                            radius="xl"
                                            style={{
                                                cursor: 'pointer',
                                                background: colors.avatarBg,
                                                color: colors.avatarColor,
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            {user?.name?.charAt(0) || <User size={18} />}
                                        </Avatar>
                                    </motion.div>
                                </Menu.Target>
                                <Menu.Dropdown style={{
                                    background: colors.dropdownBg,
                                    borderColor: colors.dropdownBorder,
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                }}>
                                    <Menu.Label style={{ color: colors.text }}>
                                        {user?.name || 'Usuario'}
                                    </Menu.Label>
                                    <Menu.Divider style={{ borderColor: colors.dropdownBorder }} />
                                    <Menu.Item
                                        leftSection={<User size={14} />}
                                        onClick={() => navigate('/perfil')}
                                        style={{
                                            color: colors.text,
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = colors.menuHoverBg
                                            e.currentTarget.style.color = colors.menuHoverColor
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                            e.currentTarget.style.color = colors.text
                                        }}
                                    >
                                        Mi perfil
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={<Heart size={14} />}
                                        onClick={() => navigate('/perfil')}
                                        style={{
                                            color: colors.text,
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = colors.menuHoverBg
                                            e.currentTarget.style.color = colors.menuHoverColor
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                            e.currentTarget.style.color = colors.text
                                        }}
                                    >
                                        Mis favoritos
                                        {favorites.length > 0 && (
                                            <Text component="span" size="xs" ml={4} style={{ color: colors.menuHoverColor }}>
                                                ({favorites.length})
                                            </Text>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                                        onClick={toggleTheme}
                                        style={{
                                            color: colors.text,
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = colors.menuHoverBg
                                            e.currentTarget.style.color = colors.menuHoverColor
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                            e.currentTarget.style.color = colors.text
                                        }}
                                    >
                                        {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={<Settings size={14} />}
                                        onClick={openSettings}
                                        style={{
                                            color: colors.text,
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = colors.menuHoverBg
                                            e.currentTarget.style.color = colors.menuHoverColor
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                            e.currentTarget.style.color = colors.text
                                        }}
                                    >
                                        Configuración
                                    </Menu.Item>
                                    <Divider style={{ borderColor: colors.dropdownBorder }} />
                                    <Menu.Item
                                        leftSection={<LogOut size={14} />}
                                        onClick={handleLogout}
                                        style={{
                                            color: '#dc2626',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#fee2e2'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                        }}
                                    >
                                        Cerrar sesión
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>

                        {/* Mobile Menu Button */}
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="md"
                            size="sm"
                            color={colors.text}
                        />
                    </Group>
                </Container>
            </motion.div>

            {/* Mobile Drawer */}
            <Drawer
                opened={opened}
                onClose={close}
                title="Menú"
                position="right"
                size="280px"
                padding="md"
                styles={{
                    header: {
                        background: colors.navBg,
                        borderBottom: `1px solid ${colors.navBorder}`
                    },
                    title: {
                        color: isDarkMode ? '#f1f5f9' : '#1a1a2e',
                        fontWeight: 600,
                    },
                    body: { background: colors.navBg },
                    content: { background: colors.navBg }
                }}
            >
                <Stack gap="md">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Group gap="md" p="sm" style={{
                            background: isDarkMode ? '#1e293b' : '#fef3c7',
                            borderRadius: 12
                        }}>
                            <Avatar size="lg" radius="xl" style={{ background: colors.avatarBg, color: colors.avatarColor }}>
                                {user?.name?.charAt(0) || <User size={24} />}
                            </Avatar>
                            <div>
                                <Text fw={600} style={{ color: isDarkMode ? '#f1f5f9' : '#1a1a2e' }}>
                                    {user?.name || 'Usuario Demo'}
                                </Text>
                                <Text size="xs" style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                                    {user?.email || 'usuario@chester.com'}
                                </Text>
                            </div>
                        </Group>
                    </motion.div>

                    <Divider style={{ borderColor: colors.navBorder }} />

                    <Button
                        variant="subtle"
                        leftSection={<Search size={18} />}
                        justify="flex-start"
                        fullWidth
                        onClick={() => {
                            close()
                            navigate('/recetas')
                        }}
                        style={{ color: colors.text }}
                        styles={{
                            root: {
                                '&:hover': {
                                    backgroundColor: colors.iconHoverBg,
                                    color: colors.textHover,
                                }
                            }
                        }}
                    >
                        Buscar recetas
                    </Button>

                    {navLinks.map((link, idx) => (
                        <motion.div
                            key={link.path}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Button
                                component={Link}
                                to={link.path}
                                variant="subtle"
                                leftSection={link.icon}
                                justify="flex-start"
                                fullWidth
                                onClick={close}
                                style={{ color: colors.text }}
                                styles={{
                                    root: {
                                        '&:hover': {
                                            backgroundColor: colors.iconHoverBg,
                                            color: colors.textHover,
                                        }
                                    }
                                }}
                            >
                                {link.label}
                            </Button>
                        </motion.div>
                    ))}

                    <Divider style={{ borderColor: colors.navBorder }} />

                    <Button
                        variant="subtle"
                        leftSection={<Heart size={18} />}
                        justify="flex-start"
                        fullWidth
                        onClick={() => {
                            close()
                            navigate('/perfil')
                        }}
                        style={{ color: colors.text }}
                        styles={{
                            root: {
                                '&:hover': {
                                    backgroundColor: colors.iconHoverBg,
                                    color: colors.textHover,
                                }
                            }
                        }}
                    >
                        Mis favoritos ({favorites.length})
                    </Button>

                    <Button
                        variant="subtle"
                        leftSection={<User size={18} />}
                        justify="flex-start"
                        fullWidth
                        onClick={() => {
                            close()
                            navigate('/perfil')
                        }}
                        style={{ color: colors.text }}
                        styles={{
                            root: {
                                '&:hover': {
                                    backgroundColor: colors.iconHoverBg,
                                    color: colors.textHover,
                                }
                            }
                        }}
                    >
                        Mi perfil
                    </Button>

                    <Button
                        variant="subtle"
                        leftSection={isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        justify="flex-start"
                        fullWidth
                        onClick={toggleTheme}
                        style={{ color: colors.text }}
                        styles={{
                            root: {
                                '&:hover': {
                                    backgroundColor: colors.iconHoverBg,
                                    color: colors.textHover,
                                }
                            }
                        }}
                    >
                        {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                    </Button>

                    <Button
                        variant="subtle"
                        leftSection={<Settings size={18} />}
                        justify="flex-start"
                        fullWidth
                        onClick={openSettings}
                        style={{ color: colors.text }}
                        styles={{
                            root: {
                                '&:hover': {
                                    backgroundColor: colors.iconHoverBg,
                                    color: colors.textHover,
                                }
                            }
                        }}
                    >
                        Configuración
                    </Button>

                    <Divider style={{ borderColor: colors.navBorder }} />

                    <Button
                        variant="subtle"
                        color="red"
                        leftSection={<LogOut size={18} />}
                        justify="flex-start"
                        fullWidth
                        onClick={handleLogout}
                        styles={{
                            root: {
                                '&:hover': {
                                    backgroundColor: '#fee2e2',
                                    color: '#dc2626',
                                }
                            }
                        }}
                    >
                        Cerrar sesión
                    </Button>
                </Stack>
            </Drawer>

            {/* Modales */}
            <SettingsModal opened={settingsOpened} onClose={closeSettings} />
        </>
    )
}

export default Navbar
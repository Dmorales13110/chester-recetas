import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
    Stack,
    ThemeIcon,
    Text,
    Box,
    ScrollArea,
    Divider,
    Tooltip,
    UnstyledButton,
    Group,
    Paper,
    Badge,
} from '@mantine/core'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    BookOpen,
    Users,
    MessageCircle,
    Settings,
    BarChart3,
    Tags,
    Calendar,
    Bell,
    LogOut,
    PlusCircle,
    DogIcon,
    ChevronRight,
    CheckCircle,
    AlertCircle,
    FileText,
    Image,
    Star,
} from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

// Definición de módulos con sus submenús
const navItems = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/admin',
        hasSubmenu: false,
    },
    {
        label: 'Recetas',
        icon: BookOpen,
        href: '/admin/recipes',
        hasSubmenu: true,
        subItems: [
            { label: 'Todas las recetas', icon: BookOpen, href: '/admin/recipes' },
            { label: 'Nueva receta', icon: PlusCircle, href: '/admin/recipes/new' },
            { label: 'Categorías', icon: Tags, href: '/admin/categories' },
        ]
    },
    {
        label: 'Usuarios',
        icon: Users,
        href: '/admin/users',
        hasSubmenu: true,
        subItems: [
            { label: 'Listado de usuarios', icon: Users, href: '/admin/users' },
            { label: 'Roles y permisos', icon: Settings, href: '/admin/users/roles' },
        ]
    },
    {
        label: 'Comentarios',
        icon: MessageCircle,
        href: '/admin/comments',
        hasSubmenu: false,
    },
    {
        label: 'Categorías',
        icon: Tags,
        href: '/admin/categories',
        hasSubmenu: false,
    },
    {
        label: 'Estadísticas',
        icon: BarChart3,
        href: '/admin/stats',
        hasSubmenu: false,
    },
    {
        label: 'Notificaciones',
        icon: Bell,
        href: '/admin/notifications',
        hasSubmenu: false,
    },
    {
        label: 'Configuración',
        icon: Settings,
        href: '/admin/settings',
        hasSubmenu: false,
    },
]

// Componente para el menú flotante de subitems
const FloatingSubmenu = ({
    item,
    isOpen,
    onClose,
    onNavigate,
    anchorRef,
    activePath
}) => {
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const submenuRef = useRef(null)

    useEffect(() => {
        if (isOpen && anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const estimatedHeight = Math.min((item.subItems?.length || 0) * 45 + 80, 400)
            const spaceBelow = viewportHeight - rect.bottom
            const spaceAbove = rect.top

            let topPosition = rect.top
            if (spaceBelow < estimatedHeight && spaceAbove > spaceBelow) {
                topPosition = rect.bottom - estimatedHeight
            }

            setPosition({
                top: topPosition,
                left: rect.right + 8,
            })
        }
    }, [isOpen, anchorRef, item.subItems?.length])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && anchorRef.current && !anchorRef.current.contains(e.target)) {
                if (submenuRef.current && !submenuRef.current.contains(e.target)) {
                    onClose()
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, onClose, anchorRef])

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) onClose()
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={submenuRef}
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                        position: 'fixed',
                        top: position.top,
                        left: position.left,
                        zIndex: 300,
                    }}
                >
                    <Paper
                        shadow="lg"
                        radius="md"
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            border: '1px solid var(--border)',
                            width: 220,
                            maxHeight: 420,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box p="xs" style={{ flexShrink: 0, borderBottom: '1px solid var(--border)' }}>
                            <Text size="xs" fw={600} style={{ color: 'var(--text-secondary)' }} px="sm" py={4} tt="uppercase">
                                {item.label}
                            </Text>
                        </Box>
                        <ScrollArea style={{ flex: 1, maxHeight: 360 }}>
                            <Stack gap={4} p="xs">
                                {item.subItems?.map((subItem) => {
                                    const isActive = activePath === subItem.href
                                    return (
                                        <UnstyledButton
                                            key={subItem.href}
                                            onClick={() => {
                                                onNavigate(subItem.href)
                                                onClose()
                                            }}
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                borderRadius: '6px',
                                                backgroundColor: isActive ? 'var(--accent-bg)' : 'transparent',
                                                color: isActive ? 'var(--accent)' : 'var(--text)',
                                                transition: 'all 0.15s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                cursor: 'pointer',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = isActive ? 'var(--accent-bg)' : 'var(--bg-secondary)'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = isActive ? 'var(--accent-bg)' : 'transparent'
                                            }}
                                        >
                                            <ThemeIcon
                                                size="sm"
                                                variant="light"
                                                style={{
                                                    background: isActive ? 'var(--accent-bg)' : 'var(--bg-secondary)',
                                                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                                                    minWidth: 24,
                                                    height: 24,
                                                    borderRadius: 6,
                                                }}
                                            >
                                                <subItem.icon size={14} />
                                            </ThemeIcon>
                                            <Text size="xs" fw={500}>
                                                {subItem.label}
                                            </Text>
                                            {isActive && (
                                                <Badge size="xs" color="orange" variant="light" ml="auto">
                                                    Activo
                                                </Badge>
                                            )}
                                        </UnstyledButton>
                                    )
                                })}
                            </Stack>
                        </ScrollArea>
                    </Paper>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Componente para cada item del menú
const MenuItem = ({ item, isActive, onClick }) => {
    const Icon = item.icon
    const buttonRef = useRef(null)

    return (
        <div ref={buttonRef}>
            <Tooltip
                label={item.label}
                position="right"
                offset={20}
                withArrow
                openDelay={300}
            >
                <UnstyledButton
                    onClick={onClick}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: isActive ? 'var(--accent-bg)' : 'transparent',
                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isActive ? 'var(--accent-bg)' : 'var(--bg-secondary)'
                        e.currentTarget.style.color = isActive ? 'var(--accent)' : 'var(--text)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isActive ? 'var(--accent-bg)' : 'transparent'
                        e.currentTarget.style.color = isActive ? 'var(--accent)' : 'var(--text-secondary)'
                    }}
                >
                    <ThemeIcon
                        size="md"
                        variant="light"
                        style={{
                            background: isActive ? 'var(--accent-bg)' : 'var(--bg-secondary)',
                            color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                            minWidth: 32,
                            transition: 'all 0.15s ease',
                        }}
                    >
                        <Icon size={20} />
                    </ThemeIcon>
                    {isActive && (
                        <div style={{
                            position: 'absolute',
                            right: 8,
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'var(--accent)',
                        }} />
                    )}
                </UnstyledButton>
            </Tooltip>
        </div>
    )
}

// Componente para items con submenú
const MenuItemWithSubmenu = ({ item, activePath, onNavigate }) => {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
    const buttonRef = useRef(null)
    const Icon = item.icon
    const isActive = activePath === item.href || item.subItems?.some(sub => sub.href === activePath)

    const handleClick = () => {
        setIsSubmenuOpen(!isSubmenuOpen)
    }

    useEffect(() => {
        setIsSubmenuOpen(false)
    }, [activePath])

    return (
        <>
            <div ref={buttonRef}>
                <Tooltip
                    label={item.label}
                    position="right"
                    offset={20}
                    withArrow
                    openDelay={300}
                >
                    <UnstyledButton
                        onClick={handleClick}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '12px',
                            backgroundColor: isActive ? 'var(--accent-bg)' : 'transparent',
                            color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                            transition: 'all 0.15s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isActive ? 'var(--accent-bg)' : 'var(--bg-secondary)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isActive ? 'var(--accent-bg)' : 'transparent'
                        }}
                    >
                        <ThemeIcon
                            size="md"
                            variant="light"
                            style={{
                                background: isActive ? 'var(--accent-bg)' : 'var(--bg-secondary)',
                                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                                minWidth: 32,
                                transition: 'all 0.15s ease',
                            }}
                        >
                            <Icon size={20} />
                        </ThemeIcon>
                        <motion.div
                            animate={{ rotate: isSubmenuOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ position: 'absolute', right: 8 }}
                        >
                            <ChevronRight size={12} style={{ color: 'var(--text-secondary)' }} />
                        </motion.div>
                    </UnstyledButton>
                </Tooltip>
            </div>

            <FloatingSubmenu
                item={item}
                isOpen={isSubmenuOpen}
                onClose={() => setIsSubmenuOpen(false)}
                onNavigate={onNavigate}
                anchorRef={buttonRef}
                activePath={activePath}
            />
        </>
    )
}

export const AdminSidebar = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [activePath, setActivePath] = useState(location.pathname)

    useEffect(() => {
        setActivePath(location.pathname)
    }, [location.pathname])

    const handleNavigate = (path) => {
        navigate(path)
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <motion.div
            initial={{ x: -80 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                width: 80,
                height: '100vh',
                backgroundColor: 'var(--card-bg)',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 200,
                borderRight: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <ScrollArea style={{ flex: 1 }}>
                <Stack gap="xs" p="md">
                    {/* Logo */}
                    <Box mb="xl" pt="md" pb="md">
                        <Group justify="center">
                            <Tooltip
                                label="Chester Admin"
                                position="right"
                                offset={20}
                                withArrow
                                openDelay={300}
                            >
                                <UnstyledButton
                                    onClick={() => handleNavigate('/admin')}
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)'
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(230, 126, 34, 0.3)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                >
                                    <DogIcon size={28} color="white" />
                                </UnstyledButton>
                            </Tooltip>
                        </Group>
                    </Box>

                    <Divider style={{ borderColor: 'var(--border)' }} />

                    {/* Navigation Items */}
                    <Stack gap="xs" mt="md">
                        {navItems.map((item) => (
                            <React.Fragment key={item.label}>
                                {item.hasSubmenu ? (
                                    <MenuItemWithSubmenu
                                        item={item}
                                        activePath={activePath}
                                        onNavigate={handleNavigate}
                                    />
                                ) : (
                                    <MenuItem
                                        item={item}
                                        isActive={activePath === item.href}
                                        onClick={() => handleNavigate(item.href)}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </Stack>
                </Stack>
            </ScrollArea>

            {/* Footer - Logout */}
            <Box p="md" style={{ borderTop: '1px solid var(--border)' }}>
                <Tooltip
                    label="Cerrar sesión"
                    position="right"
                    offset={20}
                    withArrow
                    openDelay={300}
                >
                    <UnstyledButton
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '12px',
                            color: 'var(--text-secondary)',
                            transition: 'all 0.15s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                            e.currentTarget.style.color = '#ef4444'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = 'var(--text-secondary)'
                        }}
                    >
                        <ThemeIcon
                            size="md"
                            variant="light"
                            style={{
                                background: 'var(--bg-secondary)',
                                color: '#ef4444',
                                minWidth: 32,
                                transition: 'all 0.15s ease',
                            }}
                        >
                            <LogOut size={20} />
                        </ThemeIcon>
                    </UnstyledButton>
                </Tooltip>
            </Box>
        </motion.div>
    )
}
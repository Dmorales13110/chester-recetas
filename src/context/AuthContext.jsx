import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

// Usuarios de prueba (mock)
const MOCK_USERS = [
    { 
        id: 1, 
        name: 'Administrador', 
        email: 'admin@chester.com', 
        password: 'admin123', 
        role: 'admin',
        avatar: null,
        createdAt: '2024-01-01'
    },
    { 
        id: 2, 
        name: 'Usuario Demo', 
        email: 'usuario@chester.com', 
        password: 'user123', 
        role: 'user',
        avatar: null,
        createdAt: '2024-06-01'
    },
    { 
        id: 3, 
        name: 'Chef Master', 
        email: 'chef@chester.com', 
        password: 'chef123', 
        role: 'chef',
        avatar: null,
        createdAt: '2024-03-15'
    },
]

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Verificar sesión al cargar
    useEffect(() => {
        const checkAuth = () => {
            const savedUser = localStorage.getItem('chester-user')
            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser)
                    setUser(parsedUser)
                } catch {
                    localStorage.removeItem('chester-user')
                }
            }
            setIsLoading(false)
        }
        checkAuth()
    }, [])

    // Login
    const login = (email, password) => {
        // Buscar usuario en mock
        const foundUser = MOCK_USERS.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        )

        if (foundUser) {
            // Crear objeto de usuario sin la contraseña
            const userData = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
                avatar: foundUser.avatar,
                createdAt: foundUser.createdAt
            }
            
            setUser(userData)
            localStorage.setItem('chester-user', JSON.stringify(userData))
            
            // Guardar token mock
            const token = btoa(`${foundUser.id}:${Date.now()}`)
            localStorage.setItem('chester-token', token)
            
            return { 
                success: true, 
                user: userData,
                redirect: userData.role === 'admin' ? '/admin' : '/'
            }
        }
        
        return { 
            success: false, 
            error: 'Credenciales incorrectas. Verifica tu email y contraseña.' 
        }
    }

    // Registro
    const register = (name, email, password, role = 'user') => {
        // Verificar si el email ya existe
        if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { 
                success: false, 
                error: 'Este correo electrónico ya está registrado.' 
            }
        }

        // Crear nuevo usuario
        const newUser = {
            id: MOCK_USERS.length + 1,
            name,
            email,
            password,
            role,
            avatar: null,
            createdAt: new Date().toISOString().split('T')[0]
        }

        MOCK_USERS.push(newUser)
        
        return { 
            success: true, 
            message: '¡Cuenta creada exitosamente! Por favor inicia sesión.' 
        }
    }

    // Logout
    const logout = () => {
        setUser(null)
        localStorage.removeItem('chester-user')
        localStorage.removeItem('chester-token')
        sessionStorage.clear()
    }

    // Verificar si está autenticado
    const isAuthenticated = !!user

    // Verificar roles
    const isAdmin = user?.role === 'admin'
    const isChef = user?.role === 'chef'
    const isUser = user?.role === 'user'

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                isLoading, 
                login, 
                register,
                logout, 
                isAuthenticated,
                isAdmin,
                isChef,
                isUser,
                role: user?.role || null
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
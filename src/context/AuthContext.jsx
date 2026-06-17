import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

// Usuarios de prueba
const USERS = [
    {
        id: 1,
        name: 'Administrador',
        email: 'admin@chester.com',
        password: 'admin123',
        role: 'admin',
        avatar: null
    },
    {
        id: 2,
        name: 'Usuario Demo',
        email: 'usuario@chester.com',
        password: 'user123',
        role: 'user',
        avatar: null
    },
    {
        id: 3,
        name: 'Chef Master',
        email: 'chef@chester.com',
        password: 'chef123',
        role: 'chef',
        avatar: null
    },
]

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const savedUser = localStorage.getItem('chester-user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const login = (email, password) => {
        // Buscar usuario por email y contraseña
        const foundUser = USERS.find(
            u => u.email === email && u.password === password
        )

        if (foundUser) {
            const userData = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
                avatar: foundUser.avatar,
            }
            setUser(userData)
            localStorage.setItem('chester-user', JSON.stringify(userData))
            return { success: true, user: userData }
        }

        return {
            success: false,
            error: 'Credenciales incorrectas. Verifica tu email y contraseña.'
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('chester-user')
        localStorage.removeItem('chester-token')
        sessionStorage.clear()
    }

    const isAdmin = user?.role === 'admin'
    const isChef = user?.role === 'chef'
    const isUser = user?.role === 'user'

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
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
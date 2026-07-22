import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Verificar sesión al cargar
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken')
            if (token) {
                try {
                    const response = await authService.getProfile()
                    setUser({
                        id: response.id,
                        name: response.nombre,
                        email: response.email,
                        role: response.role === 1 ? 'admin' : 'user',
                        avatar: response.foto_perfil,
                        telefono: response.telefono,
                        ubicacion: response.ubicacion,
                        createdAt: response.created_at
                    })
                } catch (error) {
                    console.error('Error al verificar autenticación:', error)
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    setUser(null)
                }
            }
            setIsLoading(false)
        }
        checkAuth()
    }, [])

    const login = async (email, password) => {
        try {
            const response = await authService.login({ email, password })
            
            // Guardar tokens
            localStorage.setItem('accessToken', response.access_token)
            localStorage.setItem('refreshToken', response.refresh_token)
            
            // Crear objeto de usuario
            const userData = {
                id: response.user?.id,
                name: response.user?.nombre,
                email: response.user?.email,
                role: response.user?.role === 1 ? 'admin' : 'user',
                avatar: response.user?.foto_perfil,
                telefono: response.user?.telefono,
                ubicacion: response.user?.ubicacion,
                createdAt: response.user?.created_at
            }
            
            setUser(userData)
            localStorage.setItem('chester-user', JSON.stringify(userData))
            
            return { 
                success: true, 
                user: userData,
                redirect: userData.role === 'admin' ? '/admin' : '/'
            }
        } catch (error) {
            console.error('Error en login:', error)
            
            // Limpiar tokens en caso de error
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            
            let errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.'
            
            if (error.responseBody) {
                if (error.responseBody.detail) {
                    errorMessage = error.responseBody.detail
                } else if (error.responseBody.message) {
                    errorMessage = error.responseBody.message
                }
            }
            
            return { 
                success: false, 
                error: errorMessage
            }
        }
    }

    // Registro adaptado al backend
    const register = async (name, email, password, telefono = '', ubicacion = '') => {
        try {
            const userData = {
                nombre: name,
                email: email,
                password: password,
                telefono: telefono || '',
                ubicacion: ubicacion || '',
                role: 0
            }
            
            const response = await authService.register(userData)
            
            return { 
                success: true, 
                message: '¡Cuenta creada exitosamente! Por favor inicia sesión.',
                data: response
            }
        } catch (error) {
            console.error('Error en registro:', error)
            
            let errorMessage = 'Error al crear la cuenta. Intenta nuevamente.'
            
            if (error.responseBody) {
                if (error.responseBody.detail) {
                    errorMessage = error.responseBody.detail
                } else if (error.responseBody.message) {
                    errorMessage = error.responseBody.message
                }
            }
            
            return { 
                success: false, 
                error: errorMessage
            }
        }
    }

    // Recuperar contraseña
    const forgotPassword = async (email) => {
        try {
            await authService.forgotPassword(email)
            return { 
                success: true, 
                message: 'Se ha enviado un correo con las instrucciones para recuperar tu contraseña.'
            }
        } catch (error) {
            console.error('Error al recuperar contraseña:', error)
            
            let errorMessage = 'Error al enviar el correo de recuperación. Intenta nuevamente.'
            
            if (error.responseBody) {
                if (error.responseBody.detail) {
                    errorMessage = error.responseBody.detail
                } else if (error.responseBody.message) {
                    errorMessage = error.responseBody.message
                }
            }
            
            return { 
                success: false, 
                error: errorMessage
            }
        }
    }

    // Logout
    const logout = () => {
        setUser(null)
        localStorage.removeItem('chester-user')
        localStorage.removeItem('chester-token')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        sessionStorage.clear()
    }

    const isAuthenticated = !!user
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
                forgotPassword,
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
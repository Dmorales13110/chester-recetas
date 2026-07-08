import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children, allowedRoles = null }) => {
    const { user, isLoading, isAuthenticated } = useAuth()

    if (isLoading) {
        return null // o un spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Si se especifican roles, verificar que el usuario tenga uno permitido
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />
    }

    return children
}

// Versión para rutas que solo admins
export const AdminRoute = ({ children }) => {
    const { user, isLoading, isAdmin } = useAuth()

    if (isLoading) return null

    if (!user || !isAdmin) {
        return <Navigate to="/login" replace />
    }

    return children
}

// Versión para redirigir si ya está autenticado (para login)
export const PublicRoute = ({ children }) => {
    const { user, isLoading, isAuthenticated } = useAuth()

    if (isLoading) return null

    if (isAuthenticated) {
        // Si ya está autenticado, redirigir según rol
        if (user.role === 'admin') {
            return <Navigate to="/admin" replace />
        }
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute;
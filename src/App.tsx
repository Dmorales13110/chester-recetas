import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//@ts-ignore
import { AuthProvider, useAuth } from './context/AuthContext'
//@ts-ignore
import Navbar from './components/Navbar'
//@ts-ignore
import Footer from './components/Footer'
//@ts-ignore
import HomePage from './pages/home/index'
//@ts-ignore
import RecipesPage from './pages/recipes'
//@ts-ignore
import CategoriesPage from './pages/categories'
//@ts-ignore
import ContactPage from './pages/contact'
//@ts-ignore
import RecipePage from './pages/recipe/index'
//@ts-ignore
import ProfilePage from './pages/profile/index'
//@ts-ignore
import LoginPage from './pages/auth/index'
//@ts-ignore
import AdminPage from './pages/admin/index'
//@ts-ignore
import AdminLayout from './components/AdminLayout'
//@ts-ignore
import { useTheme } from './context/ThemeContext'
//@ts-ignore
import AboutPage from './pages/about/index'

// Componente para rutas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAdmin, isLoading } = useAuth()
    if (isLoading) return null
    if (!isAdmin) return <Navigate to="/login" replace />
    return <>{children}</>
}

function AppRoutes() {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
            <Route path="/recetas" element={<><Navbar /><RecipesPage /><Footer /></>} />
            <Route path="/categorias" element={<><Navbar /><CategoriesPage /><Footer /></>} />
            <Route path="/contacto" element={<><Navbar /><ContactPage /><Footer /></>} />
            <Route path="/receta/:id" element={<><Navbar /><RecipePage /><Footer /></>} />
            <Route path="/perfil" element={<><Navbar /><ProfilePage /><Footer /></>} />
            <Route path="/sobre-nosotros" element={<><Navbar /><AboutPage /><Footer /></>} />

            {/* Auth - Login, Registro, Recuperar contraseña */}
            <Route path="/login" element={<LoginPage />} />

            {/* Panel Administrativo - Protegido para admin */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminPage />} />
                <Route path="recipes" element={<AdminPage />} />
                <Route path="users" element={<AdminPage />} />
                <Route path="comments" element={<AdminPage />} />
                <Route path="stats" element={<AdminPage />} />
                <Route path="settings" element={<AdminPage />} />
                <Route path="categories" element={<AdminPage />} />
                <Route path="calendar" element={<AdminPage />} />
                <Route path="notifications" element={<AdminPage />} />
            </Route>

            {/* 404 - Redirigir a home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

function App() {
    const { isDarkMode } = useTheme()
    return (
         <BrowserRouter>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh',
                background: isDarkMode ? '#0f172a' : '#ffffff',
                color: isDarkMode ? '#cbd5e1' : '#3a3a4a',
                transition: 'background-color 0.3s ease, color 0.3s ease',
            }}>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </div>
        </BrowserRouter>
    )
}

export default App
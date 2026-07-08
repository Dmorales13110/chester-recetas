import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//@ts-ignore
import { AuthProvider, useAuth } from './context/AuthContext'
//@ts-ignore
import { AdminRoute, PublicRoute } from './components/ProtectedRoutes'
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
import AboutPage from './pages/about/index'
//@ts-ignore
import ProtectedRoute from './components/ProtectedRoutes'
//@ts-ignore
import RecipesModule from './pages/admin/modules/recipes/index'
//@ts-ignore
import UsersModule from './pages/admin/modules/users/index'
//@ts-ignore
import SettingsModule from './pages/admin/modules/settings/index'
//@ts-ignore
import AdminCategories from './pages/admin/components/AdminCategories'
//@ts-ignore
import AdminNotifications from './pages/admin/components/AdminNotifications'
//@ts-ignore
import AdminAnalytics from './pages/admin/components/AdminAnalytics'
//@ts-ignore
import AdminComments from './pages/admin/components/AdminComments'
//@ts-ignore
import CreateRecipe from './pages/admin/modules/recipes/CreateRecipe'
//@ts-ignore
import EditRecipe from './pages/admin/modules/recipes/EditRecipe'
//@ts-ignore
import RolesPermissions from './pages/admin/modules/users/RolesPermissions'

function AppRoutes() {
    return (
        <Routes>
            {/* Rutas públicas - acceso sin login */}
            <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
            <Route path="/recetas" element={<><Navbar /><RecipesPage /><Footer /></>} />
            <Route path="/categorias" element={<><Navbar /><CategoriesPage /><Footer /></>} />
            <Route path="/contacto" element={<><Navbar /><ContactPage /><Footer /></>} />
            <Route path="/receta/:id" element={<><Navbar /><RecipePage /><Footer /></>} />
            <Route path="/sobre-nosotros" element={<><Navbar /><AboutPage /><Footer /></>} />

            {/* Ruta de login - redirige si ya está autenticado */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />

            {/* Ruta de perfil - requiere autenticación */}
            <Route
                path="/perfil"
                element={
                    <ProtectedRoute>
                        <Navbar />
                        <ProfilePage />
                        <Footer />
                    </ProtectedRoute>
                }
            />

            {/* Panel Administrativo - Solo admin */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                {/* Dashboard */}
                <Route index element={<AdminPage />} />

                {/* Módulo de Recetas */}
                <Route path="recipes" element={<RecipesModule />} />
                <Route path="recipes/new" element={<CreateRecipe />} />
                <Route path="recipes/edit/:id" element={<EditRecipe />} />

                {/* Módulo de Usuarios */}
                <Route path="users" element={<UsersModule />} />

                {/* Módulo de Comentarios */}
                <Route path="comments" element={<AdminComments />} />

                {/* Módulo de Categorías */}
                <Route path="categories" element={<AdminCategories />} />

                {/* Módulo de Notificaciones */}
                <Route path="notifications" element={<AdminNotifications />} />

                {/* Módulo de Estadísticas */}
                <Route path="stats" element={<AdminAnalytics />} />
                <Route path="analytics" element={<AdminAnalytics />} />

                {/* Módulo de Configuración */}
                <Route path="settings" element={<SettingsModule />} />

               <Route path="users/roles" element={<RolesPermissions />} />

            </Route>

            {/* 404 - Redirigir a home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
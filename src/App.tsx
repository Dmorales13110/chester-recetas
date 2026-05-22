import { BrowserRouter, Routes, Route } from 'react-router-dom'
// @ts-ignore
import Navbar from './components/Navbar'
// @ts-ignore
import Footer from './components/Footer'
// @ts-ignore
import HomePage from './pages/home/index'
// @ts-ignore
import RecipesPage from './pages/recipes'
// @ts-ignore
import CategoriesPage from './pages/categories'
// @ts-ignore
import ContactPage from './pages/contact'
// @ts-ignore
import RecipePage from './pages/recipe'
// @ts-ignore
import ProfilePage from './pages/profile'

function App() {
    return (
        <BrowserRouter>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                background: 'var(--bg)',
                color: 'var(--text)',
            }}>
                <Navbar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/recetas" element={<RecipesPage />} />
                        <Route path="/categorias" element={<CategoriesPage />} />
                        <Route path="/contacto" element={<ContactPage />} />
                        <Route path="/receta/:id" element={<RecipePage />} />
                        <Route path="/perfil" element={<ProfilePage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
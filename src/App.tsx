import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/home/index'
import RecipesPage from './pages/recipes'
import CategoriesPage from './pages/categories'
import ContactPage from './pages/contact'

//layout principal ignoren lo rojito no todo lo rojo es malo KJASKDASJD
function App() {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/recetas" element={<RecipesPage />} />
                        <Route path="/categorias" element={<CategoriesPage />} />
                        <Route path="/contacto" element={<ContactPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
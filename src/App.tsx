import { BrowserRouter, Routes, Route } from 'react-router-dom'
// @ts-ignore: No type declarations for this JS module
import Navbar from './components/Navbar'
// @ts-ignore: No type declarations for this JS module
import Footer from './components/Footer'
// @ts-ignore: No type declarations for this JS module
import HomePage from './pages/home/index'
// @ts-ignore: No type declarations for this JS module
import RecipesPage from './pages/recipes'
// @ts-ignore: No type declarations for this JS module
import CategoriesPage from './pages/categories'
// @ts-ignore: No type declarations for this JS module
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
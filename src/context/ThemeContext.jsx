import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('chester-theme')
        // Si no hay tema guardado, usar preferencia del sistema
        if (!saved) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return saved === 'dark'
    })

    useEffect(() => {
        localStorage.setItem('chester-theme', isDarkMode ? 'dark' : 'light')

        // Aplicar clase al documento
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode')
        } else {
            document.documentElement.classList.remove('dark-mode')
        }
    }, [isDarkMode])

    const toggleTheme = () => setIsDarkMode(prev => !prev)

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
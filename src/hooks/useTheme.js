import { useTheme } from '../context/ThemeContext'

export const useThemedStyles = () => {
    const { theme } = useTheme()

    const getStyles = (lightStyles, darkStyles) => {
        return theme
    }

    return { theme, getStyles }
}
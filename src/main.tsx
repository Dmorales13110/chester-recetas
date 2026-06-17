// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App'
// @ts-ignore
import { ThemeProvider } from './context/ThemeContext'
// @ts-ignore
import { FavoritesProvider } from './context/FavoritesContext'
// @ts-ignore
import { SearchProvider } from './context/SearchContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider
            theme={{
                primaryColor: 'orange',
                fontFamily: 'Segoe UI, sans-serif',
                defaultRadius: 'md',
                colors: {
                    orange: [
                        '#fff5e6',
                        '#ffe6cc',
                        '#ffd4b3',
                        '#ffc299',
                        '#ffb080',
                        '#e67e22',
                        '#cc6b1a',
                        '#b35812',
                        '#99450a',
                        '#803202',
                    ],
                },
            }}
            defaultColorScheme="light"
        >
            <ThemeProvider>
                <FavoritesProvider>
                    <SearchProvider>
                        <App />
                    </SearchProvider>
                </FavoritesProvider>
            </ThemeProvider>
        </MantineProvider>
    </React.StrictMode>,
)
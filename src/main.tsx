import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import App from './App'

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
      forceColorScheme="light"
    >
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
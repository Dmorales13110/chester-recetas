import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Group, Title, Container, Button, Indicator, Avatar, Menu } from '@mantine/core'
import { DogIcon, Search, Heart, User, Sun, Moon, Settings } from 'lucide-react'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{
          background: 'white',
          borderBottom: '1px solid #eee',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '12px 0'
        }}>
          <Container size="xl">
            <Group justify="space-between">
              <Group gap="xs">
                <div style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', padding: 8, borderRadius: 12 }}>
                  <DogIcon size={24} color="white" />
                </div>
                <Title order={3} style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Chester Recetas
                </Title>
              </Group>

              <Group gap="md">
                <Button variant="subtle" leftSection={<Search size={18} />} radius="xl">
                  Buscar
                </Button>
                <Indicator color="red" size={10} offset={4}>
                  <Heart size={20} cursor="pointer" />
                </Indicator>
                <Menu shadow="md" width={200} position="bottom-end">
                  <Menu.Target>
                    <Avatar size="md" radius="xl" color="orange" style={{ cursor: 'pointer' }}>U</Avatar>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<User size={14} />}>Mi perfil</Menu.Item>
                    <Menu.Item leftSection={<Heart size={14} />}>Mis favoritos</Menu.Item>
                    <Menu.Item leftSection={<Settings size={14} />}>Configuración</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item leftSection={<Sun size={14} />}>Modo claro</Menu.Item>
                    <Menu.Item leftSection={<Moon size={14} />}>Modo oscuro</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Container>
        </div>

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
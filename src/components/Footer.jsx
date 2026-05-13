import { Group, Text, ActionIcon, Container, Divider } from '@mantine/core'
import { Mail, Heart, MapPin, Phone, Clock, ChefHat, Share2, Camera, MessageCircle, Video, Sparkles, DogIcon } from 'lucide-react'

function Footer() {
  return (
    <div style={{ background: '#1a1a2e', color: '#aaa', marginTop: 60 }}>
      <Container size="xl" py="lg">
        <Group justify="space-between" wrap="wrap" gap="md" mb="md">
          <Group gap="xs">
            <div style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', padding: 6, borderRadius: 10 }}>
              <DogIcon size={18} color="white" />
            </div>
            <Text fw={700} size="md" c="white">Chester Recetas</Text>
          </Group>
          <Group gap="sm">
            <ActionIcon variant="subtle" size="md" component="a" href="#" target="_blank" radius="xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Share2 size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="md" component="a" href="#" target="_blank" radius="xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Camera size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="md" component="a" href="#" target="_blank" radius="xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <MessageCircle size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="md" component="a" href="#" target="_blank" radius="xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Video size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="md" component="a" href="mailto:info@recetario.com" target="_blank" radius="xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Mail size={16} />
            </ActionIcon>
          </Group>
        </Group>

        <Divider style={{ borderColor: '#333' }} mb="md" />

        <Group justify="space-between" wrap="wrap" gap="md">
          <Group gap="xl" wrap="wrap">
            <Group gap="xs"><MapPin size={14} /><Text size="xs">Calle Joven Kocina, Venezuela</Text></Group>
            <Group gap="xs"><Phone size={14} /><Text size="xs">+58 123 456 7890</Text></Group>
          </Group>
          <Group gap="xs">
            <Sparkles size={12} color="#e67e22" />
            <Text size="xs" c="dimmed">Hecho con <Heart size={10} style={{ display: 'inline', margin: '0 2px', color: '#e74c3c' }} /> para ti y para chester</Text>
          </Group>
        </Group>
      </Container>
    </div>
  )
}

export default Footer
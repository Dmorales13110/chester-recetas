import { TextInput, Group, Button, Paper } from '@mantine/core'
import { Search, X } from 'lucide-react'

//input para poder hacer busquedas dentro de las categorias
const CategorySearch = ({ searchQuery, setSearchQuery }) => {
    return (
        <Paper
            withBorder
            p="md"
            radius="xl"
            style={{
                background: 'var(--bg)',
                borderColor: 'var(--border)'
            }}
        >
            <TextInput
                placeholder="Buscar categorías por nombre o descripción..."
                leftSection={<Search size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                radius="xl"
                size="md"
                styles={{
                    input: {
                        fontSize: 16,
                        background: 'var(--input-bg)',
                        borderColor: 'var(--border)',
                        color: 'var(--text)',
                        '::placeholder': {
                            color: 'var(--text-secondary)'
                        }
                    }
                }}
                rightSection={
                    searchQuery && (
                        <Button
                            variant="subtle"
                            onClick={() => setSearchQuery('')}
                            style={{ padding: 0 }}
                        >
                            <X size={16} style={{ color: 'var(--text-secondary)' }} />
                        </Button>
                    )
                }
            />
        </Paper>
    )
}

export default CategorySearch
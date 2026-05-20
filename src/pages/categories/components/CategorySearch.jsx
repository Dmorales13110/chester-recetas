import { TextInput, Group, Button, Paper } from '@mantine/core'
import { Search, X } from 'lucide-react'

//input para poder hacer busquedas dentro de las categorias
const CategorySearch = ({ searchQuery, setSearchQuery }) => {
    return (
        <Paper withBorder p="md" radius="xl" bg="white">
            <TextInput
                placeholder="Buscar categorías por nombre o descripción..."
                leftSection={<Search size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                radius="xl"
                size="md"
                rightSection={
                    searchQuery && (
                        <Button
                            variant="subtle"
                            onClick={() => setSearchQuery('')}
                            style={{ padding: 0 }}
                        >
                            <X size={16} />
                        </Button>
                    )
                }
                styles={{
                    input: { fontSize: 16 }
                }}
            />
        </Paper>
    )
}

export default CategorySearch
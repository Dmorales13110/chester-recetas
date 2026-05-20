import { Paper, Title, Text, Group, Accordion, TextInput, SegmentedControl, ThemeIcon, Badge } from '@mantine/core'
import {
    Search, ChevronDown, MessageCircle, Sparkles,
    BookOpen, Clock, Edit, Heart, Users, Flag,
    Lightbulb, Mail, User, Wrench
} from 'lucide-react'

const iconMap = {
    BookOpen: <BookOpen size={16} />,
    Clock: <Clock size={16} />,
    Edit: <Edit size={16} />,
    Heart: <Heart size={16} />,
    Users: <Users size={16} />,
    Flag: <Flag size={16} />,
    Lightbulb: <Lightbulb size={16} />,
    Mail: <Mail size={16} />,
    User: <User size={14} />,
    Wrench: <Wrench size={14} />,
}

const categoryIconMap = {
    BookOpen: <BookOpen size={14} />,
    User: <User size={14} />,
    Users: <Users size={14} />,
    Wrench: <Wrench size={14} />,
    Lightbulb: <Lightbulb size={14} />,
}

// seccion de preguntas frecuentes
const FaqSection = ({
    faqs,
    activeFaqId,
    toggleFaq,
    searchFaq,
    setSearchFaq,
    selectedCategory,
    setSelectedCategory,
    faqCategories
}) => {
    return (
        <Paper withBorder p="xl" radius="xl" bg="white">
            <Group justify="space-between" align="flex-start" mb="lg" wrap="wrap">
                <div>
                    <Group gap="xs" mb="xs">
                        <ThemeIcon size="md" radius="xl" color="orange" variant="light">
                            <MessageCircle size={16} />
                        </ThemeIcon>
                        <Text size="sm" c="orange" fw={500}>Preguntas frecuentes</Text>
                    </Group>
                    <Title order={2}>Chester responde</Title>
                    <Text c="dimmed" maw={500}>
                        ¿Tienes dudas? Nuestro amigo Chester tiene las respuestas.
                        Busca tu pregunta o explora por categoría.
                    </Text>
                </div>
                <Badge size="lg" color="orange" variant="light" leftSection={<Sparkles size={14} />}>
                    {faqs.length} preguntas
                </Badge>
            </Group>

            <Group grow mb="xl">
                <TextInput
                    placeholder="Buscar pregunta..."
                    leftSection={<Search size={16} />}
                    value={searchFaq}
                    onChange={(e) => setSearchFaq(e.target.value)}
                    radius="xl"
                />
            </Group>

            <SegmentedControl
                data={faqCategories.map(cat => ({
                    value: cat.value,
                    label: cat.iconName ? (
                        <Group gap="xs" style={{ gap: 6 }}>
                            {categoryIconMap[cat.iconName]}
                            <Text size="sm">{cat.label}</Text>
                        </Group>
                    ) : cat.label
                }))}
                value={selectedCategory}
                onChange={setSelectedCategory}
                mb="xl"
                fullWidth
                radius="xl"
                color="orange"
            />

            {faqs.length === 0 ? (
                <Text ta="center" c="dimmed" py="xl">
                    No encontramos preguntas que coincidan con tu búsqueda.
                </Text>
            ) : (
                <Accordion
                    value={activeFaqId?.toString()}
                    onChange={(value) => toggleFaq(parseInt(value))}
                    variant="separated"
                    radius="md"
                >
                    {faqs.map((faq) => (
                        <Accordion.Item key={faq.id} value={faq.id.toString()}>
                            <Accordion.Control>
                                <Group justify="space-between" wrap="nowrap">
                                    <Group gap="sm">
                                        <ThemeIcon size="sm" radius="xl" color="orange" variant="light">
                                            {iconMap[faq.icon] || <MessageCircle size={14} />}
                                        </ThemeIcon>
                                        <Text fw={500}>{faq.question}</Text>
                                    </Group>
                                    <ChevronDown size={18} />
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <div style={{
                                    background: '#FFF8F0',
                                    padding: 16,
                                    borderRadius: 12,
                                    borderLeft: `3px solid #e67e22`
                                }}>
                                    <Group gap="xs" mb="xs">
                                        <ThemeIcon size="sm" radius="xl" color="orange" variant="light">
                                            <Sparkles size={12} />
                                        </ThemeIcon>
                                        <Text size="xs" c="orange" fw={500}>Chester dice:</Text>
                                    </Group>
                                    <Text>{faq.answer}</Text>
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </Paper>
    )
}

export default FaqSection
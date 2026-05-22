import { Paper, Title, Text, Group, Accordion, TextInput, SegmentedControl, ThemeIcon, Badge, ScrollArea } from '@mantine/core'
import {
    Search, ChevronDown, MessageCircle, Sparkles,
    BookOpen, Clock, Edit, Heart, Users, Flag,
    Lightbulb, Mail, User, Wrench, Dog, X
} from 'lucide-react'
import { useState } from 'react'

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
    const searchInputStyles = {
        input: {
            backgroundColor: 'var(--input-bg)',
            border: '1px solid var(--border)',
            color: 'var(--input-text)',
            '&:focus': {
                borderColor: '#e67e22',
            }
        }
    }

    const accordionStyles = {
        item: {
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border)',
            borderRadius: '12px',
            marginBottom: '12px',
            overflow: 'hidden',
        },
        control: {
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-h)',
            '&:hover': {
                backgroundColor: 'var(--accent-bg)',
            }
        },
        panel: {
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text)',
        }
    }

    const segmentedStyles = {
        root: {
            backgroundColor: 'var(--bg-secondary)',
        },
        label: {
            color: 'var(--text)',
            '&[data-active]': {
                color: 'white',
            }
        }
    }

    return (
        <Paper withBorder p="xl" radius="xl" style={{
            background: 'var(--card-bg)',
            borderColor: 'var(--border)',
            overflow: 'hidden'
        }}>
            <Group justify="space-between" align="flex-start" mb="lg" wrap="wrap">
                <div>
                    <Group gap="xs" mb="xs">
                        <ThemeIcon size="md" radius="xl" color="orange" variant="light">
                            <Dog size={16} />
                        </ThemeIcon>
                        <Text size="sm" c="orange" fw={500}>Chester responde</Text>
                    </Group>
                    <Title order={2} style={{ color: 'var(--text-h)' }}>Preguntas frecuentes</Title>
                    <Text style={{ color: 'var(--text-secondary)' }} maw={500}>
                        ¿Tienes dudas? Nuestro amigo <strong style={{ color: '#e67e22' }}>Chester</strong> tiene las respuestas.
                        Busca tu pregunta o explora por categoría.
                    </Text>
                </div>
                <Badge size="lg" color="orange" variant="light" leftSection={<Sparkles size={14} />}>
                    {faqs.length} preguntas respondidas por Chester
                </Badge>
            </Group>

            <Group grow mb="xl">
                <TextInput
                    placeholder="Buscar pregunta..."
                    leftSection={<Search size={16} />}
                    value={searchFaq}
                    onChange={(e) => setSearchFaq(e.target.value)}
                    radius="xl"
                    styles={searchInputStyles}
                    rightSection={
                        searchFaq && (
                            <X
                                size={16}
                                style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}
                                onClick={() => setSearchFaq('')}
                            />
                        )
                    }
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
                styles={segmentedStyles}
            />

            {faqs.length === 0 ? (
                <Text ta="center" c="dimmed" py="xl">
                    No encontramos preguntas que coincidan con tu búsqueda.
                </Text>
            ) : (
                <ScrollArea h={500} offsetScrollbars>
                    <Accordion
                        value={activeFaqId?.toString()}
                        onChange={(value) => toggleFaq(parseInt(value))}
                        variant="filled"
                        radius="md"
                        styles={accordionStyles}
                    >
                        {faqs.map((faq) => (
                            <Accordion.Item key={faq.id} value={faq.id.toString()}>
                                <Accordion.Control>
                                    <Group justify="space-between" wrap="nowrap">
                                        <Group gap="sm">
                                            <ThemeIcon size="sm" radius="xl" color="orange" variant="light">
                                                {iconMap[faq.icon] || <MessageCircle size={14} />}
                                            </ThemeIcon>
                                            <Text fw={500} style={{ color: 'var(--text-h)' }}>{faq.question}</Text>
                                        </Group>
                                        <ChevronDown size={18} style={{ color: 'var(--text-secondary)' }} />
                                    </Group>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <div style={{
                                        background: 'var(--accent-bg)',
                                        padding: 16,
                                        borderRadius: 12,
                                        borderLeft: `3px solid #e67e22`
                                    }}>
                                        <Group gap="xs" mb="xs">
                                            <ThemeIcon size="sm" radius="xl" color="orange" variant="light">
                                                <Dog size={12} />
                                            </ThemeIcon>
                                            <Text size="xs" c="orange" fw={500}>Chester dice:</Text>
                                        </Group>
                                        <Text style={{ color: 'var(--text)' }}>{faq.answer}</Text>
                                    </div>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </ScrollArea>
            )}
        </Paper>
    )
}

export default FaqSection
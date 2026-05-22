import { Paper, Title, Text, Group, Rating, Avatar, Stack, Divider, Textarea, Button, ThemeIcon, Tooltip } from '@mantine/core'
import { useState } from 'react'
import { MessageCircle, Star, User, Dog, Send, Sparkles, Heart, ThumbsUp, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const RecipeReviews = ({ reviews = [], recipeId }) => {
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [likedReviews, setLikedReviews] = useState({})

    const safeReviews = Array.isArray(reviews) ? reviews : []

    const averageRating = safeReviews.length > 0
        ? (safeReviews.reduce((acc, r) => acc + r.rating, 0) / safeReviews.length).toFixed(1)
        : 0

    const handleSubmitReview = () => {
        if (!newReview.comment.trim()) return
        setIsSubmitting(true)
        setTimeout(() => {
            console.log('Reseña enviada:', { ...newReview, recipeId })
            setIsSubmitting(false)
            setNewReview({ rating: 5, comment: '' })
        }, 1000)
    }

    const handleLikeReview = (reviewId) => {
        setLikedReviews(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }))
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <Paper
            withBorder
            p="xl"
            radius="xl"
            style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border)',
                overflow: 'hidden',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Group justify="space-between" mb="xl" wrap="wrap">
                    <Group gap="xs">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 10, 0] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <ThemeIcon size="lg" radius="xl" color="orange" variant="light">
                                <Dog size={20} />
                            </ThemeIcon>
                        </motion.div>
                        <div>
                            <Title order={3} style={{ color: 'var(--text-h)' }}>
                                Reseñas y comentarios
                            </Title>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                Lo que dice la comunidad sobre esta receta
                            </Text>
                        </div>
                    </Group>

                    <Tooltip label="Calificación promedio" position="left" withArrow>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{
                                background: 'var(--accent-bg)',
                                padding: '8px 16px',
                                borderRadius: 50,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <Star size={18} fill="#e67e22" color="#e67e22" />
                            <Text fw={700} size="lg" style={{ color: 'var(--text-h)' }}>
                                {averageRating}
                            </Text>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                ({safeReviews.length} {safeReviews.length === 1 ? 'reseña' : 'reseñas'})
                            </Text>
                        </motion.div>
                    </Tooltip>
                </Group>
            </motion.div>

            {/* Formulario para nueva reseña */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Paper
                    p="md"
                    radius="lg"
                    mb="xl"
                    style={{ background: 'var(--bg-secondary)' }}
                >
                    <Group gap="md" mb="md">
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Avatar size="md" radius="xl" color="orange">
                                <User size={16} />
                            </Avatar>
                        </motion.div>
                        <div style={{ flex: 1 }}>
                            <Rating
                                value={newReview.rating}
                                onChange={(value) => setNewReview({ ...newReview, rating: value })}
                                size="lg"
                            />
                        </div>
                    </Group>
                    <Textarea
                        placeholder="¡Comparte tu experiencia con esta receta! Chester quiere saber qué te pareció 🐕"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        minRows={3}
                        mb="md"
                        radius="md"
                        styles={{
                            input: {
                                backgroundColor: 'var(--input-bg)',
                                borderColor: 'var(--border)',
                                color: 'var(--input-text)',
                            }
                        }}
                    />
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            color="orange"
                            radius="xl"
                            onClick={handleSubmitReview}
                            loading={isSubmitting}
                            disabled={!newReview.comment.trim()}
                            leftSection={<Send size={16} />}
                            fullWidth
                            style={{
                                background: 'linear-gradient(135deg, #e67e22, #f39c12)',
                            }}
                        >
                            Publicar reseña
                        </Button>
                    </motion.div>
                </Paper>
            </motion.div>

            {/* Lista de reseñas existentes */}
            <AnimatePresence>
                {safeReviews.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <Stack align="center" gap="md" py={40}>
                            <MessageCircle size={48} style={{ color: 'var(--border)', opacity: 0.5 }} />
                            <Text fw={500} style={{ color: 'var(--text-h)' }}>¡Sé el primero en comentar!</Text>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                                Comparte tu experiencia con esta receta
                            </Text>
                        </Stack>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Stack gap="md">
                            {safeReviews.map((review, idx) => (
                                <motion.div
                                    key={review.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    <Paper
                                        p="md"
                                        radius="lg"
                                        style={{
                                            background: 'var(--bg-secondary)',
                                            transition: 'all 0.3s',
                                        }}
                                    >
                                        <Group gap="md" mb="xs" wrap="nowrap">
                                            <motion.div whileHover={{ scale: 1.1 }}>
                                                <Avatar size="md" radius="xl" color="orange">
                                                    {review.user?.charAt(0) || 'U'}
                                                </Avatar>
                                            </motion.div>
                                            <div style={{ flex: 1 }}>
                                                <Group justify="space-between" wrap="wrap">
                                                    <Text fw={600} style={{ color: 'var(--text-h)' }}>
                                                        {review.user || 'Usuario'}
                                                    </Text>
                                                    <Group gap="xs">
                                                        <Calendar size={12} style={{ color: 'var(--text-secondary)' }} />
                                                        <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                                                            {review.date || 'Reciente'}
                                                        </Text>
                                                    </Group>
                                                </Group>
                                                <Rating value={review.rating} readOnly size="sm" mt={4} />
                                            </div>
                                        </Group>

                                        <Text style={{ color: 'var(--text)', marginLeft: 56, marginBottom: 12, lineHeight: 1.5 }}>
                                            {review.comment}
                                        </Text>

                                        <Group justify="flex-end" gap="sm" style={{ marginLeft: 56 }}>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Tooltip label="¿Te fue útil esta reseña?" position="top" withArrow>
                                                    <Button
                                                        variant="subtle"
                                                        size="xs"
                                                        color={likedReviews[review.id] ? "orange" : "gray"}
                                                        leftSection={<ThumbsUp size={12} />}
                                                        onClick={() => handleLikeReview(review.id)}
                                                        style={{ transition: 'all 0.2s' }}
                                                    >
                                                        {likedReviews[review.id] ? 'Gracias' : 'Útil'}
                                                    </Button>
                                                </Tooltip>
                                            </motion.div>
                                        </Group>
                                    </Paper>
                                </motion.div>
                            ))}
                        </Stack>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer animado */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <Divider style={{ borderColor: 'var(--border)', marginTop: 24, marginBottom: 16 }} />
                <Group justify="center" gap="xs">
                    <Sparkles size={12} color="#e67e22" />
                    <Text size="xs" style={{ color: 'var(--text-secondary)' }}>
                        Las reseñas ayudan a otros usuarios a elegir mejor sus recetas
                    </Text>
                    <Heart size={10} color="#e67e22" />
                </Group>
            </motion.div>
        </Paper>
    )
}

export default RecipeReviews
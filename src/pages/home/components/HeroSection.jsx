import { useState } from 'react'
import { Title, Text, Button, Group, ThemeIcon, Box } from '@mantine/core'
import { ChefHat, Utensils, Play, User, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import VideoModal from '../../../components/VideoModal'
import 'swiper/css'
import 'swiper/css/effect-fade'

const HeroSection = ({ backgrounds }) => {
    const [videoModalOpen, setVideoModalOpen] = useState(false)
    const [videoType, setVideoType] = useState('promo')

    const handleOpenVideo = (type) => {
        setVideoType(type)
        setVideoModalOpen(true)
    }

    return (
        <>
            <Box style={{ position: 'relative', marginBottom: 60, borderRadius: 24, overflow: 'hidden', minHeight: 500 }}>
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    {backgrounds.map((bg, idx) => (
                        <SwiperSlide key={idx}>
                            <div style={{
                                backgroundImage: `url(${bg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '100%',
                                filter: 'blur(2px)',
                                transform: 'scale(1.05)',
                            }} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
                    zIndex: 1,
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        position: 'relative',
                        zIndex: 2,
                        textAlign: 'center',
                        padding: '80px 20px',
                        minHeight: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                        <ThemeIcon size={90} radius="xl" color="orange" variant="white" mx="auto" mb="md" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                            <ChefHat size={50} color="#e67e22" />
                        </ThemeIcon>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <Title order={1} size={56} c="white" mb="md" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                            Descubre las mejores recetas
                        </Title>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Text size="xl" c="white" mb="xl" opacity={0.95}>
                            Fáciles, rápidas y deliciosas para toda la familia
                        </Text>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <Group justify="center">
                            <Button component={Link} to="/recetas" size="xl" radius="xl" color="orange" leftSection={<Utensils size={20} />} style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                                Explorar recetas
                            </Button>
                            <Button 
                                size="xl" 
                                radius="xl" 
                                variant="white" 
                                color="dark" 
                                leftSection={<Play size={20} />} 
                                style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                                onClick={() => handleOpenVideo('promo')}
                            >
                                Ver video
                            </Button>
                        </Group>
                    </motion.div>
                </motion.div>
            </Box>

            <VideoModal opened={videoModalOpen} onClose={() => setVideoModalOpen(false)} videoType={videoType} />
        </>
    )
}

export default HeroSection
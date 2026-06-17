import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Lottie from 'react-lottie-player'
import chesterAnimation from '../../../assets/animations/chester-dog.json'

const AnimatedDog = ({ currentTab }) => {
    const [dogMood, setDogMood] = useState('happy')
    const [isPlaying, setIsPlaying] = useState(true)
    const [progress, setProgress] = useState(0)
    const lottieRef = useRef(null)
    const animationFrameRef = useRef(null)

    useEffect(() => {
        switch(currentTab) {
            case 'login':
                setDogMood('happy')
                break
            case 'register':
                setDogMood('excited')
                break
            case 'reset':
                setDogMood('worried')
                break
            default:
                setDogMood('happy')
        }
        
        setIsPlaying(true)
        setProgress(0)
    }, [currentTab])

    useEffect(() => {
        if (!isPlaying) return

        let startTime = null
        const duration = dogMood === 'worried' ? 6000 : 3000
        
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime
            const rawProgress = Math.min(elapsed / duration, 1)
            const easedProgress = easeInOutCubic(rawProgress)
            setProgress(easedProgress)
            
            if (rawProgress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate)
            } else {
                if (dogMood === 'excited') {
                    setTimeout(() => {
                        if (isPlaying) {
                            startTime = null
                            animationFrameRef.current = requestAnimationFrame(animate)
                        }
                    }, 1000)
                } else {
                    setIsPlaying(false)
                }
            }
        }
        
        animationFrameRef.current = requestAnimationFrame(animate)
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isPlaying, dogMood])

    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    useEffect(() => {
        if (lottieRef.current) {
            if (isPlaying) {
                lottieRef.current.play()
            } else {
                lottieRef.current.pause()
            }
        }
    }, [isPlaying])

    const getMessage = () => {
        switch(dogMood) {
            case 'happy':
                return '¡Hola! Soy Chester 🐕'
            case 'excited':
                return '¡Nuevas recetas te esperan! 🎉'
            case 'worried':
                return 'Tranquilo, te ayudaré 🔑'
            default:
                return '¡Chester te espera! 🐕'
        }
    }

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 0',
            marginBottom: '16px',
            width: '100%',
        }}>
            {/* Contenedor del perro - Más grande */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-secondary)',
                borderRadius: 24,
                padding: 16,
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.08)',
                border: `2px solid ${dogMood === 'excited' ? '#f59e0b' : dogMood === 'worried' ? '#8b5cf6' : 'var(--border)'}`,
                width: 160,
                height: 160,
                transition: 'all 0.5s ease',
                flexShrink: 0,
            }}>
                <Lottie
                    ref={lottieRef}
                    loop={false}
                    play={isPlaying}
                    animationData={chesterAnimation}
                    progress={progress}
                    style={{ 
                        width: '100%', 
                        height: '100%',
                    }}
                    rendererSettings={{
                        preserveAspectRatio: 'xMidYMid meet',
                    }}
                />
            </div>

            {/* Mensaje centrado justo debajo del perro */}
            <motion.div
                key={dogMood}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    marginTop: 12,
                    padding: '8px 20px',
                    background: 'var(--accent-bg)',
                    borderRadius: 20,
                    border: '1px solid var(--border)',
                    display: 'inline-block',
                    textAlign: 'center',
                    maxWidth: '220px',
                }}
            >
                <span style={{ 
                    color: 'var(--text-h)',
                    fontSize: 14,
                    fontWeight: 500,
                }}>
                    {getMessage()}
                </span>
            </motion.div>
        </div>
    )
}

export default AnimatedDog
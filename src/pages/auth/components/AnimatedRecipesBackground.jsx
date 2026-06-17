import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AnimatedRecipesBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        
        const particles = []
        const numParticles = 20

        // Emojis de recetas - más variados y visibles
        const recipeEmojis = ['🍳', '🥘', '🍝', '🥗', '🍰', '🍪', '🍕', '🍣', '🥩', '🥦', '🧀', '🥨', '🍩', '🍦', '🍜']

        class RecipeParticle {
            constructor() {
                this.reset()
            }

            reset() {
                this.x = Math.random() * canvas.width
                this.y = -20 - Math.random() * 100
                this.size = 24 + Math.random() * 20
                this.speedY = 0.4 + Math.random() * 0.8
                this.speedX = (Math.random() - 0.5) * 0.3
                this.emoji = recipeEmojis[Math.floor(Math.random() * recipeEmojis.length)]
                this.opacity = 0.08 + Math.random() * 0.12
                this.rotation = Math.random() * Math.PI * 2
                this.rotationSpeed = (Math.random() - 0.5) * 0.01
                this.wobble = Math.random() * Math.PI * 2
                this.wobbleSpeed = 0.005 + Math.random() * 0.01
                this.scale = 0.7 + Math.random() * 0.3
            }

            update() {
                this.y += this.speedY
                this.x += Math.sin(this.wobble) * 0.2 + this.speedX
                this.wobble += this.wobbleSpeed
                this.rotation += this.rotationSpeed
                
                if (this.y > canvas.height + 50) {
                    this.reset()
                    this.y = -20 - Math.random() * 50
                    this.x = Math.random() * canvas.width
                }
            }

            draw(ctx) {
                ctx.save()
                ctx.translate(this.x, this.y)
                ctx.rotate(this.rotation)
                ctx.scale(this.scale, this.scale)
                ctx.globalAlpha = this.opacity
                ctx.font = `${this.size}px Arial`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(this.emoji, 0, 0)
                ctx.restore()
            }
        }

        // Crear partículas
        for (let i = 0; i < numParticles; i++) {
            const p = new RecipeParticle()
            p.y = Math.random() * canvas.height
            particles.push(p)
        }

        // Dibujar decoraciones sutiles
        const drawDecorations = () => {
            ctx.save()
            
            // Círculo decorativo central
            ctx.globalAlpha = 0.03
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 50,
                canvas.width / 2, canvas.height / 2, 200
            )
            gradient.addColorStop(0, '#e67e22')
            gradient.addColorStop(1, 'transparent')
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(canvas.width / 2, canvas.height / 2, 200, 0, Math.PI * 2)
            ctx.fill()
            
            ctx.restore()
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Dibujar decoraciones
            drawDecorations()

            // Actualizar y dibujar partículas
            particles.forEach(p => {
                p.update()
                p.draw(ctx)
            })

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }, [])

    return (
        <motion.canvas
            ref={canvasRef}
            width={600}
            height={600}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                borderRadius: '12px',
            }}
        />
    )
}

export default AnimatedRecipesBackground
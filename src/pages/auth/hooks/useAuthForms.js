import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const useAuthForms = () => {
    const [activeTab, setActiveTab] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [telefono, setTelefono] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [resetEmail, setResetEmail] = useState('')
    const [resetStep, setResetStep] = useState('request')
    const [resetCode, setResetCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    
    const { login, register } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await login(email, password)
            if (result.success) {
                if (result.user.role === 'admin') {
                    navigate('/admin', { replace: true })
                } else {
                    navigate('/', { replace: true })
                }
            } else {
                setError(result.error)
            }
        } catch (err) {
            console.error('Error en login:', err)
            setError('Error al iniciar sesión. Intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        
        // Validaciones
        if (!name || name.trim().length < 2) {
            setError('El nombre debe tener al menos 2 caracteres')
            return
        }

        if (!email || !email.includes('@')) {
            setError('Ingresa un correo electrónico válido')
            return
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setLoading(true)

        try {
            // nviar todos los campos incluyendo teléfono y ubicación
            const result = await register(name, email, password, telefono, ubicacion)
            
            if (result.success) {
                setSuccess(result.message || '🎉 ¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.')
                // Limpiar campos
                setName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setTelefono('')
                setUbicacion('')
                
                setTimeout(() => {
                    setActiveTab('login')
                    setEmail(email)
                    setSuccess('')
                }, 2500)
            } else {
                setError(result.error)
            }
        } catch (err) {
            console.error('Error en registro:', err)
            setError('Error al crear la cuenta. Intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Aquí implementar recuperación de contraseña
            setTimeout(() => {
                setResetStep('sent')
                setLoading(false)
            }, 1500)
        } catch (err) {
            setError('Error al enviar el código de recuperación.')
            setLoading(false)
        }
    }

    const handleConfirmReset = async (e) => {
        e.preventDefault()
        setError('')
        
        if (newPassword !== confirmNewPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setLoading(true)

        try {
            setTimeout(() => {
                setResetStep('confirm')
                setSuccess('¡Contraseña actualizada exitosamente!')
                setLoading(false)
                setTimeout(() => {
                    setActiveTab('login')
                    setResetStep('request')
                    setSuccess('')
                }, 2000)
            }, 1500)
        } catch (err) {
            setError('Error al actualizar la contraseña.')
            setLoading(false)
        }
    }

    const handleBackToLogin = () => {
        setActiveTab('login')
        setResetStep('request')
        setError('')
        setSuccess('')
    }

    return {
        // Estados
        activeTab, setActiveTab,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        name, setName,
        telefono, setTelefono,
        ubicacion, setUbicacion,
        error, setError,
        success, setSuccess,
        loading, setLoading,
        resetEmail, setResetEmail,
        resetStep, setResetStep,
        resetCode, setResetCode,
        newPassword, setNewPassword,
        confirmNewPassword, setConfirmNewPassword,
        // Handlers
        handleLogin,
        handleRegister,
        handleResetPassword,
        handleConfirmReset,
        handleBackToLogin,
    }
}
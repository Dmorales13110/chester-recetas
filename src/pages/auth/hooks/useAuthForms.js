import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const useAuthForms = () => {
    const [activeTab, setActiveTab] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [resetEmail, setResetEmail] = useState('')
    const [resetStep, setResetStep] = useState('request')
    const [resetCode, setResetCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        setTimeout(() => {
            const result = login(email, password)
            if (result.success) {
                navigate('/admin', { replace: true })
            } else {
                setError(result.error)
            }
            setLoading(false)
        }, 1500)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setLoading(true)

        setTimeout(() => {
            setSuccess('¡Cuenta creada exitosamente! Redirigiendo al login...')
            setLoading(false)
            setTimeout(() => {
                setActiveTab('login')
                setSuccess('')
            }, 2000)
        }, 1500)
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        setTimeout(() => {
            setResetStep('sent')
            setLoading(false)
        }, 1500)
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

        setTimeout(() => {
            setResetStep('confirm')
            setSuccess('¡Contraseña actualizada exitosamente!')
            setLoading(false)
        }, 1500)
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
import { Lock, Mail, User2Icon } from 'lucide-react'
import React, { useState } from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/feature/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const query = new URLSearchParams(window.location.search)
  const urlstate = query.get('state')
  const [state, setState] = useState(urlstate || "login")
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (state === "login") {
        // Login request
        const { data } = await api.post('/api/users/login', {
          email: formData.email,
          password: formData.password
        })

        if (data.token) {
          localStorage.setItem('token', data.token)
          dispatch(login({ token: data.token, user: data.user }))
          toast.success(data.message || 'Login successful!')
          navigate('/app')
        }
      } else {
        // Register request
        const { data } = await api.post('/api/users/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        })

        if (data.token) {
          localStorage.setItem('token', data.token)
          dispatch(login({ token: data.token, user: data.user }))
          toast.success(data.message || 'Registration successful!')
          navigate('/app')
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong!'
      toast.error(errorMessage)
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const toggleState = () => {
    setState(prev => prev === "login" ? "register" : "login")
    setFormData({ name: '', email: '', password: '' })
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Please {state === "login" ? "login" : "sign up"} to continue
        </p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color='#6B7280' />
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              className="border-none outline-none ring-0 w-full pr-4" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color='#6B7280' />
          <input 
            type="email" 
            name="email" 
            placeholder="Email address" 
            className="border-none outline-none ring-0 w-full pr-4" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={13} color='#6B7280' />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            className="border-none outline-none ring-0 w-full pr-4" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            minLength={6}
          />
        </div>

        {state === "login" && (
          <div className="mt-4 text-left text-green-500">
            <button className="text-sm hover:underline" type="button">
              Forgot password?
            </button>
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            state === "login" ? "Login" : "Sign up"
          )}
        </button>

        <p className="text-gray-500 text-sm mt-3 mb-11">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            type="button"
            onClick={toggleState} 
            className="text-green-500 hover:underline font-medium"
          >
            {state === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login
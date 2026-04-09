import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Preview from './pages/Preview'
import Login from './pages/Login' // Fixed: removed '../src'
import Layout from './pages/Layout'
import ResumeBuilder from './pages/ResumeBuilder'
import Home from './pages/Home'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/feature/authSlice'
import { useEffect, useCallback } from 'react'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch()
  
  const getUserData = useCallback(async () => {
    const token = localStorage.getItem('token')
    try {
      if(token) {
        const {data} = await api.get('/api/users/data', {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if(data.user) {
          dispatch(login({token, user: data.user}))
        }
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch {
      dispatch(setLoading(false))
      localStorage.removeItem('token')
    }
  }, [dispatch])
   
  useEffect(() => {
    getUserData()
  }, [getUserData])
  
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* ADDED: Login route */}
        <Route path="/app" element={<Layout />}> {/* ADDED: leading slash */}
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          <Route path="view/:resumeId" element={<Preview />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
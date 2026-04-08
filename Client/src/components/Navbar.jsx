import { LogOut } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../app/feature/authSlice'
import { toast } from 'react-toastify'

const Navbar = () => {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const logoutUser = () => {
        dispatch(logout())
        toast.success('Logged out successfully!')
        navigate('/')
    }

    return (
        <div className='shadow bg-white'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
                <div 
                    onClick={() => navigate('/app')} 
                    className='cursor-pointer'
                >
                    <img src='/logo.svg' alt="logo" className='h-11 w-auto' />
                </div>
                <div className='flex items-center gap-4 text-sm'>
                    <p className='max-sm:hidden'>Hi, {user?.name || 'User'}</p>
                    <button 
                        onClick={logoutUser} 
                        className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all flex items-center gap-2'
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
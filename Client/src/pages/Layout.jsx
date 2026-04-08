import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from 'lucide-react'
import Login from './Login'
import Navbar from '../components/Navbar' 

const Layout = () => {
  const {user, loading} = useSelector(state => state.auth)
  
  if(loading){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    )
  } 
  
  return (
    <div>
      {
        user ? (
          <div className='min-h-screen bg-gray-50'>
            <Navbar/>
            <Outlet/>
          </div>
        ) : <Login/>
      }
    </div>
  )
}

export default Layout
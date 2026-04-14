import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Menu, X } from 'lucide-react'
import { dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'

const Layout = () => {
  const user = dummyUserData
  const [sidebaropen, setSidebarOpen] = useState(false)
  return user ? (
    <div className='w-full flex h-screen'>
     <Sidebar sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
     <div className="flex-1 bg-slate-50">
      <Outlet />
     </div>
     {
      sidebaropen ? 
      <X className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={()=> setSidebarOpen(false)} />
      :
      <Menu onClick={()=>setSidebarOpen(true)} className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' />
     }
    </div>
  ) : (
    <Loading />
  )
}

export default Layout

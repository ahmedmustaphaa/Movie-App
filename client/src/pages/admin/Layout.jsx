import React from 'react'
import Adminnavbar from '../../component/admin/Adminnavbar'
import Adminsidbar from '../../component/admin/Adminsidbar'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div >
    <Adminnavbar/>
    <div className='flex'>
    <Adminsidbar/>
    <div className='flex-1 px-4 py-10 mx:px-10 h-[calc (100vh-64px)] overflow-y-auto'>
  <Outlet></Outlet>
    </div>
    </div>
    </div>
  )
}

export default Layout
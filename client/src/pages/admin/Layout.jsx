import React from 'react'
import Adminnavbar from '../../component/admin/Adminnavbar'
import Adminsidbar from '../../component/admin/Adminsidbar'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <Adminnavbar />
      <div className="flex flex-1">
        <Adminsidbar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout

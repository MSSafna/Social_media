import React from 'react'
import Sidebar from './Components/Users/Sidebar/Sidebar'
import { Outlet } from 'react-router'
import Right from './Components/Users/RightBar/Right'
function Layout() {
  return (
    <div className="mt-5  ">
      <div className="flex  ">
        <Sidebar />
        <div className="w-full mt-2 ">
          <Outlet />
        </div >
        {/* <Right /> */}
      </div>
    </div>

    
  )
}

export default Layout

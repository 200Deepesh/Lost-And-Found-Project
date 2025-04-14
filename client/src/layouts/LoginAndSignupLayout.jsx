import React from 'react'
import { Outlet } from 'react-router'

const LoginAndSignupLayout = () => {
  return (
    <>
      <div className='w-full h-full flex'>
        <div className='h-full w-1/2'>
          <div>LoginAndSignupLayout</div>
          <Outlet />
        </div>
        <div className='h-full w-1/2 relative bg-[#5849B0] overflow-hidden rounded-l-3xl'>
          <img src="/background.png" alt="" className='h-full w-full blur-md absolute opacity-30 top-0 left-0'/>
        </div>
      </div>
    </>
  )
}

export default LoginAndSignupLayout
import React, { useEffect } from 'react'
import { NavLink } from 'react-router'
import logo from '/logo.png'
import { useState } from 'react'
import { useUserStore } from '../store'

const Navbar = () => {

  const userId = useUserStore((state) => state.userId)

  const [textColor, setTextColor] = useState('')
  useEffect(() => {
    const color = window.location.pathname == '/' ? 'black' : 'white';
    setTextColor(color)
  }, [])


  return (
    <>
      <nav className='flex justify-between items-center px-4 py-2 fixed w-dvw z-100 font-poppins' style={{ color: textColor }}>
        <div className='flex gap-1 items-center'>
          <img src={logo} alt="" className='w-6 h-6' />
          <span className='font-mrounded font-bold text-xl'>Findoro</span>
        </div>
        <div className='flex items-center gap-4'>
          <ul className='flex gap-4'>
            <NavLink to='/' className={({ isActive }) => isActive ? "font-medium" : "font-light"} onClick={(isActive) => { if (isActive && textColor != 'black') setTextColor('black') }}>
              <li className='text-sm'>Home</li>
            </NavLink>
            <NavLink to='/lost' className={({ isActive }) => isActive ? "font-medium" : "font-light"} onClick={(isActive) => { if (isActive && textColor != 'white') setTextColor('white') }}>
              <li className='text-sm '>Lost</li>
            </NavLink>
            <NavLink to='/found' className={({ isActive }) => isActive ? "font-medium" : "font-light"} onClick={(isActive) => { if (isActive && textColor != 'white') setTextColor('white') }}>
              <li className='text-sm'>Found</li>
            </NavLink>
          </ul>
          {!userId && (
            <div className='flex gap-4 items-center'>
              <NavLink to='/signin'><button className='bg-[#594AB1] rounded-full text-xs px-4 py-1 text-white font-light cursor-pointer'>Login</button></NavLink>
              <NavLink to='/signup'><button className='bg-[#5A7DC2] rounded-full text-xs px-4 py-1 text-white font-light cursor-pointer'>Signup</button></NavLink>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
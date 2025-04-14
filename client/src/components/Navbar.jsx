import React from 'react'
import { NavLink } from 'react-router'
import logo from '/logo.png'

const Navbar = () => {
  return (
    <>
      <nav className='flex justify-between items-center px-4 py-2 fixed w-dvw z-100'>
        <div className='flex gap-1 items-center'>
          <img src={logo} alt="" className='w-6 h-6' />
          <span className='font-mrounded font-bold text-xl'>Findoro</span>
        </div>
        <div className='flex items-center gap-4'>
          <ul className='flex gap-4'>
            <NavLink to='/' className={({ isActive }) => isActive ? "font-medium" : "font-thin"}><li className='text-sm'>Home</li></NavLink>
            <NavLink to='/lost' className={({ isActive }) => isActive ? "font-medium" : "font-thin"}><li className='text-sm '>Lost</li></NavLink>
            <NavLink to='/found' className={({ isActive }) => isActive ? "font-medium" : "font-thin"}><li className='text-sm'>Found</li></NavLink>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
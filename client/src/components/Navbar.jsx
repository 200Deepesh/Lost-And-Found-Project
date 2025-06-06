import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import logo from '/logo.png';
import { useUserStore } from '../store';
import ProfileLogo from './subComponents/ProfileLogo';

const Navbar = ({ theme }) => {

  const userId = useUserStore((state) => state.userId)

  const [textColor, setTextColor] = useState('')
  useEffect(() => {
    const color = theme == 'light' ? 'black' : 'white';
    setTextColor(color)
  }, [])


  return (
    <>
      <nav className='flex justify-between items-center min-[28rem]:px-4 px-2 py-2 w-dvw z-100 font-poppins absolute top-0' style={{ color: textColor }}>
        <div className='flex gap-1 items-center'>
          <img src={logo} alt="" className='w-6 h-6' />
          <span className='font-mrounded font-bold text-xl'>Findoro</span>
        </div>
        <div className='flex items-center min-[28rem]:gap-4 gap-2'>
          <ul className='flex sm:gap-4 gap-2'>
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
          <div className='flex sm:gap-4 gap-2 items-center'>
            {!userId
              ? (<>
                <NavLink to='/signin'><button className='bg-[#594AB1] rounded-full text-xs min-[28rem]:px-4 px-3 py-1 text-white font-light cursor-pointer'>Login</button></NavLink>
                <NavLink to='/signup'><button className='bg-[#5A7DC2] rounded-full text-xs min-[28rem]:px-4 px-3 py-1 text-white font-light cursor-pointer'>Signup</button></NavLink>
              </>)
              : (<> <ProfileLogo /></>)}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
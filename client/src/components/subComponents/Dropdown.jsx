import React from 'react'
import { useState, useRef } from 'react'
import { Link } from 'react-router'
import downArrow from '/downArrow.svg'
import { removeCookies } from '../../api/cookies'
import { getCookies } from '../../api/cookies'
import { useUserStore } from '../../store'
import accountSvg from '/account.svg'


const Dropdown = () => {
    const user = JSON.parse(getCookies('user'))
    const [display, setDisplay] = useState(false);
    const timeoutRef = useRef(null);
    const setUserId = useUserStore((state)=> state.setUserId)

    const signOut = ()=>{
        removeCookies('user')
        setUserId(null)
    }

    return (
        <>
            <div className='relative w-fit'
                onMouseEnter={(e) => { clearTimeout(timeoutRef.current); setDisplay(true) }}
                onMouseLeave={async (e) => { clearTimeout(timeoutRef.current); timeoutRef.current = setTimeout(() => { setDisplay(false) }, 500); }}>
                <button
                    className='bg-white rounded-full'>
                    <img src={accountSvg} alt="" className='w-8' />
                </button>
                {display && <div className='absolute flex-col bg-gray-800 min-w-full py-2 rounded-lg mt-0.5 z-10 w-20 left-[-120%]'>
                    <Link to={`/user/${user.emailId}`}><div className='text-white px-2 py-1 text-xs hover:bg-gray-700'>Your page</div></Link>
                    <div className='text-white px-2 py-1 text-xs hover:bg-gray-700 cursor-pointer' onClick={signOut}>Logout</div>
                </div>
                }
            </div>
        </>
    )
}

export default Dropdown
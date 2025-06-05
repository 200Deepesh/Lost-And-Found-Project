import React from 'react'
import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { removeCookies, setCookies } from '../../api/cookies'
import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from '../../store'
import accountSvg from '/account.svg'


const ProfileLogo = () => {

    const [display, setDisplay] = useState(false);
    const timeoutRef = useRef(null);
    const { setUserId, userId } = useUserStore(
        useShallow((state) => (
            {
                setUserId: state.setUserId,
                userId: state.userId,
            })));

    const signOut = () => {
        removeCookies('user')
        setUserId(null)
        removeCookies('sessionId')
    }

    return (
        <>
            <div className='relative w-fit'
                onMouseEnter={(e) => { clearTimeout(timeoutRef.current); setDisplay(true) }}
                onMouseLeave={async (e) => { clearTimeout(timeoutRef.current); timeoutRef.current = setTimeout(() => { setDisplay(false) }, 500); }}>
                <Link
                    to={`/user/${userId}`}>
                    <button
                        className='bg-white rounded-full'>
                        <img src={accountSvg} alt="" className='w-8' />
                    </button>
                </Link>
                {display && <div className='absolute flex-col bg-[#ebebebee] text-black min-w-full py-2 rounded-lg mt-0.5 z-10 w-20 left-[-120%]'>
                    <Link
                        to={`/user/${userId}`}>
                        <div
                            className='px-2 py-1 text-xs hover:bg-gray-100'>
                            Your page
                        </div>
                    </Link>
                    <div
                        className='px-2 py-1 text-xs hover:bg-gray-100 cursor-pointer'
                        onClick={signOut}>
                        Logout
                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default ProfileLogo
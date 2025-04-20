import React from 'react'
import Searchbar from './searchbar'
import { useNavigate } from 'react-router'
import Navbar from './Navbar'


const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar/>
      <div className='h-full w-full overflow-hidden'>
        <div className='h-full w-full pt-12 relative bg-[#ffffff] overflow-hidden flex items-center justify-center flex-col'>
          <img src="/background.png" alt="" className='h-full w-full blur-sm absolute opacity-50 top-0 left-0' />
          <div className='flex flex-col relative z-10 w-fit items-center justify-center gap-8'>
            <div className='w-fit flex items-center flex-col gap-2'>
              <h1 className='font-mrounded text-4xl font-black text-black'>Helping people reconnect</h1>
              <h1 className='font-mrounded text-4xl font-black text-black'>with what matters most</h1>
            </div>
            <div className='w-full flex items-center flex-col gap-4'>
              <div className='w-96'><Searchbar /></div>
              <div className='flex gap-4 items-center justify-between w-full'>
                <button onClick={() => { navigate('/lost') }} className='w-44 h-12 bg-[#594AB1CC] text-white flex items-center justify-center rounded-2xl cursor-pointer'>Lost Something ?</button>
                <button onClick={() => { navigate('/lost') }} className='w-44 h-12 bg-[#594AB1CC] text-white flex items-center justify-center rounded-2xl cursor-pointer'>Found Something ?</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
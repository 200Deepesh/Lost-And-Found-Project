import React from 'react'
import Searchbar from './searchbar'


const Home = () => {
  return (
    <>
      <div className='h-full w-full overflow-hidden'>
        <div className='h-full w-full pt-12 relative bg-[#ffffff] overflow-hidden'>
          <img src="/background.png" alt="" className='h-full w-full blur-sm absolute opacity-50 top-0 left-0' />
          <Searchbar/>
          <div>Home</div>
        </div>
      </div>
    </>
  )
}

export default Home
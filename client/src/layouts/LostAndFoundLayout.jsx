import React from 'react'
import { useParams } from 'react-router'
import Notfound from '../components/notfound';
import Filters from '../components/Filters';
import { FilterContextProvider } from '../components/Context';
import { createContext, useState } from 'react';


const LostAndFoundLayout = () => {
  const { page } = useParams();



  if (page != 'lost' && page != 'found') {
    return <Notfound />
  }

  return (
    <>
      <div className='h-full w-full overflow-hidden'>
        <div className='h-2/3 w-full pt-12 relative bg-[#5849B0] -z-10' style={{ boxShadow: '0px 40px 30px 20px #5849B0' }}>
          <img src="/background.png" alt="" className='h-[calc(100%+40px)] w-full blur-md absolute opacity-30 top-0 left-0' />
          <div>params is {page}</div>
          <div>in LostAndFoundLayout</div>
        </div>
        <div>
          <div id="left">
            <FilterContextProvider>
              <Filters />
            </FilterContextProvider>
          </div>
          <div id="right">
          </div>
        </div>
      </div>
    </>
  )
}

export default LostAndFoundLayout
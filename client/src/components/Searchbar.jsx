import React from 'react'
import searchPng from '/search.png'
import { useEffect } from 'react'




const Searchbar = () => {

    useEffect(() => {
      console.log('search bar is rendered')
    })
    

    return (
        <div className='flex px-1 py-1 bg-white rounded-full z-10 relative max-w-96 w-4/5 h-8'>
            <form action="" className='flex items-center justify-between w-full h-full'>
                <input type="text" className='flex flex-1' name='query'/>
                <button className='w-6 h-6 rounded-full flex items-center justify-center' type='submit'>
                    <img src={searchPng} alt="" className='w-3 h-3' />
                </button>
            </form>
        </div>
    )
}

export default Searchbar
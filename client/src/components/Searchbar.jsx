import React from 'react'
import searchPng from '/search.png'
import { useEffect } from 'react'




const Searchbar = () => {

    const search = async (formData)=>{
        'use server'
        const query = formData.get('query')
        // POST REQUEST TO SERVER WITH QUERY
        console.log(`search query is ${query} from ${window.location.pathname}`)
    }
    

    return (
        <div className='flex px-1 py-1 bg-white rounded-full z-10 relative w-full h-8'>
            <form action={search} className='flex items-center justify-between w-full h-full pl-2'>
                <input type="text" className='flex flex-1 focus-visible:outline-0' name='query'/>
                <button className='w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#e6e3ff]' type='submit'>
                    <img src={searchPng} alt="" className='w-3 h-3' />
                </button>
            </form>
        </div>
    )
}

export default Searchbar
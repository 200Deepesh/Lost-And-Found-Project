import React from 'react'
import { useParams } from 'react-router'
import Notfound from '../components/notfound';
import Filters from '../components/Filters';
import Searchbar from '../components/searchbar';
import arrowPng from '/arrow.png'
import Navbar from '../components/Navbar';
import ItemCard from '../components/subComponents/ItemCard'


const LostAndFoundLayout = () => {
  const { page } = useParams();



  if (page != 'lost' && page != 'found') {
    return <Notfound />
  }

  return (
    <>
      <Navbar />
      <div className='h-full w-full overflow-x-auto scrollbar'>
        <div className='h-96 w-full pt-12 px-10 relative bg-[#5849B0] flex flex-col justify-evenly' style={{ boxShadow: '0px 40px 30px 20px #5849B0' }}>
          <img src="/background.png" alt="" className='h-[calc(100%+40px)] w-full blur-md absolute opacity-40 top-0 left-0' />
          <h1 className='w-fit self-center font-kalam text-5xl font-black text-black relative z-10'>{page == 'lost' ? 'कुछ खो दिए क्या?' : 'कुछ मिला है क्या ?'}</h1>
          <h2 className='w-fit self-center left-40 font-kalam text-xl font-bold text-white relative z-10'>{page == 'lost' ? 'आओ साथ में ढूंढे!!' : 'आओ इसके मालिक को ढूंढे !!'}</h2>
          <div className='flex relative z-10 items-center gap-4 w-full max-w-[48rem] self-center right-20'><div className='w-96'><Searchbar /></div><img src={arrowPng} alt="" className='h-40 w-64' /></div>
        </div>
        <div className='min-h-full flex z-100 relative gap-2'>
          <div id="left" className='min-h-full'>
            <Filters page={page} />
          </div>
          <div id="right" className='min-h-full overflow-x-auto flex flex-1'>
            <ItemCard item={{url:'/item.png', name:'name', date:'date', location:'location', discription:'discription'}} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LostAndFoundLayout
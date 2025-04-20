import React from 'react'
import { useParams } from 'react-router'
import Notfound from '../components/notfound';
import Filters from '../components/Filters';
import Searchbar from '../components/searchbar';
import arrowPng from '/arrow.png'
import Navbar from '../components/Navbar';


const LostAndFoundLayout = () => {
  const { page } = useParams();



  if (page != 'lost' && page != 'found') {
    return <Notfound />
  }

  return (
    <>
      <Navbar/>
      <div className='h-full w-full overflow-hidden'>
        <div className='h-60 w-full pt-12 px-10 relative bg-[#5849B0] flex flex-col justify-evenly' style={{ boxShadow: '0px 40px 30px 20px #5849B0' }}>
          <img src="/background.png" alt="" className='h-[calc(100%+40px)] w-full blur-md absolute opacity-40 top-0 left-0' />
          <h1 className='w-fit self-center font-kalam text-5xl font-black text-black relative z-10'>{page=='lost'?'कुछ खो दिए क्या?':'कुछ मिला है क्या ?'}</h1>
          <h2 className='w-fit self-center left-40 font-kalam text-xl font-bold text-white relative z-10'>{page=='lost'?'आओ साथ में ढूंढे!!':'आओ इसके मालिक को ढूंढे !!'}</h2>
          <div className='flex relative z-10 items-center gap-4 w-full max-w-[48rem] self-center right-20'><div className='w-96'><Searchbar/></div><img src={arrowPng} alt="" className='h-40 w-64'/></div>
        </div>
        <div className='h-2/3 flex z-10 relative'>
          <div id="left" className='h-full'>
              <Filters page={page}/>
          </div>
          <div id="right">
          </div>
        </div>
      </div>
    </>
  )
}

export default LostAndFoundLayout
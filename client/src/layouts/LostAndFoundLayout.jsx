import React, { useState } from 'react'
import { useParams } from 'react-router'
import Notfound from '../components/notfound';
import Filters from '../components/Filters';
import Searchbar from '../components/searchbar';
import arrowPng from '/arrow.png'
import Navbar from '../components/Navbar';
import ItemCard from '../components/subComponents/ItemCard'
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useItemStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import ItemsInfo from '../components/ItemsInfo';
import addPng from '/add.png'
import { getItems } from '../api/items';


const LostAndFoundLayout = () => {
  const navigate = useNavigate()
  const [itemInfo, setItemInfo] = useState()
  const location = useLocation()
  const { items, setItems } = useItemStore(
    useShallow((state) => ({ items: state.items, setItems: state.setItems }))
  )

  useEffect(() => {
    const page = location.pathname.split('/')[1];

    // GET REQUEST TO SERVER FOR ITEM DATA WITH TYPE
    (async () => {
      const itemList = await getItems(page)
      setItems(itemList)
      console.log(items)
    }
    )()

  }, [location])

  const { page } = useParams();



  if (page != 'lost' && page != 'found') {
    return <Notfound />
  }

  return (
    <>
      <div className='h-full w-full overflow-x-auto scrollbar'>
        <div className='h-96 w-full pt-12 relative bg-[#5849B0] flex flex-col justify-evenly' style={{ boxShadow: '0px 40px 30px 20px #5849B0' }}>
          <Navbar />
          <img src="/background.png" alt="" className='h-[calc(100%+40px)] w-full blur-md absolute opacity-40 top-0 left-0' />
          <h1 className='w-fit self-center font-kalam text-5xl font-black text-black relative z-10'>{page == 'lost' ? 'कुछ खो दिए क्या?' : 'कुछ मिला है क्या ?'}</h1>
          <h2 className='w-fit self-center left-40 font-kalam text-xl font-bold text-white relative z-10'>{page == 'lost' ? 'आओ साथ में ढूंढे!!' : 'आओ इसके मालिक को ढूंढे !!'}</h2>
          <div className='flex relative z-10 items-center gap-4 w-full max-w-[48rem] self-center right-20'><div className='w-96'><Searchbar /></div><img src={arrowPng} alt="" className='h-40 w-64' /></div>
        </div>
        <div className='h-fit flex z-100 relative gap-2'>
          <div id="left" className='min-h-full flex flex-col gap-1'>
            <div onClick={() => { navigate(`/add/${page}`) }} className='flex bg-black text-white font-poppins text-xs items-center rounded-r-full p-1 cursor-pointer'>
              <span className='flex flex-1 justify-center'>Add {page.charAt(0).toUpperCase() + page.slice(1)} Item</span>
              <img src={addPng} alt="" className='w-10' />
            </div>
            <div className='flex flex-1'>
              <Filters page={page} />
            </div>
          </div>
          <div id="right" className='min-h-full overflow-x-auto grid-cols-4 grid gap-2 m-auto'>
            {items.map((item) => { return <ItemCard item={item} key={item.id} selectItem={setItemInfo} /> })}
            <ItemCard item={{ url: '/item.png', name: 'name', date: 'date', location: 'location', discription: 'discription' }} />
          </div>
        </div>
        {itemInfo && <ItemsInfo itemInfo={itemInfo} deselectItem={() => { setItemInfo(null) }} />}
      </div>
    </>
  )
}

export default LostAndFoundLayout
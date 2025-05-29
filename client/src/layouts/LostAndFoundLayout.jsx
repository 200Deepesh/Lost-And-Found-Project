import React, { useState, useRef } from 'react'
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
import FilterOnSvg from '/filter.svg'
import FilterOffSvg from '/filterOff.svg'


const LostAndFoundLayout = () => {
  const navigate = useNavigate()
  const filterBar = useRef(null)
  const filterDisplayBtn = useRef(null)
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
      console.log(items[0]?.itemInfo)
    }
    )()

  }, [location])

  const { page } = useParams();



  if (page != 'lost' && page != 'found') {
    return <Notfound />
  }

  return (
    <>
      <div
        className='h-full w-full overflow-x-auto scrollbar'>
        <div
          className='sm:h-96 h-72 w-full pt-12 relative bg-[#5849B0] flex flex-col justify-evenly'
          style={{ boxShadow: '0px 40px 30px 20px #5849B0' }}>
          <Navbar theme='dark' />
          <img
            src="/background.png"
            alt=""
            className='h-[calc(100%+40px)] w-full blur-md absolute opacity-40 top-0 left-0' />
          <h1
            className='w-fit self-center font-kalam sm:text-5xl text-4xl font-black text-black relative z-10'>
            {page == 'lost' ? 'कुछ खो दिए क्या ?' : 'कुछ मिला है क्या ?'}
          </h1>
          <h2
            className='w-fit self-center sm:left-40 left-20 font-kalam text-xl font-bold text-white relative z-10'>
            {page == 'lost' ? 'आओ साथ में ढूंढे !!' : 'आओ इसके मालिक को ढूंढे !!'}
          </h2>
          <div
            className='flex relative z-10 items-center gap-4 w-full max-w-[48rem] self-center lg:right-20 pl-4'>
            <div className='lg:w-96 w-80'><Searchbar /></div>
            <img src={arrowPng} alt="" className='h-40 lg:w-64 w-52 hidden sm:inline' />
          </div>
        </div>
        <div
          className='h-dvh flex z-100 relative gap-2 overflow-hidden md:flex-row flex-col'>
          <div id="left"
            className='md:min-h-full md:w-fit w-full flex gap-1 sticky top-0 flex-row md:flex-col justify-between items-center'>
            <div
              onClick={() => { navigate(`/add/${page}`) }}
              className='flex bg-black text-white font-poppins text-xs items-center rounded-r-full p-1 cursor-pointer md:min-w-56 min-w-48'>
              <span
                className='flex flex-1 justify-center'>
                Add {page.charAt(0).toUpperCase() + page.slice(1)} Item
              </span>
              <img src={addPng} alt="" className='w-10' />
            </div>
            <div
              className='md:hidden bg-white flex items-center justify-center py-1 px-1 rounded-full mr-2 cursor-pointer h-fit'
              onClick={(e) => {
                let status = filterBar.current.dataset.isvisible
                filterBar.current.style.left = status == 0 ? 0 : '-100%'
                filterBar.current.dataset.isvisible = status == 0 ? 1 : 0
                filterDisplayBtn.current.src = filterBar.current?.dataset?.isvisible == 0 ? FilterOnSvg : FilterOffSvg
              }}>
              <img ref={filterDisplayBtn} src={FilterOnSvg} alt="" className='w-6' />
            </div>
            <div
              ref={filterBar}
              data-isvisible={0} // 0-> hidden  || 1-> vissible
              className='flex flex-1 md:relative md:left-0 absolute -left-full max-md:top-[calc(100%+0.25rem)] min-h-dvh max-md:h-1'>
              <Filters page={page} />
            </div>
          </div>
          <div id="right" className='h-full w-full overflow-x-auto gap-2 m-auto'>
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
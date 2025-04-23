import React, { useState } from 'react'
import { useParams } from 'react-router'
import Notfound from '../components/notfound';
import Filters from '../components/Filters';
import Searchbar from '../components/searchbar';
import arrowPng from '/arrow.png'
import Navbar from '../components/Navbar';
import ItemCard from '../components/subComponents/ItemCard'
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useItemStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import ItemsInfo from '../components/ItemsInfo';


const LostAndFoundLayout = () => {
  const [itemInfo, setItemInfo] = useState()
  const location = useLocation()
  const { items, setItems } = useItemStore(
    useShallow((state) => ({ items: state.items, setItems: state.setItems }))
  )

  const data = {
    lost: [
        {name: 'phone', date: '12/4/2025', location: 'Canteen', discription: 'discription', type: 'lost', url:'/item.png', contactInfo: { name: 'Dev Varma', branch: 'AIDS', sem: '2nd', phoneNo: '2463XXXXXX', emailId: 'contact@gmail.com'}},
        {name: 'wallet', date: '12/4/2025', location: 'Canteen', discription: 'discription', type: 'lost', url:'/item.png', contactInfo: { name: 'Dev Varma', branch: 'AIDS', sem: '2nd', phoneNo: '2463XXXXXX', emailId: 'contact@gmail.com'}},
        {name: 'assinment', date: '12/4/2025', location: 'Canteen', discription: 'discription', type: 'lost', url:'/item.png', contactInfo: { name: 'Dev Varma', branch: 'AIDS', sem: '2nd', phoneNo: '2463XXXXXX', emailId: 'contact@gmail.com'}},
        {name: 'bag', date: '12/4/2025', location: 'Canteen', discription: 'discription', type: 'lost', url:'/item.png', contactInfo: { name: 'Dev Varma', branch: 'AIDS', sem: '2nd', phoneNo: '2463XXXXXX', emailId: 'contact@gmail.com'}},
        {name: 'pen', date: '12/4/2025', location: 'Canteen', discription: 'discription', type: 'lost', url:'/item.png', contactInfo: { name: 'Dev Varma', branch: 'AIDS', sem: '2nd', phoneNo: '2463XXXXXX', emailId: 'contact@gmail.com'}},
    ],
    found: [
        {name: 'phone', date: '12/4/2025', location: 'Canteen', discription: 'discription', type: 'lost', url:'/item.png', contactInfo: { name: 'Dev Varma', branch: 'AIDS', sem: '2nd', phoneNo: '2463XXXXXX', emailId: 'contact@gmail.com'}},
        {name: 'wallet', date: '12/4/2025', location: 'Canteen', discription: 'discription', type: 'lost', url:'/item.png', contactInfo: { name: 'Dev Varma', branch: 'AIDS', sem: '2nd', phoneNo: '2463XXXXXX', emailId: 'contact@gmail.com'}},
        {name: 'assinment', date: '12/4/2025', location: 'Canteen', discription: 'discription', type: 'lost', url:'/item.png', contactInfo: { name: 'Dev Varma', branch: 'AIDS', sem: '2nd', phoneNo: '2463XXXXXX', emailId: 'contact@gmail.com'}},
        {name: 'bag', date: '12/4/2025', location: 'Canteen', discription: 'discription', type: 'lost', url:'/item.png', contactInfo: { name: 'Dev Varma', branch: 'AIDS', sem: '2nd', phoneNo: '2463XXXXXX', emailId: 'contact@gmail.com'}},
        {name: 'pen', date: '12/4/2025', location: 'Canteen', discription: 'discription', type: 'lost', url:'/item.png', contactInfo: { name: 'Dev Varma', branch: 'AIDS', sem: '2nd', phoneNo: '2463XXXXXX', emailId: 'contact@gmail.com'}},
    ]
}
  useEffect(() => {
    const page = location.pathname.split('/')[1]
    //POST REQUEST TO SERVER FOR ITEM DATA WITH TYPE
    setItems(data[page])
    console.log(page)
  }, [location])

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
        <div className='h-fit flex z-100 relative gap-2'>
          <div id="left" className='min-h-full'>
            <Filters page={page} />
          </div>
          <div id="right" className='min-h-full overflow-x-auto grid-cols-4 grid gap-2 m-auto'>
          {items.map((item)=> { return <ItemCard item={item} key={item.name} selectItem={()=>{ setItemInfo(item); console.log(!itemInfo)}}/>})}
            <ItemCard item={{ url: '/item.png', name: 'name', date: 'date', location: 'location', discription: 'discription' }} />
          </div>
        </div>
      { itemInfo && <ItemsInfo itemInfo={itemInfo} deselectItem={()=>{ setItemInfo(null)}}/>}
      </div>
    </>
  )
}

export default LostAndFoundLayout
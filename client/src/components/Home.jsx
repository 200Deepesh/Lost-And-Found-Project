import { useEffect, useState } from 'react';
import Searchbar from './searchbar';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import RecentItemsCard from './subComponents/RecentItemsCard';
import Footer from './Footer';
import { getRecentItem } from '../api/items';
import { useShallow } from 'zustand/react/shallow';
import { useItemInfoStore } from '../store';


const Home = () => {

  const [recentItems, setRecentItems] = useState({
    lost: [],
    found: []
  });
  const { itemId, setItemId } = useItemInfoStore(
    useShallow((state) => (
      {
        itemId: state.itemId,
        setItemId: state.setItemId,
      }))
  );
  const navigate = useNavigate();

  useEffect(() => {
    //POST REQUEST IN SERVER FOR RECENT LOST AND FOUND DATA

    (async () => {
      const items = await getRecentItem();
      setRecentItems(items);
    })();

  }, []);


  return (
    <>
      <div
        className='h-full w-full overflow-y-auto scrollbar-hidden'>
        <div
          className='h-full w-full max-h-[40rem] pt-12 relative bg-[#ffffff] overflow-hidden flex items-center justify-center flex-col'>
          <Navbar theme='light' />
          <img
            src="/background.png"
            alt=""
            className='h-full w-full blur-sm absolute opacity-50 top-0 left-0' />
          <div
            className='flex flex-col relative z-10 w-fit items-center justify-center gap-8'>
            <div
              className='w-fit flex items-center flex-col gap-2'>
              <h1
                className='font-mrounded sm:text-4xl text-3xl font-black text-black text-center'>
                Helping people reconnect
              </h1>
              <h1
                className='font-mrounded sm:text-4xl text-3xl font-black text-black text-center'>
                with what matters most
              </h1>
            </div>
            <div
              className='w-full flex items-center flex-col gap-4'>
              <div
                className='w-96'>
                <Searchbar />
              </div>
              <div
                className='flex gap-4 items-center justify-between w-full'>
                <button
                  onClick={() => { navigate('/lost') }}
                  className='w-44 h-12 bg-[#594AB1CC] text-white flex items-center justify-center rounded-2xl cursor-pointer'>
                  Lost Something ?
                </button>
                <button
                  onClick={() => { navigate('/lost') }}
                  className='w-44 h-12 bg-[#594AB1CC] text-white flex items-center justify-center rounded-2xl cursor-pointer'>
                  Found Something ?
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className='w-full flex items-center justify-center'>
          <div
            className='flex justify-between gap-4 p-4 lg:w-4/5 min-[60rem]:w-11/12 min-[52rem]:w-full w-fit flex-col min-[52rem]:flex-row'>
            <div
              className='flex gap-4 flex-col'>
              <h3
                className='text-[#90A2C6] font-mrounded font-bold text-xl flex justify-center'>
                Recent found items

              </h3>
              <div
                className='grid grid-cols-2 gap-y-2 gap-x-3'>
                {recentItems.found.map((item) => <RecentItemsCard key={item._id} item={item} selectItem={() => { setItemId(item._id) }} />)}
              </div>
            </div>
            <div
              className='w-[2px] flex bg-[#90A2C6] rounded-full'></div>
            <div
              className='flex gap-4 flex-col'>
              <h3
                className='text-[#90A2C6] font-mrounded font-bold text-xl flex justify-center'>Recent lost items</h3>
              <div
                className='grid  grid-cols-2 gap-y-2 gap-x-3'>
                {recentItems.lost.map((item) => <RecentItemsCard key={item._id} item={item} selectItem={() => { setItemId(item._id) }} />)}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home

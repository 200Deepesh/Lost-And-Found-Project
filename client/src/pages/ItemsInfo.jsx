import { useEffect, useState } from 'react';
import phonePng from '/phone.png';
import mailPng from '/mail.png';
import locationPng from '/location_on.png';
import todayPng from '/today.png';
import CloseBtn from '../components/subComponents/CloseBtn';
import { useNavigate } from 'react-router';
import { getItemByID } from '../api/items';

const ItemsInfo = ({ itemId, deselectItem, isTrusted }) => {
    const navigate = useNavigate()
    const [itemInfo, setItemInfo] = useState();
    console.log("ItemsInfo is rendered", isTrusted);
    
    useEffect(() => {
        (async () => {
            const itemInfo = await getItemByID(itemId);
            setItemInfo(itemInfo);
            console.log("fetch data from ItemsInfo");
        })()
    },[])


    return (
        <>
            {itemInfo &&
                <div className='w-full h-full absolute top-0 left-0 flex overflow-y-auto md:items-center py-2 justify-center z-[1000] bg-[#7e7e7e54]  backdrop-blur-xl'>
                    <div className='bg-white w-fit h-fit rounded-lg overflow-hidden'>
                        <div className='flex justify-between'>
                            <div className='px-4 py-2 rounded-br-lg text-white w-fit' style={{ backgroundColor: (itemInfo.initialStatus == 'lost') ? '#E65D5D' : '#6ac25a' }}>{itemInfo.initialStatus.toUpperCase()}</div>
                            <CloseBtn onClick={deselectItem} />
                        </div>
                        <div className='flex font-mrounded gap-4 p-2 flex-col items-center'>
                            <div className='md:grid md:grid-cols-2 flex flex-col gap-4'>
                                <div className='w-80 h-60'>
                                    <img src={itemInfo.url} alt="" className='w-80 h-60 object-cover rounded-3xl' />
                                </div>
                                <div id='item-info-' className='flex flex-col gap-4'>
                                    <h1 className='font-bold text-2xl'>{itemInfo.itemInfo.name}</h1>
                                    <div className='flex items-center gap-2'>
                                        <img src={locationPng} alt="" className='h-6' />
                                        <span>{itemInfo.itemInfo.location}</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <img src={todayPng} alt="" className='h-6' />
                                        <span>{itemInfo.itemInfo.date}</span>
                                    </div>
                                </div>
                                <div id="contact-detail-" className='border-2 border-[#D9D9D9] rounded-2xl p-2 flex flex-col gap-1 h-fit'>
                                    <h2 className='font-semibold text-lg'>{itemInfo.studentInfo.name}</h2>
                                    <div className='text-sm'>{itemInfo.studentInfo.branch} | {itemInfo.studentInfo.sem}</div>
                                    <div className='flex items-center gap-2'>
                                        <img src={phonePng} alt="" className='h-5' />
                                        <span className='text-sm'>{itemInfo.studentInfo.phoneNo}</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <img src={mailPng} alt="" className='h-5' />
                                        <span className='text-sm'>{itemInfo.studentInfo.emailId}</span>
                                    </div>
                                </div>

                                <div className='border-2 border-[#D9D9D9] rounded-2xl w-80 min-h-28 p-1 gap-2 flex flex-col flex-1 col-start-2'>
                                    <h3 className='font-semibold text-lg'>Discription</h3>
                                    <div className='text-sm'>{itemInfo.itemInfo.discription}</div>
                                </div>
                            </div>
                            <div className='flex gap-2'>

                                <button
                                    className='bg-[#050506CF] rounded-full px-4 py-1 text-white text-xs font-poppins w-16 cursor-pointer'
                                    onClick={deselectItem}>
                                    Close
                                </button>

                                {isTrusted && <button
                                    className='bg-[#050506CF] rounded-full px-4 py-1 text-white text-xs font-poppins w-16 cursor-pointer'
                                    onClick={() => { navigate(`/add/${itemInfo.initialStatus}?id=${itemInfo._id}&edit=${true}`); }}>
                                    Edit
                                </button>}

                                <button
                                    className='bg-[#050506CF] rounded-full px-4 py-1 text-white text-xs font-poppins w-fit cursor-pointer'
                                    onClick={() => { navigate(`/message/${itemInfo._id}`); }}>
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ItemsInfo
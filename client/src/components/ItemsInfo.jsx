import React from 'react'
import { useParams } from 'react-router'
import phonePng from '/phone.png'
import mailPng from '/mail.png'
import locationPng from '/location_on.png'
import todayPng from '/today.png'

const ItemsInfo = ({ itemInfo, deselectItem }) => {

    return (
        <> 
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center z-[1000] bg-[#7e7e7e54]  backdrop-blur-xl'>
            <div className='bg-white w-fit h-fit rounded-lg overflow-hidden'>
                <div className='flex justify-between'>
                    <div className='px-4 py-2 bg-[#E65D5D] rounded-br-lg text-white w-fit'>{itemInfo.type}</div>
                    <div className='px-4 py-2 bg-[#E65D5D]  text-white w-fit cursor-pointer' onClick={deselectItem}>X</div>
                </div>
                <div className='flex font-mrounded gap-4 p-2'>
                    <div id="left" className='flex flex-col gap-4'>
                        <div className='w-80 h-60'>
                            <img src={itemInfo.url} alt="" className='w-80 h-60 object-cover rounded-3xl' />
                        </div>
                        <div id="contact-detail" className='border-2 border-[#D9D9D9] rounded-2xl p-2 flex flex-col gap-1'>
                            <h2 className='font-semibold text-lg'>{itemInfo.contactInfo.name}</h2>
                            <div className='text-sm'>{itemInfo.contactInfo.branch} | {itemInfo.contactInfo.sem}</div>
                            <div className='flex items-center gap-2'>
                                <img src={phonePng} alt="" className='h-5' />
                                <span className='text-sm'>{itemInfo.contactInfo.phoneNo}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <img src={mailPng} alt="" className='h-5' />
                                <span className='text-sm'>{itemInfo.contactInfo.emailId}</span>
                            </div>
                        </div>
                    </div>
                    <div id='right' className='flex flex-col gap-4'>
                        <h1 className='font-bold text-2xl'>{itemInfo.name}</h1>
                        <div className='flex items-center gap-2'>
                            <img src={locationPng} alt="" className='h-6' />
                            <span>{itemInfo.location}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <img src={todayPng} alt="" className='h-6' />
                            <span>{itemInfo.date}</span>
                        </div>
                        <div className='border-2 border-[#D9D9D9] rounded-2xl w-96 p-1 gap-2 flex flex-col flex-1'>
                            <h3 className='font-semibold text-lg'>Discription</h3>
                            <div className='text-sm'>{itemInfo.discription}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ItemsInfo
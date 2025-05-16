import React from 'react'

const RecentItemsCard = ({ item }) => {
    return (
        <>
            <div
                className='flex items-center border-1 box-border border-[#A7B7CE] p-1 h-24 w-48 rounded-xl font-poppins gap-2 justify-self-center'>
                <div className='h-20 w-20 rounded-xl bg-gray-400 overflow-hidden'>
                    <img src={item.url} alt="" />
                </div>
                <div className='flex flex-col justify-around h-full w-1/2'>
                    <div className='text-sm overflow-hidden whitespace-nowrap text-ellipsis '>{item.name}</div>
                    <div className='text-[10px] font-light w-full'>
                        <div className='overflow-hidden whitespace-nowrap text-ellipsis'>{item.date}</div>
                        <div className='overflow-hidden whitespace-nowrap text-ellipsis'>{item.location}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecentItemsCard
import todayPng from '/today.png';
import locationPng from '/location_on.png';

const ItemCard = ({ item, selectItem }) => {

    return (
        <div className='border border-[#C7C7CC] bg-white flex flex-col p-2 my-1 rounded-2xl w-fit h-fit font-poppins gap-1 break-inside-avoid-column mx-auto cursor-pointer' 
        onClick={selectItem}>
            <div className='w-48 h-48'>
                <img src={item.url} alt="" className='object-cover w-48 h-48' />
            </div>
            <h4 className='text-sm font-semibold'>{item.itemInfo?.name}</h4>
            <div id="info" className='flex flex-col p-2 bg-[#f5f5f5] rounded-md w-48 gap-2'>
                <div className='flex gap-2'>
                    <div className='flex items-center justify-center gap-1'>
                        <img src={todayPng} alt="" className='h-4' />
                        <span className='text-xs text-nowrap'>{item.itemInfo?.date}</span>
                    </div>
                    <div className='flex items-center justify-center gap-1'>
                        <img src={locationPng} alt="" className='h-4' />
                        <span className='text-xs text-nowrap'>{item.itemInfo?.location}</span>
                    </div>
                </div>
                <div id='discription' className='w-full h-12 overflow-hidden whitespace-wrap text-ellipsis text-xs font-light line-clamp-3'>
                    {item.itemInfo?.discription}
                </div>
            </div>
        </div>
    )
}

export default ItemCard
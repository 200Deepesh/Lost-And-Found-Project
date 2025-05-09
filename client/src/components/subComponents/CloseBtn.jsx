import React from 'react'
import closeSvg from '/close.svg'

const CloseBtn = ({ onClick }) => {
    return (
        <div className='px-2 text-white w-fit cursor-pointer flex items-center justify-center' onClick={onClick}>
            <img src={closeSvg} alt="" className='w-4' />
        </div>
    )
}

export default CloseBtn
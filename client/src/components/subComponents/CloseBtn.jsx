import React from 'react';
import closeSvg from '/close.svg';

const CloseBtn = ({ onClick, label }) => {
    return (
        <div className='px-2 text-white w-fit cursor-pointer flex items-center justify-center' onClick={onClick}>
            {label ? <span>{label}</span> : <img src={closeSvg} alt="" className='w-4' />}
        </div>
    )
}

export default CloseBtn
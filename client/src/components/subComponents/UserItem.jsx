import React from 'react'
import resolveSvg from '/resolve.svg'
import questionSvg from '/question.svg'
import editSvg from '/edit.svg'
import { getItemByID } from '../../api/items'

const UserItem = ({ name, url, initialStatus, selectItem, id }) => {

    const bgColor = {
        lost: '#E65D5D',
        found: '#6AC25A',
        resolved: '#00ccde',
    }

    return (
        <>
            <div
                className='flex items-center gap-1 w-xl max-w-full bg-gray-100 rounded-xl px-2 py-1 justify-between cursor-pointer'
                onClick={selectItem}>
                <img
                    src={url}
                    alt=""
                    className='size-10 rounded-lg' />
                <span
                    className='w-20 overflow-hidden whitespace-nowrap text-ellipsis'>
                    {name && <>{name[0].toUpperCase() + name.slice(1)}</>}
                </span>
                <div
                    className='text-xs flex items-center justify-center h-5 w-18 rounded-full text-white'
                    style={{ backgroundColor: bgColor[initialStatus] }}>
                    {initialStatus.toUpperCase()}
                </div>
                <div>
                    <img
                        src={initialStatus == 'resolved' ? resolveSvg : questionSvg}
                        alt=""
                        className='size-6' />
                </div>
            </div>
        </>
    )
}

export default UserItem
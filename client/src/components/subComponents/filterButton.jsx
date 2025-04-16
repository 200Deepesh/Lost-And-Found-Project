import React from 'react'
import { useState } from 'react'
import { useFilterContext } from '../Context'

const filterButton = ({ filtername, filtervalue }) => {

    const { updateFilters } = useFilterContext()
    let [isSelected, setIsSelected] = useState(false)

    const onClick = (e, filterName, filterValue) => {
        let type = isSelected ? 'remove' : 'add'
        updateFilters({ type: type, filterName: filterName, filterValue: filterValue })
        if (!isSelected) {
            e.target.style.fontWeight = 900
            e.target.style.border = '1px solid black'
        }
        else{
            e.target.style.fontWeight = 500
            e.target.style.border = ''
        }
        setIsSelected(!isSelected)
    }
    return (
        <>
            <button onClick={(e) => onClick(e, filtername, filtervalue)} className='bg-white rounded-full py-1 flex items-center justify-center min-w-fit font-mrounded text-xs box-border h-6'>{filtervalue}</button>
        </>
    )
}

export default filterButton
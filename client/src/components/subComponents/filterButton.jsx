import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useFilterContext } from '../Context'

const filterButton = ({ filtername, filtervalue }) => {
    const { filters, updateFilters, setIsFilterApplied } = useFilterContext()
    let [isSelected, setIsSelected] = useState(false)
    const btn = useRef(null)

    useEffect(() => {
        if (!filters.items.length && !filters.date.length && !filters.location.length) {
            btn.current.style.fontWeight = 500
            btn.current.style.border = ''
        }
        setIsSelected(false)
    }, [filters])



    const onClick = async (filterName, filterValue) => {
        setIsFilterApplied(false)
        let type = isSelected ? 'remove' : 'add'
        await updateFilters({ type: type, filterName: filterName, filterValue: filterValue })
        if (!isSelected) {
            btn.current.style.fontWeight = 900
            btn.current.style.border = '1px solid black'
        }
        else {
            btn.current.style.fontWeight = 500
            btn.current.style.border = ''
        }
        setIsSelected(!isSelected)
        console.log(filters)
    }

    return (
        <>
            <button ref={btn} onClick={() => onClick(filtername, filtervalue)} className='bg-white rounded-full py-1 flex items-center justify-center min-w-fit font-mrounded text-xs box-border h-6 cursor-pointer font-normal border-0'>{filtervalue}</button>
        </>
    )
}

export default filterButton
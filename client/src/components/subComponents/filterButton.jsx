import React from 'react'
import { useState } from 'react'
import { useFilterContext } from '../Context'

const filterButton = ({ filtername, filtervalue }) => {

    const { updateFilters } = useFilterContext()
    let [isSelected, setIsSelected] = useState(false)

    const onClick = (filterName, filterValue) => {
        let type = isSelected?'remove':'add'
        updateFilters({type: type, filterName: filterName, filterValue: filterValue})
        setIsSelected(!isSelected)
    }
    return (
        <>
            <button onClick={()=> onClick(filtername, filtervalue)}>{filtervalue}</button>
        </>
    )
}

export default filterButton
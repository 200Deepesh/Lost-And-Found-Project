import React, { useContext } from 'react'
import { useFilterContext } from './Context'
import FilterButton from './subComponents/filterButton'


const Filters = () => {

    const { filters, updateFilters } = useFilterContext()

    return (
        <>
            <div>Filters</div>
            <FilterButton filtername='items' filtervalue='keys'/>
            <div>{filters.items.map((f) => <div key={f}>{f}</div>)}</div>
        </>
    )
}

export default Filters
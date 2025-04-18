import React, { useState } from 'react'
import { useFilterContext } from './Context'
import FilterButton from './subComponents/filterButton'


const Filters = ({ page }) => {

    const { filters, updateFilters, isFilterApplied, setIsFilterApplied } = useFilterContext()

    const applyFilters = (filters, page)=>{
        //POST REQUEST TO SERVER WITH BODY {FILTERS: FILTERS, TYPE: PAGE}

        setIsFilterApplied(true);
    }

    return (
        <>
            <div className='w-56 bg-[#C9BFDD] border-t-[1.5px] border-r-[1.5px] border-white rounded-tr-xl h-full overflow-y-auto'>
                {Object.keys(preDefineFilters).map((key) => {
                    return (
                        <div key={key} className='px-1 py-2 flex flex-col gap-1'>
                            <h3 className='text-xs font-medium'>{key.toUpperCase()}</h3>
                            <div className='grid grid-cols-2 gap-0.5'>
                                {preDefineFilters[key].map((item) => {
                                    return <FilterButton key={item} filtername={key} filtervalue={item} />
                                })}
                            </div>
                        </div>
                    )
                })}

                <div className='flex justify-evenly'>
                    {((filters.items.length || filters.date.length || filters.location.length) && isFilterApplied) ? <button onClick={(e)=>{updateFilters({ type: 'clear'}); applyFilters(filters, page)}} className='flex items-center justify-center w-16 h-6 bg-white rounded-full text-xs font-medium'>clear</button> : null}
                    {(!isFilterApplied) ? <button onClick={(e)=>{applyFilters(filters, page)}} className='flex items-center justify-center w-16 h-6 bg-white rounded-full text-xs font-medium'>apply</button> : null}
                </div>
                <div>{filters.items.map((f) => <div key={f}>{f}</div>)}</div>
            </div>
        </>
    )
}

export default Filters

const preDefineFilters = {
    items: ['Wallet', 'Keys', 'Bottle', 'Watch', 'Phone', 'Earbuds'],
    location: ['Canteen', 'Mech-Dept', 'AI-Dept', 'Admin Block', 'Sports-Dept', 'Parking'],
    date: ['Today', 'Yesterdaty', 'within 5 days', 'within 10 days', 'within 20 days', 'within a month']
}
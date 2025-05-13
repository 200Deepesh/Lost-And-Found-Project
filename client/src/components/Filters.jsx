import React, { useEffect, useState } from 'react'
import FilterButton from './subComponents/filterButton'
import { useFilterStore } from '../store'
import { useShallow } from 'zustand/react/shallow'
import { getItemsUsingFilters, getItems } from '../api/items'
import { useItemStore } from '../store'


const Filters = ({ page }) => {

    const { items, location, date, updateFilters, isFilterApplied, setIsFilterApplied } = useFilterStore(
        useShallow((state) => ({
            items: state.items,
            location: state.location,
            date: state.date,
            updateFilters: state.updateFilters,
            isFilterApplied: state.isFilterApplied,
            setIsFilterApplied: state.setIsFilterApplied
        }))
    )

    const setItems = useItemStore((state) => state.setItems)


    const applyFilters = async (filters, page) => {
        //POST REQUEST TO SERVER WITH BODY {FILTERS: FILTERS, TYPE: PAGE}

        const itemList = await getItemsUsingFilters(filters, page)
        setIsFilterApplied(true);
        if (!itemList) {
            setItems([])
            return
        }
        setItems(itemList)
    }

    const clearFilters = async (page) => {
        const itemList = await getItems(page)
        setItems(itemList)
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
                                    return <FilterButton key={item} filtername={key} filtervalue={item.toLowerCase()} />
                                })}
                            </div>
                        </div>
                    )
                })}

                <div className='flex justify-evenly'>
                    {((items.length || date.length || location.length)) ? <button onClick={(e) => { updateFilters({ type: 'clear' }); clearFilters(page) }} className='flex items-center justify-center w-16 h-6 bg-white rounded-full text-xs font-medium'>clear</button> : null}
                    {(!isFilterApplied) ? <button onClick={(e) => { applyFilters({ items: items, date: date, location: location }, page) }} className='flex items-center justify-center w-16 h-6 bg-white rounded-full text-xs font-medium'>apply</button> : null}
                </div>
                {/* <div>{items.map((f) => <div key={f}>{f}</div>)}</div> */}
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
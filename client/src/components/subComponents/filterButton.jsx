import { useState, useEffect, useRef } from 'react';
import { useFilterStore } from '../../store';
import { useShallow } from 'zustand/react/shallow';

const filterButton = ({ filtername, filtervalue }) => {
    const { filter, updateFilters, displayApplyBtn, setDisplayApplyBtn } = useFilterStore(
        useShallow((state) => ({
            filter: state[filtername],
            updateFilters: state.updateFilters,
            displayApplyBtn: state.displayApplyBtn,
            setDisplayApplyBtn: state.setDisplayApplyBtn,
        }))
    )
    let [isSelected, setIsSelected] = useState()
    const btn = useRef(null)

    useEffect(() => {
    if (!filter.length) {
        btn.current.style.fontWeight = 500
        btn.current.style.border = ''
        setIsSelected(false)
    }
    }, [filter])



    const handleClick = async (filterName, filterValue) => {
        if (!displayApplyBtn) {
            setDisplayApplyBtn(true);
        }
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
        console.log(isSelected);
    }

    return (
        <>
            <button ref={btn} onClick={() => handleClick(filtername, filtervalue)} className='bg-white rounded-full py-1 flex items-center justify-center min-w-fit font-mrounded text-xs box-border h-6 cursor-pointer font-normal border-0'>{filtervalue}</button>
        </>
    )
}

export default filterButton
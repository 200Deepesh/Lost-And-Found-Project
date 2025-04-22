import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow';

export const useFilterStore = create((set) => ({
    items: [],
    location: [],
    date: [],
    isFilterApplied: true,
    updateFilters: (action) => {
        switch (action.type) {
            case 'add': set((state) => ({ [action.filterName]: [...state[action.filterName], action.filterValue] }))
                break;
            case 'remove': set((state) => ({ [action.filterName]: state[action.filterName].filter((filterValue) => filterValue !== action.filterValue) }))
                break;
            case 'clear': set((state)=>({ items: [], location: [], date:[]}))
                break;
            default: {
                throw new Error('Unknown action: ' + action.type);
            }
        }
    },
    setIsFilterApplied: (boolean) => set((state) => ({ isFilterApplied: boolean }))
}))

function BearCounter() {
    const { filters, updateFilters, isFilterApplied, setIsFilterApplied } = useFilterStore(
        useShallow((state) => ({ filters: { items: state.items, location: state.location, date: state.date }, updateFilters: state.updateFilters, isFilterApplied: state.isFilterApplied, setIsFilterApplied: state.setIsFilterApplied }))
    )
    console.log(filters)
    return filters
}







import React from 'react'
import { createContext, useContext, useReducer, useState } from 'react'

const FilterContext = createContext(null)

export const FilterContextProvider = ({ children }) => {
  
  const [isFilterApplied, setIsFilterApplied] = useState(true)

  const [filters, updateFilters] = useReducer(filterReducer, initialFilters)

  return (
    <FilterContext.Provider value={{ filters, updateFilters, setIsFilterApplied, isFilterApplied }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}

const filterReducer = (filters, action) => {
  switch (action.type) {
    case 'add': return { ...filters, [action.filterName]: [...filters[action.filterName], action.filterValue] }
    case 'remove': return { ...filters, [action.filterName]: filters[action.filterName].filter((e) => e !== action.filterValue) }
    case 'clear': {
      return {
        items: [],
        location: [],
        date: []
      }
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}

const initialFilters = {
  items: [],
  location: [],
  date: []
}
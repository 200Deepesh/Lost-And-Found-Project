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
            case 'clear': set((state) => ({ items: [], location: [], date: [] }))
                break;
            default: {
                throw new Error('Unknown action: ' + action.type);
            }
        }
    },
    setIsFilterApplied: (boolean) => set((state) => ({ isFilterApplied: boolean }))
}))

export const useSearchStore = create((set) => ({
    query: '',
    setQuery: (input) => {
        set(() => ({ query: input }))
    }
}))

export const useSignupStore = create((set) => ({
    emailId: '',
    password: '',
    name: '',
    checkbox: false,
    errors: {},
    setEmailId: (input) => {
        set(() => ({ emailId: input }))
    },
    setPassword: (input) => {
        set(() => ({ password: input }))
    },
    setName: (input) => {
        set(() => ({ name: input }))
    },
    setErrors: (input) => {
        set(() => ({ errors: input }))
    },
    setCheckbox: (input) => {
        set(() => ({ checkbox: input }))
    },
    reset: () => {
        set(()=>({
            emailId: '',
            password: '',
            name: '',
            checkbox: false,
            errors: {},
        }))
    }
}))

export const useLoginStore = create((set) => ({
    emailId: '',
    password: '',
    errors: {},
    setEmailId: (input) => {
        set(() => ({ emailId: input }))
    },
    setPassword: (input) => {
        set(() => ({ password: input }))
    },
    setErrors: (input) => {
        set(() => ({ errors: input }))
    },
    resetLoginStates: () => {
        set(()=>({
            emailId: '',
            password: '',
        }))
    }
}))


export const useItemStore = create((set) => ({
    items: [],
    setItems: (data) => {
        set(() => ({ items: data }))
    },
}))






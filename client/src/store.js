import { create } from 'zustand'

const initialFilterStates = {
    items: [],
    location: [],
    date: [],
}
export const useFilterStore = create((set) => ({

    ...initialFilterStates,

    isFilterApplied: true,
    updateFilters: (action) => {
        switch (action.type) {
            case 'add': set((state) => ({ [action.filterName]: [...state[action.filterName], action.filterValue] }))
                break;
            case 'remove': set((state) => ({ [action.filterName]: state[action.filterName].filter((filterValue) => filterValue !== action.filterValue) }))
                break;
            case 'clear': set((state) => ({ ...initialFilterStates }))
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


const initialSignupStates = {
    emailId: '',
    password: '',
    name: '',
    checkbox: false,
    errors: {},
}
export const useSignupStore = create((set) => ({

    ...initialSignupStates,

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
    resetAll: () => {
        set(() => ({
            ...initialSignupStates
        }))
    }
}))


const initialLoginState = {
    emailId: '',
    password: '',
    errors: {},
}
export const useLoginStore = create((set) => ({

    ...initialLoginState,

    setEmailId: (input) => {
        set(() => ({ emailId: input }))
    },
    setPassword: (input) => {
        set(() => ({ password: input }))
    },
    setErrors: (input) => {
        set(() => ({ errors: input }))
    },
    resetAll: () => {
        set(() => ({
            ...initialLoginState,
        }))
    }
}))


export const useItemStore = create((set) => ({
    items: [],
    setItems: (data) => {
        set(() => ({ items: data }))
    },
}))

export const useUserStore = create((set) => ({
    userId: null,
    setUserId: (id) => {
        set(() => ({ userId: id }))
    }
}))

const initialAddItemState = {
    inputFile: null,
    studentInfo: {
        name: '',
        branch: '',
        sem: '',
        phoneNo: '',
        emailId: '',
    },
    itemInfo: {
        name: '',
        location: '',
        date: '',
        tags: [],
        discription: '',
    },
    errors: {}
}
export const useAddItemStore = create((set) => ({
    ...initialAddItemState,
    setInputFile: (file) => {
        set((state) => ({ inputFile: file }))
    },
    setStudentInfo: (key, value) => {
        set((state) => ({ studentInfo: { ...state.studentInfo, [key]: value } }))
    },
    setItemInfo: (key, value) => {
        set((state) => ({ itemInfo: { ...state.itemInfo, [key]: value } }))
    },
    setErrors: (errObj) => {
        set((state) => ({ errors: errObj }))
    },
    resetAll: () => {
        set(() => ({ ...initialAddItemState }))
    },
    setAll: (info) => {
        set(() => ({ ...info }))
    }
}))





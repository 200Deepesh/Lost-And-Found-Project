
export const getItems = async (type) => {
    const url = `http://127.0.0.1:8000/items/type/${type}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export const getUserItems = async (id) => {
    const url = `http://127.0.0.1:8000/user/${id}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export const getItemByID = async (id) => {
    const url = `http://127.0.0.1:8000/items/id/${id}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export const addItem = async (itemInfo) => {
    const url = `http://127.0.0.1:8000/items/`
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemInfo)
    })
    const status = await res.json()
    return status
}

export const getItemsUsingFilters = async (filters, page) => {
    const url = `http://127.0.0.1:8000/items/filters`
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filters: filters, page: page })
    })
    const { items } = await res.json()
    return items
}


export const updateItemByID = async (id, itemInfo) => {
    const url = `http://127.0.0.1:8000/item/${id}`
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemInfo)
    })
    const status = await res.json()
    return status
}
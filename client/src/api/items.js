
export const getItems = async (type) => {
    const url = `http://127.0.0.1:8000/items/type/${type}`
    console.log(url)
    const res = await fetch(url)
    const data = res.json()
    return data
}

export const getItemByID = async (id) => {
    const url = `http://127.0.0.1:8000/items/id/${id}`
    console.log(url)
    const res = await fetch(url)
    const data = res.json()
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
    const status = res.json()
    return status
}

export const authUser = async (userInfo) => {

    const res = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    const data = await res.json()

    return data
}

export const registerUser = async (userInfo) => {

    const res = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    const data = await res.json()

    return data
}
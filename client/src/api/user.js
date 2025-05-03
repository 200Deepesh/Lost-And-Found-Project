import { setCookies } from "./cookies"

export const authUser = async (userInfo) => {

    const res = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    const data = await res.json()
    console.log(!data.error)

    return data
}
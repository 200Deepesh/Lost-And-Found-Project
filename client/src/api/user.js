import { getCookies } from "./cookies.js"

export const authUser = async (userInfo) => {

    const res = await fetch('http://127.0.0.1:8000/user/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    });

    const data = await res.json();

    return data;
}

export const getUserIdByToken = async () => {

    const sessionId = getCookies('sessionId');

    if (sessionId) {
        const res = await fetch('http://127.0.0.1:8000/user/sessionId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId: sessionId })
        });

        const user = await res.json();
        if (user) {
            return user._id;
        }
    }
    return null;
}

export const registerUser = async (userInfo) => {

    const res = await fetch('http://127.0.0.1:8000/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    });

    const data = await res.json();

    return data;
}
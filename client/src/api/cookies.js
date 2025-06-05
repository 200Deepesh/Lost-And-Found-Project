import Cookies from 'js-cookie';

const setCookies = (obj)=>{
    for (const key in obj) {
        Cookies.set(key, obj[key], { expires: 30 });
    }
}

const getCookies = (name)=>{
    return Cookies.get(name);
}

const removeCookies = (name)=>{
    Cookies.remove(name);
} 

export {
    setCookies,
    getCookies,
    removeCookies
}
import Cookies from 'js-cookie'

const setCookies = (obj)=>{
    for (const key in obj) {
        // document.cookie = key + "=" + obj[key] + "; path=/";
        Cookies.set(key, obj[key])
    }
}

const getCookies = (name)=>{
    // const cookie = `; ${document.cookie}`;
    // const parts = cookie.split(`; ${name}=`);
    // if(parts.length==2) return parts[1].split(';')[0]
    // return null
    return Cookies.get(name)
}

const removeCookies = (name)=>{
    Cookies.remove(name)
} 

export {
    setCookies,
    getCookies,
    removeCookies
}
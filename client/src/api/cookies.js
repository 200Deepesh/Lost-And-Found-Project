

const setCookies = (obj)=>{
    for (const key in obj) {
        document.cookie = key + "=" + obj[key] + "; path=/";
    }
}

const getCookies = (name)=>{
    const cookie = `; ${document.cookie}`;
    const parts = cookie.split(`; ${name}=`);
    if(parts.length==2) return parts[1].split(';')[0]
    return null
}

export {
    setCookies,
    getCookies
}
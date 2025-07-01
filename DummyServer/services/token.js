import jwt from 'jsonwebtoken';

const secretKey = 'key';

export const genrateToken = (data, expire) => {
    const token = jwt.sign(data, secretKey, { expiresIn: `${expire}d`});
    return token;
}

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    }
    catch (err) {
        console.log('invalid token');
        return null;
    }
}
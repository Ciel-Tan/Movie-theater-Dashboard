import Cookies from "js-cookie";

export const getCookieToken = () => {
    return Cookies.get('token');
}

export const createCookieToken = (authResponse) => {
    const { token, expiresIn } = authResponse;
    const expires = expiresIn / (24 * 60 * 60);
    return Cookies.set('token', token, { expires: expires });
};

export const removeCookieToken = () => {
    return Cookies.remove('token');
}
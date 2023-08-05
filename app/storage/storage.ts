export const USER_TOKEN_KEY = "userToken";
export const userToken = getToken();

export function setToken(token: string) {
    localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(token));
}

export function getToken() {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    return token ? JSON.parse(token) : null;
}
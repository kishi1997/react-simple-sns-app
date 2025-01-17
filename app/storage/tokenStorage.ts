export const USER_TOKEN_KEY = "userToken";

export function setToken(token: string) {
    localStorage.setItem(USER_TOKEN_KEY, token);
}

export function getToken() {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem(USER_TOKEN_KEY);
        return token ? token : null;
    }
    else {
        return null;
    }
}

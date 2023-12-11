export function decodeJWT(jwt: string) {
    return JSON.parse(atob(jwt.split('.')[1]));
}

export const setAuthToken = (token: string) => {
    localStorage.setItem("mediaVaultToken", token);
}

export const getAuthToken = (): string | null => {
    return localStorage.getItem("mediaVaultToken");
}

export const clearAuthToken = () => {
    localStorage.removeItem("mediaVaultToken");
}

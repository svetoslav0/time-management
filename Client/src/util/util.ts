// UTIL/USER_DATA

export interface UserData {
    username: string;
    id: string;
    token: string;
}

export function getUserData(): UserData | null {
    // Implementation to set user data to local storage or other location
    return null;
}

export function setUserData(data: UserData): void {
    console.log(data);
    // Implementation to set user data to local storage or other location
}

export function clearUserData(): void {
    // Implementation to set user data to local storage or other location
}

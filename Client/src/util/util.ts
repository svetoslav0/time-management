// UTIL/USER_DATA
import { LoginResponseData } from '@/shared/types';

export const getUserData = (): LoginResponseData | undefined => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : undefined;
};

export function setUserData(data: LoginResponseData): void {
    localStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData(): void {
    localStorage.removeItem('userData');
}

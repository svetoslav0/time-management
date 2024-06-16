// UTIL/USER_DATA
import { User } from '@/shared/types';

export const getUserData = (): User | null => {
    const data = localStorage.getItem('userData');
    if (data) {
        try {
            return JSON.parse(data) as User;
        } catch (error) {
            console.error('Error parsing user data from localStorage', error);
            return null;
        }
    }
    return null;
};

export function setUserData(data: User): void {
    console.log(data);
    // Implementation to set user data to local storage or other location
}

export function clearUserData(): void {
    localStorage.removeItem('userData');
}

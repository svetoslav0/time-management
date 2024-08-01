import { redirect } from 'react-router-dom';

import { LoginResponseData } from '@/shared/types';
import { getUserData } from '@/util/util';

type UserData = LoginResponseData | undefined;

export function restrictHomePage() {
    const userData: UserData = getUserData();
    const isNotLoggedIn = !userData;
    const isAdmin = userData?.userRole === 'admin';
    const isEmployee = userData?.userRole === 'employee';
    const isCustomer = userData?.userRole === 'customer';

    if (isNotLoggedIn) {
        return redirect('/auth/login');
    } else if (isAdmin) {
        return redirect('/admin/projects');
    } else if (isEmployee) {
        return redirect('/dashboard');
    } else if (isCustomer) {
        return redirect('/dashboard');
    }

    return null;
}

export function restrictAdminPages() {
    const userData: UserData = getUserData();
    const isAdmin = userData?.userRole === 'admin';

    if (!isAdmin) {
        return redirect('/');
    }

    return null;
}

export function restrictLoginPage() {
    const userData: UserData = getUserData();

    const isLoggedIn = userData;

    if (isLoggedIn) {
        return redirect('/');
    }

    return null;
}

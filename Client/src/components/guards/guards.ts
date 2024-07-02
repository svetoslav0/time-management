import { redirect } from 'react-router-dom';

import { LoginResponseData } from '@/shared/types';
import { getUserData } from '@/util/util';

type UserData = LoginResponseData | undefined;

export function restrictIsLogin() {
    const userData: UserData = getUserData();

    if (!userData) {
        return redirect('/auth/login');
    }

    return null;
}

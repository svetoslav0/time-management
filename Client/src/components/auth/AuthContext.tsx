import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { LoginResponseData } from '@/shared/types';
import { clearUserData, getUserData, setUserData } from '@/util/util';

type AuthContextValue = {
    loginResponseData: LoginResponseData | undefined;
    setLoginData: (userData: LoginResponseData) => void;
    clearLoginData: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginData = () => {
    const authValue = useContext(AuthContext);
    if (!authValue) {
        throw new Error('Error! AuthContext called from outside the AuthContextProvider');
    }

    return authValue;
};

export const AuthContextProvider = ({ children }: PropsWithChildren<object>) => {
    const [loginData, setLoginDataRaw] = useState<LoginResponseData | undefined>(() =>
        getUserData()
    );
    const loginResponseData = loginData;

    const setLoginData = (loginResponseData: LoginResponseData) => {
        setLoginDataRaw(loginResponseData);
        setUserData(loginResponseData);
    };

    const clearLoginData = () => {
        setLoginDataRaw(undefined);
        clearUserData();
    };

    return (
        <AuthContext.Provider value={{ loginResponseData, clearLoginData, setLoginData }}>
            {children}
        </AuthContext.Provider>
    );
};

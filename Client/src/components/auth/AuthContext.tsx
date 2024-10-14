import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginResponseData } from '@/shared/types';
import { clearUserData, getUserData, setUserData } from '@/util/util';

type AuthContextValue = {
    loginData: LoginResponseData | undefined;
    setLoginData: (userData: LoginResponseData) => void;
    clearLoginData: () => void;
    changeContextNames: (firstName: string, lastName: string) => void;
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
    const navigate = useNavigate();
    const [loginData, setLoginDataRaw] = useState<LoginResponseData | undefined>(() =>
        getUserData()
    );

    const setLoginData = (loginResponseData: LoginResponseData) => {
        setLoginDataRaw(loginResponseData);
        setUserData(loginResponseData);
    };

    const clearLoginData = () => {
        setLoginDataRaw(undefined);
        clearUserData();
    };

    const changeContextNames = (firstName: string, lastName: string) => {
        if (loginData) {
            const updatedLoginData = {
                ...loginData,
                firstName,
                lastName,
            };
            setLoginData(updatedLoginData);
        }
    };

    useEffect(() => {
        if (loginData && loginData.expire) {
            const timeToExpire = loginData.expire - Date.now();
            if (timeToExpire <= 0) {
                clearLoginData();
                navigate('/auth/login');
            } else {
                const timer = setTimeout(() => {
                    clearLoginData();
                    navigate('/auth/login');
                }, timeToExpire);

                return () => clearTimeout(timer);
            }
        }
    }, [loginData, navigate]);

    return (
        <AuthContext.Provider
            value={{ loginData, clearLoginData, setLoginData, changeContextNames }}
        >
            {children}
        </AuthContext.Provider>
    );
};

import { useEffect, useState } from 'react';
import { CgSun } from 'react-icons/cg';
import { FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import useLogout from '../auth/hooks/useLogout';
import useUser from '../auth/hooks/useUser';
import GuestLinks from './GuestLinks';
import UserLinks from './UserLinks';

import { User } from '@/shared/types';

type NavigationProps = {
    mode: boolean;
    onChangeDarkMode: () => void;
};

export function Navigation({ mode, onChangeDarkMode }: NavigationProps) {
    const navigate = useNavigate();
    const logout = useLogout();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const { getUserFromCache } = useUser();

    useEffect(() => {
        const cachedUser = getUserFromCache();
        setUser(cachedUser);
        setIsLoggedIn(!!cachedUser);
    }, [getUserFromCache]);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        navigate('/auth/login');
    };

    return (
        <nav className='m-auto flex max-w-6xl items-center justify-between px-4 py-3'>
            <ul className=' flex justify-end'>
                <li>
                    <button className='mx-4 h-8 w-8' onClick={onChangeDarkMode}>
                        {mode ? (
                            <FaMoon className='h-full w-full' />
                        ) : (
                            <CgSun className='h-full w-full' />
                        )}
                    </button>
                </li>
                <li>
                    {isLoggedIn ? (
                        <span className='text-1xl mx-4 text-center font-bold leading-9 tracking-tight text-gray-900'>
                            {user?.email}
                        </span>
                    ) : (
                        ''
                    )}
                </li>
                {isLoggedIn ? (
                    <UserLinks handleLogout={handleLogout} />
                ) : (
                    <GuestLinks handleLogin={handleLogin} />
                )}
            </ul>
        </nav>
    );
}

import { useEffect, useState } from 'react';
import { CgSun } from 'react-icons/cg';
import { FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useLoginData } from '../auth/AuthContext';
import useLogout from '../auth/hooks/useLogout';
import { useUser } from '../auth/hooks/useUser';
import AdminLinks from './AdminLinks';
import GuestLinks from './GuestLinks';
import UserLinks from './UserLinks';

import { User } from '@/shared/types';

type NavigationProps = {
    mode: boolean;
    onChangeDarkMode: () => void;
};

export function Navigation({ mode, onChangeDarkMode }: NavigationProps) {
    const { loginResponseData } = useLoginData();
    const { currentUser } = useUser();
    const navigate = useNavigate();
    const logout = useLogout();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!loginResponseData);
    const [user, setUser] = useState<User | undefined>(currentUser);

    useEffect(() => {
        setUser(currentUser);
        setIsLoggedIn(!!loginResponseData);
    }, [currentUser, loginResponseData]);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        navigate('/auth/login');
    };

    const redirectToUsersPanel = () => {
        navigate('/admin/users');
    };

    const redirectToProjectsPanel = () => {
        navigate('/admin/projects');
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
                    {user?.userRole === 'admin' ? (
                        <AdminLinks
                            redirectToUsersPanel={redirectToUsersPanel}
                            redirectToProjectsPanel={redirectToProjectsPanel}
                        />
                    ) : (
                        ''
                    )}
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
                <li>
                    {isLoggedIn ? (
                        <UserLinks handleLogout={handleLogout} />
                    ) : (
                        <GuestLinks handleLogin={handleLogin} />
                    )}
                </li>
            </ul>
        </nav>
    );
}

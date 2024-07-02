import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginData } from '../auth/AuthContext';
import useLogout from '../auth/hooks/useLogout';
import { useUser } from '../auth/hooks/useUser';
import AdminLinks from './AdminLinks';
import GuestLinks from './GuestLinks';
import UserLinks from './UserLinks';

import { User } from '@/shared/types';

export function Navigation() {
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
        <nav className='items-center justify-between'>
            <ul className=' flex justify-end'>
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

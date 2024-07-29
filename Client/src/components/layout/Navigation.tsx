import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginData } from '../auth/AuthContext';
import useLogout from '../auth/hooks/useLogout';
import { useUser } from '../auth/hooks/useUser';
import AdminLinks from './AdminLinks';
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

    const redirectToUsersPanel = () => {
        navigate('/admin/users');
    };

    const redirectToProjectsPanel = () => {
        navigate('/admin/projects');
    };

    return (
        <nav className='flex items-center justify-between px-4 py-3 '>
            {isLoggedIn ? (
                <span className='text-1xl mx-8 text-center font-bold leading-9 tracking-tight text-gray-900'>
                    Welcome, {user?.email}
                </span>
            ) : (
                ''
            )}
            <div className='mt-2 flex w-5/12 justify-between'>
                <div className='flex'>
                    {user?.userRole === 'admin' ? (
                        <AdminLinks
                            redirectToUsersPanel={redirectToUsersPanel}
                            redirectToProjectsPanel={redirectToProjectsPanel}
                        />
                    ) : (
                        ''
                    )}
                </div>
                <div>{isLoggedIn && <UserLinks handleLogout={handleLogout} />}</div>
            </div>
        </nav>
    );
}

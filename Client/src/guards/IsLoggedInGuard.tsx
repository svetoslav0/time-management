import { Navigate, Outlet } from 'react-router-dom';

import useUser from '@/components/auth/hooks/useUser';

interface IsLoggedInGuardProps {
    children?: React.ReactNode; // Define the type of children
}

export default function IsLoggedInGuard({ children }: IsLoggedInGuardProps) {
    const user = useUser().getUserFromCache();
    if (!user) {
        console.log('Redirecting to /auth/login')
        return <Navigate to='/auth/login' replace />;
    }

    return children ? children : <Outlet />;
}

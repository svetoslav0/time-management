import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginData } from '../auth/AuthContext';
import EmployeeProjects from './employeeProjects/EmployeeProjects';

export default function Dashboard() {
    const { loginResponseData } = useLoginData();

    const navigate = useNavigate();

    useEffect(() => {
        if (!loginResponseData) {
            navigate('/auth/login');
        }
    }, [loginResponseData, navigate]);

    return (
        <>
            {loginResponseData?.userRole === 'customer' && <p>Customer projects</p>}
            {(loginResponseData?.userRole === 'admin' ||
                loginResponseData?.userRole === 'employee') && <EmployeeProjects userData={loginResponseData} />}
        </>
    );
}

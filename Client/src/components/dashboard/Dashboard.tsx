import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginData } from '../auth/AuthContext';
import CustomersProjects from './customersProjects/CustomersProjects';
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
            {loginResponseData?.userRole === 'customer' && <CustomersProjects />}
            {loginResponseData?.userRole === 'employee' && (
                <EmployeeProjects userData={loginResponseData} />
            )}
        </>
    );
}

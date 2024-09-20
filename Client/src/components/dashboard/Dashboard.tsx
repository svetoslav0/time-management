import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginData } from '../auth/AuthContext';
import CustomersProjects from './customersProjects/CustomersProjects';
import EmployeeProjects from './employeeProjects/EmployeeProjects';

export default function Dashboard() {
    const { loginData } = useLoginData();

    const navigate = useNavigate();

    useEffect(() => {
        if (!loginData) {
            navigate('/auth/login');
        }
    }, [loginData, navigate]);

    return (
        <>
            {loginData?.userRole === 'customer' && <CustomersProjects />}
            {loginData?.userRole === 'employee' && <EmployeeProjects />}
        </>
    );
}

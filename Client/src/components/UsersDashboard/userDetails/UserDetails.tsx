import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UserData from './UserData';
import UserProjects from './UserProjects';

import useFetchUserById from '@/reactQuery/hooks/useFetchUserById';

function UserDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const { data: userData, error } = useFetchUserById(params.id);

    useEffect(() => {
        if (error) {
            navigate('/admin/users');
        }
    }, [error, navigate]);
    return (
        <>
            {userData && (
                <>
                    <UserData userData={userData} />
                    <UserProjects projects = {userData.projects} />
                </>
            )}
        </>
    );
}
export default UserDetails;

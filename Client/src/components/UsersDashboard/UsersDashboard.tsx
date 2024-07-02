import { useEffect, useState } from 'react';

import httpServices from '../../services/httpServices';
import { LoginResponseData, User } from '../../shared/types';
import UserCard from './UserCard';

import ButtonCreateUser from '@/UI/formComponents/ButtonCreateUser';
import ButtonShowActiveOrInactiveUsers from '@/UI/formComponents/ButtonShowActiveOrInactiveUsers';
import { getUserData } from '@/util/util';

export default function UsersDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [active, setActive] = useState<boolean>(true);
    const currentUser: LoginResponseData | undefined = getUserData();

    useEffect(() => {
        httpServices()
            .get<{ total: number; items: User[] }>(
                `/users?status=${active ? 'active' : 'inactive'}`
            )
            .then((response) => {
                setUsers(response.items);
                setLoading(false);
            });
    }, [active]);

    return (
        <div className='mx-auto flex flex-col gap-6 p-5'>
            <div className='flex gap-5'>
                <ButtonShowActiveOrInactiveUsers active={active} setActive={setActive} />
                {currentUser?.userRole === 'admin' && <ButtonCreateUser />}
            </div>
            <h2 className='self-center font-bold'>{active ? 'Active' : 'Inactive'} Users</h2>
            {loading ? (
                <div className='self-center'>Loading...</div>
            ) : (
                <div className='flex flex-wrap gap-4'>
                    {users.map(
                        (user) => (
                            active ? (user.status = 'Active') : (user.status = 'Inactive'),
                            (<UserCard key={user._id} user={user} />)
                        )
                    )}
                </div>
            )}
        </div>
    );
}

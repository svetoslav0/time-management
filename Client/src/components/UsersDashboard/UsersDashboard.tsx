import { useEffect, useState } from 'react';

import httpServices from '../../services/httpServices';
import { User } from '../../shared/types';
import UserCard from './UserCard';

export default function UsersDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [active, setActive] = useState<boolean>(true);

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
            <button
                className='self-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                onClick={() => {
                    setActive(!active);
                }}
            >
                {active ? 'Show Inactive users' : 'Show Active users'}
            </button>
        </div>
    );
}

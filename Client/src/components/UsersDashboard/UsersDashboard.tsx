import { useEffect, useState } from 'react';

import { User } from '../../shared/types';
import UserCard from './UserCard';

// import httpServices from '../../services/httpServices';

export default function UsersDashboard() {
    const [activeUsers, setActiveUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const users: User[] = [
            {
                username: 'JohnnySinsJr',
                firstName: 'John',
                lastName: 'Doe',
                role: 'admin',
                active: true,
            },
            {
                username: 'Jan365',
                firstName: 'Jane',
                lastName: 'Doe',
                role: 'employee',
                active: true,
            },
            {
                username: 'Petar4o',
                firstName: 'Peter',
                lastName: 'Petrov',
                role: 'customer',
                active: true,
            },
            {
                username: 'WolverineX',
                firstName: 'Hugh',
                lastName: 'Jackman',
                role: 'customer',
                active: true,
            },
        ];
        // const fetchActiveUsers = async () => {
        //     const response = await httpServices().get('/users/active');
        //     setActiveUsers(response);
        //     ;
        // };
        // fetchActiveUsers();
        setLoading(false);
        setActiveUsers(users);
    }, []);

    return (
        <div className='mx-auto flex flex-col gap-6 p-5'>
            <h2 className='self-center'>Active Users</h2>
            {loading ? (
                <div className='self-center'>Loading...</div>
            ) : (
                <div className='flex flex-wrap gap-4'>
                    {activeUsers.map((user) => (
                        <UserCard key={user.username} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}

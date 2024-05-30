import { useEffect, useState } from 'react';

// import httpServices from '../../services/httpServices';

type User = {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    active: boolean;
};

export default function ActiveUsersDashboard() {
    const [activeUsers, setActiveUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const users: User[] = [
            { username: 'Johnny', firstName: 'John', lastName: 'Doe', role: 'admin', active: true },
            {
                username: 'Jane',
                firstName: 'Jane',
                lastName: 'Doe',
                role: 'employee',
                active: true,
            },
            {
                username: 'Peter',
                firstName: 'Peter',
                lastName: 'Petrov',
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
        <div className='mx-auto flex max-w-3xl flex-col gap-6 p-5'>
            <h2 className='self-center'>Active Users</h2>
            {loading ? (
                <div className='self-center'>Loading...</div>
            ) : (
                <table className='w-full table-fixed'>
                    <thead>
                        <tr className='bg-gray-300 dark:bg-gray-700'>
                            <th className='w-1/4 p-2'>Username</th>
                            <th className='w-1/4 p-2'>First Name</th>
                            <th className='w-1/4 p-2'>Last Name</th>
                            <th className='w-1/4 p-2'>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeUsers.map((user) => (
                            <tr
                                key={user.username}
                                className=' cursor-pointer border-b-2
                                 border-gray-300
                                  bg-gray-100 transition-colors
                                   duration-300 ease-in-out even:bg-gray-200
                                    hover:bg-white dark:border-gray-700 dark:bg-gray-800'
                                onClick={() => {
                                    console.log(user.username);
                                }}
                            >
                                <td className='p-2 pl-14'>{user.username}</td>
                                <td className='p-2 pl-14'>{user.firstName}</td>
                                <td className='p-2 pl-14'>{user.lastName}</td>
                                <td className='p-2 pl-14'>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

import { User } from '../../shared/types';

export default function UserCard({ user }: { user: User }) {
    return (
        <div
            className='w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800'
            onClick={() => {
                console.log(user.username);
            }}
        >
            <h5 className='mb-3 text-base font-semibold text-gray-900 dark:text-white md:text-xl'>
                User: {user.username}
            </h5>

            <ul className='my-4 space-y-3'>
                <li>
                    <p className='group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900  dark:bg-gray-600 dark:text-white'>
                        First Name:
                        <span className='ms-3 flex-1 whitespace-nowrap font-light'>
                            {user.firstName}
                        </span>
                    </p>
                </li>
                <li>
                    <p className='group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900  dark:bg-gray-600 dark:text-white'>
                        Last Name:
                        <span className='ms-3 flex-1 whitespace-nowrap font-light'>
                            {user.lastName}
                        </span>
                    </p>
                </li>
                <li>
                    <p className='group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900  dark:bg-gray-600 dark:text-white'>
                        Role:
                        <span className='ms-3 flex-1 whitespace-nowrap font-light'>
                            {' '}
                            {user.role}
                        </span>
                    </p>
                </li>
                <li>
                    <p>
                        <span
                            className={`ms-3 flex-1 whitespace-nowrap font-light ${user.active ? 'text-lime-400' : 'text-red-400'}`}
                        >
                            {user.active ? 'Active' : 'Inactive'}
                        </span>
                    </p>
                </li>
            </ul>
        </div>
    );
}

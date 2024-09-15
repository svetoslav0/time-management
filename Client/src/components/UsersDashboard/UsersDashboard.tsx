import { Link } from 'react-router-dom';

import UserCard from './UserCard';

import useFetchUsers from '@/reactQuery/hooks/useFetchUsers';
import ActionSearchFiled from '@/UI/formComponents/ActionSearchFiled';
import Loader from '@/UI/Loader';

export default function UsersDashboard() {
    const { data: users, isLoading, filter, handleChangeFilter } = useFetchUsers({});

    return (
        <div className='mx-auto flex flex-col gap-6 p-5'>
            <div className='flex justify-center'>
                <Link to={'/admin/createUser'} className='adminProjectBtn w-[132px] '>
                    Create user
                </Link>
            </div>
            <div className='flex justify-center'>
                <ActionSearchFiled
                    value={filter}
                    placeholder='search users..'
                    handleChangeFilter={handleChangeFilter}
                />
            </div>
            {isLoading ? (
                <div className='self-center'>
                    <Loader />
                </div>
            ) : (
                <div className='mt-16 grid grid-cols-3 gap-x-[66px] gap-y-10'>
                    {users && users.items.map((user) => <UserCard key={user._id} user={user} />)}
                </div>
            )}
        </div>
    );
}

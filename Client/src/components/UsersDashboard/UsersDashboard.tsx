import { useState } from 'react';

import { LoginResponseData } from '../../shared/types';
import UserCard from './UserCard';

import useFetchUsers from '@/reactQuery/hooks/useFetchUsers';
import ActionSearchFiled from '@/UI/formComponents/ActionSearchFiled';
import ButtonCreateUser from '@/UI/formComponents/ButtonCreateUser';
import ButtonShowActiveOrInactiveUsers from '@/UI/formComponents/ButtonShowActiveOrInactiveUsers';
import { getUserData } from '@/util/util';

export default function UsersDashboard() {
    const [active, setActive] = useState<boolean>(true);
    const currentUser: LoginResponseData | undefined = getUserData();
    const {
        data: users,
        isLoading,
        filter,
        handleChangeFilter,
    } = useFetchUsers({ status: active ? 'active' : 'inactive' });

    return (
        <div className='mx-auto flex flex-col gap-6 p-5'>
            <div className='flex gap-5'>
                <ButtonShowActiveOrInactiveUsers active={active} setActive={setActive} />
                {currentUser?.userRole === 'admin' && <ButtonCreateUser />}
            </div>
            <div className='flex justify-center'>
                <ActionSearchFiled value={filter} handleChangeFilter={handleChangeFilter} />
            </div>
            <h2 className='self-center font-bold'>{active ? 'Active' : 'Inactive'} Users</h2>
            {isLoading ? (
                <div className='self-center'>Loading...</div>
            ) : (
                <div className='mx-10 mt-4 grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4'>
                    {users &&
                        users.items.map(
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

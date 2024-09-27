import { useCallback, useState } from 'react';

import UserDetailsForm from './UserDetailsForm';
import UserPassword from './UserPassword';
import UserStatus from './UserStatus';

import { CustomerDetails, EmployeeDetails } from '@/shared/types';
import AvatarSvg from '@/UI/design/AvatarSvg';
import ClipboardEditSvg from '@/UI/design/ClipboardEditSvg';
import cn from '@/util/cn';

function UserData({ userData }: { userData: CustomerDetails | EmployeeDetails }) {
    const [edit, setEdit] = useState(false);

    const deactivateEdit = useCallback(() => {
        setEdit(false);
    }, []);

    return (
        <section className='relative mt-14 flex items-start gap-x-3'>
            <div>
                <AvatarSvg />
                <p
                    className={cn(
                        userData.status === 'active' ? 'text-customGreen' : 'text-customOrange',
                        ' mt-2 text-center text-lg font-medium capitalize'
                    )}
                >
                    {userData?.status}
                </p>
            </div>
            <UserDetailsForm isEdit={edit} userData={userData} deactivateEdit={deactivateEdit} />
            <div className='absolute right-0 top-0'>
                <div className={cn(edit && 'opacity-0', 'flex gap-3.5 transition duration-300')}>
                    <button onClick={() => setEdit(true)}>
                        <ClipboardEditSvg width={32} height={32} />
                    </button>
                    <UserStatus userData={userData} />
                    <UserPassword userData={userData} />
                </div>
            </div>
        </section>
    );
}
export default UserData;

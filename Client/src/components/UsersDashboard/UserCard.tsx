import { Link } from 'react-router-dom';

import { UserDetails } from '../../shared/types';

import AvatarSvg from '@/UI/design/AvatarSvg';
import capitalizeFirstLetter from '@/util/capitalizeFirstLetter';
import cn from '@/util/cn';

export default function UserCard({ user }: { user: UserDetails }) {
    return (
        <div className='flex w-full border-collapse overflow-hidden rounded-2xl border-[1px] border-l-0 border-white transition duration-200 ease-out hover:border-customBlue '>
            <div className={'h-full w-[5.65px] bg-customBlue'}></div>
            <div className='my-5 ml-5 w-full'>
                <div className='grid w-full grid-cols-[83px_1fr] items-center gap-y-5 text-lg font-bold text-customDarkBlue'>
                    <AvatarSvg />
                    <div className='ml-7 w-full'>
                        <div className=' flex gap-1'>
                            <p> {capitalizeFirstLetter(user.firstName)} </p>
                            <p> {capitalizeFirstLetter(user.lastName)} </p>
                        </div>
                        <p className='my-2'> {capitalizeFirstLetter(user.userRole)}</p>
                    </div>
                    <div>
                        <p
                            className={cn(
                                user.status === 'active' ? 'text-customGreen' : 'text-customOrange',
                                'text-center text-lg font-normal'
                            )}
                        >
                            {user.status === 'active' ? 'Active' : 'Inactive'}
                        </p>
                    </div>
                    <div className='mr-6 flex justify-end'>
                        <Link className='secondaryBtn w-[103px]' to={`/admin/users/${user._id}`}>
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Dispatch, SetStateAction, useState } from 'react';

import { User } from '../../../shared/types';
import EditUserModal from '../EditUserModal/EditUserModal';
import ResetPasswordModal from '../ResetPasswordModal/ResetPasswordModal';
import useUserMutate from '../hooks/useUserMutate';

interface ProfileProps {
    user?: User;
    userState: Dispatch<SetStateAction<User | undefined>>;
}

dayjs.extend(advancedFormat);

export default function Profile({ user, userState }: ProfileProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const useStatusChange = useUserMutate();

    const handleStatusChange = () => {
        if (user) {
            useStatusChange({ state: user.status, _id: user._id });
            const updatedStatus = user.status === 'active' ? 'inactive' : 'active';
            userState({ ...user, status: updatedStatus });
        }

    };

    const isAdmin = true;
    const userCreatedAt = dayjs(user?.createdAt).format('Do MMMM, YYYY');

    if (!user) {
        return <div className='mt-20 text-center text-6xl font-bold'>Loading...</div>; // Fallback if user data is not yet available
    }

    return (
        <>
            <div className='relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8'>
                <span className='absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'></span>
                <div className='sm:flex sm:justify-between sm:gap-4'>
                    <div>
                        <h3 className='text-lg font-bold text-gray-900 sm:text-xl'>
                            {user.firstName} {user.lastName} - {user.email}
                        </h3>
                        <p>Junior developer (need to get position from BE)</p>
                        <p className='mt-1 text-xs font-medium text-gray-600'>
                            {user.status === 'active' ? (
                                <span className='rounded-full bg-green-500 px-2'>Active</span>
                            ) : (
                                <span className='rounded-full bg-red-500 px-2'>Inactive</span>
                            )}
                        </p>
                    </div>
                    <div className='hidden sm:block sm:shrink-0'>
                        <img
                            alt='User Avatar'
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                            className='size-28 rounded-lg object-cover shadow-sm'
                        />
                    </div>
                </div>
                {/* DESCRIPTION */}
                <div>
                    <p className='text-pretty text-sm text-gray-500'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
                        provident a, ipsa maiores deleniti consectetur nobis et eaque.
                    </p>
                </div>
                {/* CUSTOM INFORMATION */}
                <dl className='mt-6 flex justify-between sm:gap-6'>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Total hours</dt>
                        <dd className='text-center text-xs text-gray-500'>
                            +570 (currently hard coded)
                        </dd>
                    </div>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Active projects</dt>
                        <dd className='text-center text-xs text-gray-500'>
                            3 (currently hard coded)
                        </dd>
                    </div>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Registered</dt>
                        <dd className='text-center text-xs text-gray-500'>{userCreatedAt}</dd>
                    </div>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Role</dt>
                        <dd className='text-center text-xs text-gray-500'>{user.userRole}</dd>
                    </div>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Last active</dt>
                        <dd className='text-xs text-gray-500'>
                            3 minutes ago (currently hard coded)
                        </dd>
                    </div>
                </dl>
                {/* BUTTONS */}
                {isAdmin && (
                    <div className='mt-5 flex justify-center gap-2 align-middle'>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className='rounded-full border-2 border-yellow-500 bg-yellow-400 px-6 font-semibold text-white hover:bg-yellow-500'
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='rounded-full border-2 border-indigo-500 bg-indigo-400 px-6 font-semibold text-white hover:bg-indigo-500'
                        >
                            Reset password
                        </button>
                        {/* DEPENDS ON STATUS CONDITIONAL RENDERING */}
                        {user.status === 'active' ? (
                            <button
                                onClick={handleStatusChange}
                                className='rounded-full border-2 border-red-500 bg-red-400 px-6 font-semibold text-white hover:bg-red-500'
                            >
                                Delete User
                            </button>
                        ) : (
                            <button
                                onClick={handleStatusChange}
                                className='rounded-full border-2 border-green-500 bg-green-400 px-6 font-semibold text-white hover:bg-green-500'
                            >
                                Activate User
                            </button>
                        )}
                    </div>
                )}
            </div>
            <ResetPasswordModal isOpen={isModalOpen} onClose={closeModal}  />
            <EditUserModal isOpen={isEditModalOpen} onClose={closeModal} user={user}/>
        </>
    );
}

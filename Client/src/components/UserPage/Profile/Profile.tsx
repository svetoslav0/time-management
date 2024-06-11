import { useState } from 'react';
import { User } from '../../../shared/types';
import ResetPasswordModal from '../ResetPasswordModal/ResetPasswordModal';

interface ProfileProps {
    user?: User;
}

export default function Profile({ user }: ProfileProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen((state) => (state = false));
    };

    const isAdmin = true;

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
                            {user.firstName} {user.lastName} - {user.username}
                        </h3>
                        <p>Junior developer</p>
                        <p className='mt-1 text-xs font-medium text-gray-600'>
                            {user.status === 'Active' ? (
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
                {/*CUSTOM INFORMATION */}
                <dl className='mt-6 flex justify-between sm:gap-6'>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Total hours</dt>
                        <dd className='text-center text-xs text-gray-500'>+570</dd>
                    </div>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Active projects</dt>
                        <dd className='text-center text-xs text-gray-500'>3</dd>
                    </div>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Registered</dt>
                        <dd className='text-center text-xs text-gray-500'>31st June, 2021</dd>
                    </div>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Role</dt>
                        <dd className='text-center text-xs text-gray-500'>{user.userRole}</dd>
                    </div>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Last active </dt>
                        <dd className='text-xs text-gray-500'>3 minutes ago</dd>
                    </div>
                </dl>
                {/* BUTTONS */}
                {isAdmin && (
                    <div className='mt-5 flex justify-center gap-2 align-middle'>
                        <button className='rounded-full border-2 border-yellow-500 bg-yellow-400 px-6 font-semibold text-white hover:bg-yellow-500'>
                            Edit

                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='rounded-full border-2 border-indigo-500 bg-indigo-400 px-6 font-semibold text-white hover:bg-indigo-500'
                        >
                            Reset password
                        </button>
                        {/* DEPENDS ON STATUS CONDITIONAL RENDERING*/}
                        {user.status === 'Active' ? (
                            <button className='rounded-full border-2 border-red-500 bg-red-400 px-6 font-semibold text-white hover:bg-red-500'>
                                Delete User
                            </button>
                        ) : (
                            <button className='rounded-full border-2 border-green-500 bg-green-400 px-6 font-semibold text-white hover:bg-green-500'>
                                Activate User
                            </button>
                        )}
                    </div>
                )}
            </div>
            <ResetPasswordModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}

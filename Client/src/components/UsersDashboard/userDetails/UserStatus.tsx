import { useEffect, useState } from 'react';

import useUpdateUserStatus from '../hooks/useUpdateUserStatus';

import { CustomerDetails, EmployeeDetails } from '@/shared/types';
import AccountReactivateSvg from '@/UI/design/AccountReactivateSvg';
import ArchiveArrowSvg from '@/UI/design/ArchiveArrowSvg';
import ArchiveSvg from '@/UI/design/ArchiveSvg';
import AvatarReactivateSvg from '@/UI/design/AvatarReactivateSvg';
import Modal from '@/UI/Modal';

function UserStatus({ userData }: { userData: CustomerDetails | EmployeeDetails }) {
    const [showActionCompleteModal, setShowActionCompleteModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [showCompleteData, setShowCompleteData] = useState('');

    const { updateUserStatus, isUpdateUserStatusSuccess } = useUpdateUserStatus();

    useEffect(() => {
        if (isUpdateUserStatusSuccess) {
            setShowActionCompleteModal(false);
            setShowCompleteModal(true);
        }
    }, [isUpdateUserStatusSuccess, userData.status]);

    return (
        <>
            {userData.status === 'active' ? (
                <button onClick={() => setShowActionCompleteModal(true)}>
                    <ArchiveSvg />
                </button>
            ) : (
                <button onClick={() => setShowActionCompleteModal(true)}>
                    <AccountReactivateSvg />
                </button>
            )}
            <Modal
                bgColor='bg-customDarkBlue'
                padding='p-0'
                rounded='rounded-[22px]'
                closeBtn={false}
                isOpen={showActionCompleteModal}
                onClose={() => setShowActionCompleteModal(false)}
            >
                <div className='relative flex h-[210px] w-[446px] flex-col items-center justify-evenly '>
                    {userData.status === 'active' ? (
                        <>
                            <div>
                                <p className='text-center text-xl font-bold text-white'>
                                    Are you sure you want to
                                </p>
                                <p className='text-center text-xl font-bold text-white'>
                                    archive this user?
                                </p>
                            </div>
                            <div className='absolute -right-[300px] -top-[480px]'>
                                <ArchiveArrowSvg width={510} height={596} />
                            </div>
                            <div className='absolute -left-[5px] top-0'>
                                <ArchiveArrowSvg />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <p className='text-center text-xl font-bold text-white'>
                                    Are you sure you want to re-activate
                                </p>
                                <p className='text-center text-xl font-bold text-white'>
                                    this user?
                                </p>
                                <p className='text-center text-[15px] font-bold text-white'>
                                    {userData.firstName} {userData.lastName} ({userData.email})
                                </p>
                            </div>
                            <div className='absolute -bottom-1 -left-[65px] w-[148px]'>
                                <AvatarReactivateSvg width='100%' height='100%' />
                            </div>
                        </>
                    )}
                    <div>
                        <div className='flex gap-16'>
                            <button
                                onClick={() => {
                                    updateUserStatus(userData);
                                    setShowCompleteData(userData.status);
                                }}
                                className='h-[32px] w-[67px] rounded-md bg-customBlue text-lg font-bold text-white'
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowActionCompleteModal(false)}
                                className='h-[32px] w-[67px] rounded-md border border-customBlue text-lg font-bold text-white'
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                bgColor='bg-customDarkBlue'
                padding='p-0'
                rounded='rounded-[22px]'
                closeBtn={false}
                isOpen={showCompleteModal}
                onClose={() => setShowCompleteModal(false)}
            >
                <div className='relative flex h-[210px] w-[446px] flex-col items-center justify-evenly '>
                    {showCompleteData === 'active' && (
                        <>
                            <p className='mb-10 text-center text-xl font-bold text-white'>
                                User successfully archived!
                            </p>

                            <div className='absolute left-1/2 top-1/2 -translate-x-1/2'>
                                <ArchiveArrowSvg width={60} height={55} />
                            </div>
                        </>
                    )}{' '}
                    {showCompleteData === 'inactive' && (
                        <>
                            <p className='mb-10 text-center text-xl font-bold text-white'>
                                User successfully re-activated!
                            </p>
                            <div className='absolute bottom-0 right-4'>
                                <AvatarReactivateSvg />
                            </div>
                            <div className='absolute bottom-0 right-24 w-12'>
                                <AvatarReactivateSvg width='100%' height='100%' />
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
}
export default UserStatus;

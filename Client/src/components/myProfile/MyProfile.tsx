import { useState } from 'react';

import { useLoginData } from '../auth/AuthContext';
import ChangeMyNamesForm from './ChangeMyNamesForm';
import ChangeMyPasswordForm from './ChangeMyPasswordForm';

import Modal from '@/UI/Modal';

export default function MyProfile() {
    const { loginData } = useLoginData();

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='mt-16'>
            <div className='m-auto mt-14 w-2/5 bg-white p-9'>
                <h2 className='mb-8 text-center text-2xl font-extrabold text-customDarkBlue'>
                    My profile information
                </h2>
                <div className='relative'>
                    <label className='absolute top-3.5 z-20 ml-5 text-lg font-bold text-customDarkBlue'>
                        Email:
                    </label>
                    <input
                        className='mb-2.5 block w-full rounded-lg p-3.5 pl-32 text-lg text-customDarkBlue outline-none drop-shadow'
                        type='text'
                        id='email'
                        readOnly
                        value={loginData?.email}
                    />
                </div>
                <ChangeMyNamesForm loginData={loginData} setIsModalOpen={setIsModalOpen} />

                {loginData?.isGoogleUser && (
                    <div className='mt-4 text-center italic'>
                        Google users cannot change their passwords from here.
                    </div>
                )}
            </div>

            {isModalOpen && !loginData?.isGoogleUser && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ChangeMyPasswordForm
                        setIsModalOpen={setIsModalOpen}
                        userId={loginData?._id}
                        email={loginData?.email}
                    />
                </Modal>
            )}
        </div>
    );
}

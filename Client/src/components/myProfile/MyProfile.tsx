import { useEffect, useState } from 'react';

import { useLoginData } from '../auth/AuthContext';

import capitalizeFirstLetter from '@/util/capitalizeFirstLetter';

type FormInputData = {
    name: string;
    email: string;
    _id: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

export default function MyProfile() {
    const { loginData } = useLoginData();
    const [formInputData, setFormInputData] = useState<FormInputData>({
        name: '',
        email: '',
        _id: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    useEffect(() => {
        if (loginData) {
            setFormInputData({
                name: `${capitalizeFirstLetter(loginData.firstName)} ${capitalizeFirstLetter(loginData.lastName)}`,
                email: loginData.email,
                _id: loginData._id,
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            });
        }
    }, [loginData]);

    return (
        <div className='m-auto mt-14 w-2/4 rounded-2xl  border bg-white p-9 shadow-2xl backdrop-blur-[13.50px]'>
            <h2 className='mb-8 text-3xl font-bold text-customDarkBlue'>My Profile</h2>
            <form className='mt-4 flex flex-col'>
                <label
                    className='mb-2 block text-lg font-medium text-customDarkBlue dark:text-white'
                    htmlFor='email'
                >
                    Email
                </label>
                <input
                    className='mb-5 block w-2/3 rounded-xl bg-customDarkWhite p-2.5 text-sm text-customDarkBlue outline-none'
                    type='text'
                    name='email'
                    id='email'
                    disabled
                    value={formInputData.email}
                />
                <label
                    className='mb-2 block text-lg font-medium text-customDarkBlue dark:text-white'
                    htmlFor='name'
                >
                    Name
                </label>
                <input
                    className='mb-10 block w-2/3 rounded-xl bg-customDarkWhite p-2.5 text-sm text-customDarkBlue outline-none'
                    type='text'
                    name='name'
                    id='name'
                    disabled
                    value={formInputData.name}
                />

                <button type='button' className='primaryBtn w-60'>
                    Change password
                </button>
            </form>
        </div>
    );
}

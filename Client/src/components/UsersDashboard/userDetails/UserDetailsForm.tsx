import dayjs from 'dayjs';
import { useEffect } from 'react';

import useUpdateUser from '../hooks/useUpdateUser';
import { ExperienceLevelDropdown } from './ExperienceLevelDropdown';

import { CustomerDetails, EmployeeDetails } from '@/shared/types';
import GoogleSvg from '@/UI/design/GoogleSvg';
import cn from '@/util/cn';

type UserDetailsFormProps = {
    isEdit: boolean;
    userData: CustomerDetails | EmployeeDetails;
    deactivateEdit: () => void;
};

function UserDetailsForm({ isEdit, userData, deactivateEdit }: UserDetailsFormProps) {
    const { updateUser, isSuccess } = useUpdateUser();

    useEffect(() => {
        if (isSuccess) {
            deactivateEdit();
        }
    }, [isSuccess, deactivateEdit]);
    const handleSubmit = (data: React.FormEvent<HTMLFormElement>) => {
        data.preventDefault();

        const formData = new FormData(data.currentTarget);
        const res = Object.fromEntries(formData);
        updateUser({ ...userData, ...res });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='ml-3 grid max-w-[1068px] flex-grow grid-cols-[auto_1fr] gap-x-10 gap-y-2 text-lg text-customDarkBlue'
        >
            <div>
                <input
                    type='text'
                    name='firstName'
                    defaultValue={userData.firstName}
                    readOnly={!isEdit}
                    className={cn(
                        isEdit ? 'text-customGreyText activeInput ' : 'unActiveInput',
                        'font-medium outline-none transition-all duration-300'
                    )}
                    style={{ width: `${userData.firstName.length}ch` }}
                />
                <input
                    type='text'
                    name='lastName'
                    defaultValue={userData.lastName}
                    readOnly={!isEdit}
                    className={cn(
                        isEdit ? 'text-customGreyText activeInput ' : 'unActiveInput',
                        'font-medium outline-none transition-all duration-300'
                    )}
                    style={{ width: `${userData.lastName.length}ch` }}

                />
            </div>
            <p className='font-medium'>
                ({userData.email}){' '}
                {userData.isGoogleLogin ? (
                    <GoogleSvg />
                ) : (
                    <span className='text-[19px] font-bold text-customBlue'>OpsHero</span>
                )}
            </p>
            <p className='font-bold'>User role:</p>
            <p className='font-medium capitalize'>{userData.userRole}</p>
            {'experienceLevel' in userData ? (
                <ExperienceLevelDropdown expValue={userData.experienceLevel} isActive={isEdit} />
            ) : (
                <>
                    <label htmlFor='address' className='font-bold'>
                        Address:
                    </label>
                    <input
                        type='text'
                        name='address'
                        defaultValue={userData.address}
                        readOnly={!isEdit}
                        className={cn(
                            isEdit ? 'text-customGreyText activeInput ' : 'unActiveInput',
                            'font-medium outline-none transition-all duration-300'
                        )}
                    />
                    <label htmlFor='phoneNumber' className='font-bold'>
                        Phone number:
                    </label>
                    <input
                        type='text'
                        name='phoneNumber'
                        defaultValue={userData.phoneNumber}
                        readOnly={!isEdit}
                        className={cn(
                            isEdit ? 'text-customGreyText activeInput ' : 'unActiveInput',
                            'font-medium outline-none transition-all duration-300'
                        )}
                    />
                    <label htmlFor='companyName' className='font-bold'>
                        Company name:
                    </label>
                    <input
                        type='text'
                        name='companyName'
                        defaultValue={userData.companyName}
                        readOnly={!isEdit}
                        className={cn(
                            isEdit ? 'text-customGreyText activeInput ' : 'unActiveInput',
                            'font-medium outline-none transition-all duration-300'
                        )}
                    />
                </>
            )}
            <p className='font-bold'>Account created on:</p>
            <p className='font-medium'>{dayjs(userData.createdAt).format('MM.DD.YY')}</p>
            <textarea
                name='description'
                className={cn(
                    isEdit && 'bg-[#eff1f3]',
                    'col-span-2 mt-8 h-24 rounded-lg border border-customBlue p-3 text-base font-normal outline-none transition duration-300'
                )}
                readOnly={!isEdit}
                defaultValue={userData.description}
            ></textarea>
            {isEdit && (
                <div className='absolute right-0 z-20 flex gap-3 bg-white'>
                    <button className='adminProjectBtn'>Save changes</button>
                    <button className='primaryBtn' type='button' onClick={() => deactivateEdit()}>
                        Cancel
                    </button>
                </div>
            )}
        </form>
    );
}
export default UserDetailsForm;

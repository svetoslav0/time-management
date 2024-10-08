import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useLoginData } from '../auth/AuthContext';
import useChangeNames from './hooks/useChangeNames';

import { changeNamesSchema } from '@/shared/formValidations';
import { LoginResponseData } from '@/shared/types';
import EditPenSvg from '@/UI/design/EditPenSvg';
import Loader from '@/UI/Loader';
import capitalizeFirstLetter from '@/util/capitalizeFirstLetter';
import cn from '@/util/cn';

type FormInputData = { firstName: string; lastName: string };

type ChangeMyNamesFormProps = {
    loginData: LoginResponseData | undefined;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChangeMyNamesForm({ setIsModalOpen }: ChangeMyNamesFormProps) {
    const { loginData, changeContextNames } = useLoginData();
    const [editMode, setEditMode] = useState(false);
    const [names, setNames] = useState({ firstName: '', lastName: '' });
    const [edited, setEdited] = useState(false);

    const { changeUserNames, isChangeUserNamesSuccessfully, isChangeUserNamesPending } =
        useChangeNames();

    useEffect(() => {
        if (isChangeUserNamesSuccessfully && edited) {
            setEditMode(false);
            setEdited(false);
            changeContextNames(names.firstName, names.lastName);
        }
    }, [
        changeContextNames,
        edited,
        isChangeUserNamesSuccessfully,
        names.firstName,
        names.lastName,
    ]);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        clearErrors,
    } = useForm({
        resolver: yupResolver(changeNamesSchema),
    });

    const cancelEditMode = () => {
        setEditMode(false);
        setValue('firstName', loginData?.firstName ?? '');
        setValue('lastName', loginData?.lastName ?? '');
        clearErrors();
    };

    useEffect(() => {
        if (loginData) {
            setValue('firstName', capitalizeFirstLetter(loginData.firstName));
            setValue('lastName', capitalizeFirstLetter(loginData.lastName));
        }
    }, [loginData, setValue]);

    const onSubmit: SubmitHandler<FormInputData> = async (formData) => {
        if (loginData?._id) {
            setEdited(true);
            changeUserNames({ ...formData, id: loginData._id });
            setNames({ firstName: formData.firstName, lastName: formData.lastName });
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='relative'>
            <div className='relative'>
                <label
                    htmlFor='firstName'
                    className='absolute top-3.5 z-20 ml-5 text-lg font-bold text-customDarkBlue'
                >
                    First name:
                </label>
                <input
                    className='mb-2.5 block w-full rounded-lg p-3.5 pl-32 text-lg text-customDarkBlue outline-none drop-shadow'
                    type='text'
                    {...register('firstName')}
                    id='firstName'
                    readOnly={!editMode}
                />
                <button
                    type='button'
                    className={cn(
                        editMode === true
                            ? 'pointer-events-none opacity-0'
                            : 'pointer-events-auto opacity-100',
                        'absolute right-3 top-1/2 -translate-y-1/2 transform transition-all duration-300 '
                    )}
                    onClick={() => setEditMode(true)}
                >
                    <EditPenSvg />
                </button>
            </div>

            <div className='relative'>
                <label
                    htmlFor='lastName'
                    className='absolute top-3.5 z-10 ml-5 text-lg font-bold text-customDarkBlue'
                >
                    Last name:
                </label>
                <input
                    className='mb-8 block w-full rounded-lg p-3.5 pl-32 text-lg text-customDarkBlue outline-none drop-shadow disabled:bg-white'
                    type='text'
                    {...register('lastName')}
                    id='lastName'
                    readOnly={!editMode}
                />
                <button
                    type='button'
                    className={cn(
                        editMode === true && 'pointer-events-none opacity-0',
                        'absolute right-3 top-1/2 -translate-y-1/2 transform transition-all duration-300 '
                    )}
                    onClick={() => setEditMode(true)}
                >
                    <EditPenSvg />
                </button>
            </div>

            <div className='mb-3 text-sm text-customRed'>
                {errors.firstName && <p>{errors.firstName.message}</p>}
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>

            <div className='flex items-center justify-center'>
                <button
                    type='button'
                    className={cn(
                        editMode === false
                            ? 'pointer-events-none opacity-0'
                            : 'pointer-events-auto opacity-100',
                        'changePasswordSecondaryBtn w-32'
                    )}
                    onClick={cancelEditMode}
                >
                    Cancel
                </button>
                <button
                    type='button'
                    className={cn(
                        loginData?.isGoogleUser ? 'changePasswordDisabledBtn' : 'changePasswordBtn',
                        editMode === true
                            ? 'pointer-events-none opacity-0'
                            : 'pointer-events-auto opacity-100',
                        'bg-customDarkBlue px-20 text-base transition-all duration-300'
                    )}
                    onClick={() => setIsModalOpen(true)}
                    disabled={loginData?.isGoogleUser}
                >
                    Change password
                </button>
                <button
                    type='submit'
                    className={cn(
                        editMode === false
                            ? 'pointer-events-none opacity-0'
                            : 'pointer-events-auto opacity-100',
                        'changePasswordBtn w-32'
                    )}
                    disabled={!editMode || !isDirty || isChangeUserNamesPending}
                >
                    Submit
                </button>
            </div>
            {isChangeUserNamesPending && (
                <div className='absolute -top-64 left-36'>
                    <Loader />
                </div>
            )}
        </form>
    );
}

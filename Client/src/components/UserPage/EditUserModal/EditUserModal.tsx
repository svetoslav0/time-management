import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import useEditUser from '../hooks/useEditUser';

import { editUserSchema } from '@/shared/formValidations';
import { EditUserDataType, User } from '@/shared/types';
import InputComponent from '@/UI/formComponents/InputComponent';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    userState: Dispatch<SetStateAction<EditUserDataType | undefined>>;
}

interface EditUser {
    email: string;
    firstName: string;
    lastName: string;
    description?: string | undefined;
    experienceLevel?: string | undefined;
    companyName?: string | undefined;
    phoneNumber?: string | undefined;
    address?: string | undefined;
    ref?: string;
}

export default function EditUserModal({ isOpen, onClose, user, userState }: ModalProps) {
    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(editUserSchema) });

    const { editUser, isSuccess } = useEditUser();

    const onSubmit: SubmitHandler<EditUserDataType> = (data) => {
        data.userRole = user.userRole;
        data.status = user.status;
        editUser(data);
        userState(data);
        onClose();
    };
    const experience = 'Senior';
    const allExperienceOptions = ['Junior', 'Mid-level', 'Senior', 'Architect'];
    const otherExperienceOptions = allExperienceOptions.filter((option) => option !== experience);
    useEffect(() => {
        setValue('email', user.email);
        setValue('firstName', user.firstName);
        setValue('lastName', user.lastName);
        setValue('companyName', user.companyName);
        setValue('phoneNumber', user.phoneNumber);
        setValue('address', user.address);
        setValue('description', user.description);
        setValue('experienceLevel', experience); //use dynamic data if user.experience is not undefined
    }, [setValue, user]);
    useEffect(() => {
        if (isSuccess) {
            reset();
        }
    }, [reset, isSuccess]);

    if (!isOpen) return null;

    const handleOuterClick = () => {
        onClose();
    };

    const handleInnerClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div
            onClick={handleOuterClick}
            className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'
        >
            <div onClick={handleInnerClick} className='rounded-lg bg-white p-6 shadow-lg'>
                <div className='mx-auto w-[300px]'>
                    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                        <h3 className='text-xl font-medium text-gray-900'>Edit user!</h3>

                        <div>
                            <InputComponent
                                error={errors.email?.message}
                                register={register}
                                trigger={trigger}
                                field='email'
                                defaultValue={user.email}
                            />
                            <InputComponent
                                error={errors.firstName?.message}
                                register={register}
                                trigger={trigger}
                                field='firstName'
                                defaultValue={user.firstName}
                            />
                            <InputComponent
                                error={errors.lastName?.message}
                                register={register}
                                trigger={trigger}
                                field='lastName'
                                defaultValue={user.lastName}
                            />
                            <InputComponent
                                error={errors.description?.message}
                                register={register}
                                trigger={trigger}
                                field='description'
                                defaultValue={user.description}
                            />
                        </div>

                        {user.userRole === 'employee' && (
                            <div className='mb-5'>
                                <select
                                    id='experience'
                                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                                    defaultValue=''
                                    {...register('experienceLevel')}
                                    onBlur={() => trigger('experienceLevel')}
                                >
                                    <option defaultValue={experience}>{experience}</option>
                                    {otherExperienceOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {errors.experienceLevel && (
                                    <span
                                        role='alert'
                                        className='text-sm text-red-500 dark:text-red-400'
                                    >
                                        {errors.experienceLevel.message}
                                    </span>
                                )}
                            </div>
                        )}
                        {user.userRole === 'customer' && (
                            <>
                                <InputComponent
                                    error={errors.companyName?.message}
                                    register={register}
                                    trigger={trigger}
                                    field='companyName'
                                    defaultValue={user.companyName}
                                />
                                <InputComponent
                                    error={errors.phoneNumber?.message}
                                    register={register}
                                    trigger={trigger}
                                    field='phoneNumber'
                                    defaultValue={user.phoneNumber}
                                />
                                <InputComponent
                                    error={errors.address?.message}
                                    register={register}
                                    trigger={trigger}
                                    field='address'
                                    defaultValue={user.address}
                                />
                            </>
                        )}

                        <div className='flex gap-2'>
                            <button
                                type='button'
                                onClick={() => {
                                    onClose();
                                    reset();
                                }}
                                className='w-full rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-300'
                            >
                                Close
                            </button>
                            <button
                                type='submit'
                                className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
                            >
                                Submit
                            </button>
                        </div>
                        {Object.keys(errors).length > 0 && (
                            <p className='text-red-500'>
                                {errors[Object.keys(errors)[0] as keyof EditUser]?.message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

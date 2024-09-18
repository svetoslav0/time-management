import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useLoginData } from '../auth/AuthContext';
import useChangePassword from './hooks/useChangePassword';
import useCredentialsValidation from './hooks/useCredentialsValidation';

import { changePasswordSchema } from '@/shared/formValidations';
import Modal from '@/UI/Modal';
import capitalizeFirstLetter from '@/util/capitalizeFirstLetter';
import cn from '@/util/cn';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type FormInputData = {
    name?: string;
    email?: string;
    _id?: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

export default function MyProfile() {
    const { loginData } = useLoginData();
    const [isVisible, setIsVisible] = useState(false);
    const [formInputData, setFormInputData] = useState<FormInputData>({
        name: '',
        email: '',
        _id: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { validateCredentials, isValidateCredentialsSuccess, isValidateCredentialsError } =
        useCredentialsValidation();

    const { changePassword, isSuccess } = useChangePassword();
    const [isContinue, setIsContinue] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormInputData>({ resolver: yupResolver(changePasswordSchema) });

    useEffect(() => {
        if (loginData) {
            const name =
                `${capitalizeFirstLetter(loginData.firstName)} ${capitalizeFirstLetter(loginData.lastName)}` ||
                '';
            setFormInputData({
                name,
                email: loginData.email || '',
                _id: loginData._id || '',
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            });
            setValue('_id', loginData._id);
            setValue('email', loginData.email);
            setValue('name', name);
        }
    }, [loginData, setValue]);

    const onSubmit: SubmitHandler<FormInputData> = async (formData) => {
        setIsContinue(true);
        validateCredentials({
            email: formData.email,
            password: formData.oldPassword,
        });
    };

    useEffect(() => {
        if (isValidateCredentialsSuccess && isContinue) {
            setIsContinue(false);
            changePassword({
                password: formInputData.newPassword,
                confirmPassword: formInputData.confirmNewPassword,
                _id: formInputData._id,
            });
        }
    }, [changePassword, formInputData, isValidateCredentialsSuccess, isContinue]);

    useEffect(() => {
        if (isValidateCredentialsError) {
            setIsContinue(false);
        }
    }, [isValidateCredentialsError]);

    useEffect(() => {
        if (isSuccess) {
            setIsModalOpen(false);
        }
    }, [isSuccess, reset]);

    const toggleVisibility = () => setIsVisible((prevData) => !prevData);

    return (
        <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='m-auto mt-14 w-2/4 rounded-2xl  border bg-white p-9 shadow-2xl backdrop-blur-[13.50px]'>
                <h2 className='mb-8 text-3xl font-bold text-customDarkBlue'>My Profile</h2>
                <input
                    className='mb-5 hidden  w-2/3 rounded-xl bg-customDarkWhite p-2.5 text-sm text-customDarkBlue outline-none'
                    type='password'
                    {...register('_id')}
                    id='_id'
                    disabled
                    value={formInputData.email}
                />
                <label
                    className='mb-2 block text-lg font-medium text-customDarkBlue dark:text-white'
                    htmlFor='email'
                >
                    Email
                </label>
                <input
                    className='mb-5 block w-2/3 rounded-xl bg-customDarkWhite p-2.5 text-sm text-customDarkBlue outline-none'
                    type='text'
                    {...register('email')}
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
                    {...register('name')}
                    id='name'
                    disabled
                    value={formInputData.name}
                />
                <button
                    type='button'
                    className='primaryBtn w-60'
                    onClick={() => setIsModalOpen(true)}
                >
                    Change password
                </button>
            </div>
            {isModalOpen && (
                <div>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <div className='w-full'>
                            <h2 className='mb-8 text-center text-xl font-bold text-customDarkBlue'>
                                Change your password
                            </h2>
                            <div className='relative'>
                                <label
                                    className='mb-2 block text-lg font-medium text-customDarkBlue dark:text-white'
                                    htmlFor='oldPassword'
                                >
                                    Old Password
                                </label>
                                <input
                                    className={cn(
                                        errors.oldPassword ? 'border border-customRed' : '',
                                        'mb-10 block w-full rounded-xl bg-customDarkWhite p-2.5 text-sm text-customDarkBlue outline-none'
                                    )}
                                    type='password'
                                    {...register('oldPassword')}
                                    name='oldPassword'
                                    value={formInputData.oldPassword || ''}
                                    onChange={(e) => {
                                        setValue('oldPassword', e.target.value.trim() || '');
                                        setFormInputData((prevData) => ({
                                            ...prevData,
                                            oldPassword: e.target.value.trim(),
                                        }));
                                    }}
                                />
                                <span
                                    onClick={toggleVisibility}
                                    className='absolute right-4 top-1/2 translate-y-1/2 transform text-gray-500 dark:text-gray-400'
                                >
                                    {isVisible ? (
                                        <AiFillEye className='h-4 w-4' />
                                    ) : (
                                        <AiOutlineEyeInvisible className='h-4 w-4' />
                                    )}
                                </span>
                            </div>
                            <div className='relative'>
                                <label
                                    className='mb-2 block text-lg font-medium text-customDarkBlue dark:text-white'
                                    htmlFor='newPassword'
                                >
                                    New password
                                </label>
                                <input
                                    className={cn(
                                        errors.newPassword ? 'border border-customRed' : '',
                                        'mb-10 block w-full rounded-xl bg-customDarkWhite p-2.5 text-sm text-customDarkBlue outline-none'
                                    )}
                                    type={isVisible ? 'text' : 'password'}
                                    {...register('newPassword')}
                                    id='newPassword'
                                    value={formInputData.newPassword}
                                    onChange={(e) => {
                                        setValue('newPassword', e.target.value.trim());
                                        setFormInputData((prevData) => ({
                                            ...prevData,
                                            newPassword: e.target.value.trim(),
                                        }));
                                    }}
                                />
                                <span
                                    onClick={toggleVisibility}
                                    className='absolute right-4 top-1/2 translate-y-1/2 transform text-gray-500 dark:text-gray-400'
                                >
                                    {isVisible ? (
                                        <AiFillEye className='h-4 w-4' />
                                    ) : (
                                        <AiOutlineEyeInvisible className='h-4 w-4' />
                                    )}
                                </span>
                            </div>
                            <div className='relative'>
                                <label
                                    className='mb-2 block text-lg font-medium text-customDarkBlue dark:text-white'
                                    htmlFor='confirmNewPassword'
                                >
                                    Confirm password
                                </label>
                                <input
                                    className={cn(
                                        errors.confirmNewPassword ? 'border border-customRed' : '',
                                        'mb-10 block w-full rounded-xl bg-customDarkWhite p-2.5 text-sm text-customDarkBlue outline-none'
                                    )}
                                    type={isVisible ? 'text' : 'password'}
                                    {...register('confirmNewPassword')}
                                    id='confirmNewPassword'
                                    value={formInputData.confirmNewPassword}
                                    onChange={(e) => {
                                        setValue('confirmNewPassword', e.target.value.trim());
                                        setFormInputData((prevData) => ({
                                            ...prevData,
                                            confirmNewPassword: e.target.value.trim(),
                                        }));
                                    }}
                                />
                                <span
                                    onClick={toggleVisibility}
                                    className='absolute right-4 top-1/2 translate-y-1/2 transform text-gray-500 dark:text-gray-400'
                                >
                                    {isVisible ? (
                                        <AiFillEye className='h-4 w-4' />
                                    ) : (
                                        <AiOutlineEyeInvisible className='h-4 w-4' />
                                    )}
                                </span>
                            </div>
                            <div className='mb-3 text-sm text-customRed'>
                                {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
                                {errors.newPassword && <p>{errors.newPassword.message}</p>}
                                {errors.confirmNewPassword && (
                                    <p>{errors.confirmNewPassword.message}</p>
                                )}
                            </div>
                            <div className='flex gap-5'>
                                <button
                                    type='button'
                                    className='secondaryBtn w-40'
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Close
                                </button>
                                <button type='submit' className='primaryBtn w-40'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}
        </form>
    );
}

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { useLoginData } from '../auth/AuthContext';
import useChangePassword from './hooks/useChangePassword';
import useCredentialsValidation from './hooks/useCredentialsValidation';

import { changePasswordSchema } from '@/shared/formValidations';
import Modal from '@/UI/Modal';
import capitalizeFirstLetter from '@/util/capitalizeFirstLetter';
import cn from '@/util/cn';

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
        setValue,
    } = useForm({ resolver: yupResolver(changePasswordSchema) });

    useEffect(() => {
        if (loginData) {
            const name = `${capitalizeFirstLetter(loginData.firstName)} ${capitalizeFirstLetter(loginData.lastName)}`;
            setFormInputData({
                name,
                email: loginData.email,
                _id: loginData._id,
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
            setValue('newPassword', '');
            setValue('oldPassword', '');
            setValue('confirmNewPassword', '');
            setFormInputData((prevData) => ({
                ...prevData,
                newPassword: '',
                oldPassword: '',
                confirmNewPassword: '',
            }));
            setIsVisible(false);
            setIsModalOpen(false);
        }
    }, [isSuccess, setValue]);

    const toggleVisibility = () => setIsVisible((prevData) => !prevData);

    return (
        <form className='mt-16' onSubmit={handleSubmit(onSubmit)}>
            <div className='m-auto mt-14 w-2/5 bg-white p-9'>
                <h2 className='mb-8 text-center text-xl font-extrabold text-customDarkBlue'>My profile information</h2>
                <input
                    className='mb-5 hidden w-full rounded-xl bg-customDarkWhite p-2.5 text-sm text-customDarkBlue outline-none'
                    type='password'
                    {...register('_id')}
                    id='_id'
                    disabled
                    value={formInputData.email}
                />
                <div className='relative'>
                    <span className='absolute z-20 top-3.5 ml-5 text-customDarkBlue font-bold text-lg'>
                        Email
                    </span>
                    <input
                        className='mb-2.5 block w-full rounded-lg p-3.5 text-lg drop-shadow text-customDarkBlue outline-none disabled:bg-white text-right z-10'
                        type='text'
                        {...register('email')}
                        id='email'
                        disabled
                        value={formInputData.email}
                    />
                </div>

                <div className='relative'>
                    <span className='absolute z-20 top-3.5 ml-5 text-customDarkBlue font-bold text-lg'>
                        Name
                    </span>
                    <input
                        className='mb-8 block w-full rounded-lg p-3.5 text-lg drop-shadow text-customDarkBlue outline-none disabled:bg-white text-right z-10'
                        type='text'
                        {...register('name')}
                        id='name'
                        disabled
                        value={formInputData.name}
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <button
                        type='button'
                        className='changePasswordBtn bg-customDarkBlue px-20 text-base'
                        onClick={() => setIsModalOpen(true)}
                    >
                        Change password
                    </button>
                </div>
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
                                    type={isVisible ? 'text' : 'password'}
                                    {...register('oldPassword')}
                                    name='oldPassword'
                                    value={formInputData.oldPassword}
                                    onChange={(e) => {
                                        setValue('oldPassword', e.target.value.trim());
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
                                    className='changePasswordSecondaryBtn w-40'
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Close
                                </button>
                                <button type='submit' className='changePasswordBtn w-40'>
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

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler,useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import useUserPasswordReset from '../hooks/useUserPasswordReset';

import { resetPasswordSchema } from '@/shared/formValidations';
import { ResetPassword } from '@/shared/types';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResetPasswordModal({ isOpen, onClose }: ModalProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
    const { passwordReset, isSuccess } = useUserPasswordReset();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(resetPasswordSchema) });

    const onSubmit: SubmitHandler<ResetPassword> = (data) => {
        toast.success('Password successfully changed!');
        console.log(data)
        passwordReset(data);
        onClose();
        reset();
        setShowPassword(false);
        setShowRepeatPassword(false);
    };
    useEffect(() => {
        if (isSuccess) {
            reset();
        }
    }, [reset, isSuccess]);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='rounded-lg bg-white p-6 shadow-lg'>
                <div className='mx-auto w-[300px]'>
                    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                        <h3 className='text-xl font-medium text-gray-900'>Password change!</h3>
                        <div>
                            <label
                                htmlFor='password'
                                className='mb-2 block text-sm font-medium text-gray-900'
                            >
                                New password
                            </label>
                            <div className='relative'>
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                    placeholder='Password'
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='confirmPassword'
                                className='mb-2 block text-sm font-medium text-gray-900'
                            >
                                Repeat password
                            </label>
                            <div className='relative'>
                                <input
                                    {...register('confirmPassword')}
                                    type={showRepeatPassword ? 'text' : 'password'}
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    placeholder='Confirm password'
                                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                />
                                <span
                                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                    className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
                                >
                                    {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <div className='flex gap-2'>
                            <button
                                type='button'
                                onClick={() => {
                                    onClose();
                                    reset();
                                    setShowPassword(false);
                                    setShowRepeatPassword(false);
                                }}
                                className='w-full rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-300'
                            >
                                Close
                            </button>
                            <button
                                type='submit'
                                className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
                            >
                                Change
                            </button>
                        </div>
                        {Object.keys(errors).length > 0 && (
                            <p className='text-red-500'>
                                {errors[Object.keys(errors)[0] as keyof ResetPassword]?.message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

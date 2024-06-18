import { resetPasswordSchema } from '@/shared/formValidations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ResetPassword {
    password: string;
    confirmPassword: string;
}

export default function ResetPasswordModal({ isOpen, onClose }: ModalProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(resetPasswordSchema) });

    const onSubmit: SubmitHandler<ResetPassword> = (data) => {
        toast.success('Password successfully changed!');
        console.log(data);
        onClose();
        reset();
        setShowPassword(false);
        setShowRepeatPassword(false);
    };

    const handleOuterClick = () => {
        onClose();
        reset();
        setShowPassword(false);
        setShowRepeatPassword(false);
    };

    const handleInnerClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={handleOuterClick}
            className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'
        >
            <div onClick={handleInnerClick} className='rounded-lg bg-white p-6 shadow-lg'>
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

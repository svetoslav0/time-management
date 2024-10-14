import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import useChangePassword from './hooks/useChangePassword';
import useCredentialsValidation from './hooks/useCredentialsValidation';

import { changePasswordSchema } from '@/shared/formValidations';
import Loader from '@/UI/Loader';
import cn from '@/util/cn';

type FormInputData = { oldPassword: string; newPassword: string; confirmNewPassword: string };

type ChangeMyPasswordFormProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string | undefined;
    email: string | undefined;
};

export default function ChangeMyPasswordForm({
    setIsModalOpen,
    userId,
    email,
}: ChangeMyPasswordFormProps) {
    const [isContinue, setIsContinue] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible((prevData) => !prevData);

    const {
        validateCredentials,
        isValidateCredentialsSuccess,
        isValidateCredentialsError,
        isValidationPending,
    } = useCredentialsValidation();
    const { changePassword, isSuccess, isChangePasswordPending } = useChangePassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
    });

    const onSubmit: SubmitHandler<FormInputData> = async (formData) => {
        if (email) {
            setIsContinue(true);
            validateCredentials({
                email: email,
                password: formData.oldPassword,
            });
        }
    };

    useEffect(() => {
        if (isValidateCredentialsSuccess && isContinue && userId) {
            setIsContinue(false);
            changePassword({
                password: watch('newPassword'),
                confirmPassword: watch('confirmNewPassword'),
                _id: userId,
            });
        }
    }, [changePassword, isValidateCredentialsSuccess, isContinue, watch, userId]);

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
            setIsVisible(false);
            setIsModalOpen(false);
        }
    }, [isSuccess, setValue, setIsModalOpen]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='relative'>
            <div className='w-full'>
                <h2 className='mb-8 text-center text-xl font-bold text-customDarkBlue'>
                    Change your password
                </h2>
                <div className='relative'>
                    <label
                        className='mb-2 block text-lg font-medium text-customDarkBlue'
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
                    />
                    <span
                        onClick={toggleVisibility}
                        className='absolute right-4 top-1/2 translate-y-1/2 transform text-gray-500'
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
                        className='mb-2 block text-lg font-medium text-customDarkBlue'
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
                    />
                    <span
                        onClick={toggleVisibility}
                        className='absolute right-4 top-1/2 translate-y-1/2 transform text-gray-500'
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
                        className='mb-2 block text-lg font-medium text-customDarkBlue'
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
                    />
                    <span
                        onClick={toggleVisibility}
                        className='absolute right-4 top-1/2 translate-y-1/2 transform text-gray-500'
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
                    {errors.confirmNewPassword && <p>{errors.confirmNewPassword.message}</p>}
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
            {(isValidationPending || isChangePasswordPending) && (
                <div className='absolute -top-10 left-24'>
                    <Loader />
                </div>
            )}
        </form>
    );
}

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import useUserPasswordReset from '../hooks/useUserPasswordReset';

import { resetPasswordSchema } from '@/shared/formValidations';
import { CustomerDetails, EmployeeDetails, ResetPassword } from '@/shared/types';
import PasswordSvg from '@/UI/design/PasswordSvg';
import Modal from '@/UI/Modal';

function UserPassword({ userData }: { userData: CustomerDetails | EmployeeDetails }) {
    const [isModal, setIsModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { passwordReset, isSuccess } = useUserPasswordReset();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(resetPasswordSchema) });

    useEffect(() => {
        if (isSuccess) {
            reset();
            setIsModal(false);
        }
    }, [isSuccess, reset]);

    const onSubmit: SubmitHandler<ResetPassword> = (data) => {
        passwordReset(data);
    };
    return (
        <>
            <button onClick={() => setIsModal(true)}>
                <PasswordSvg />
            </button>
            <Modal isOpen={isModal} opacity={0} onClose={() => setIsModal(false)}>
                <div className='flex h-screen w-screen flex-col items-center justify-center text-customDarkBlue'>
                    <div className='text-center text-xl font-extrabold '>
                        <p>Reset password for user</p>

                        <p>
                            {userData.firstName} {userData.lastName}?
                        </p>
                    </div>

                    <form className='mt-9 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor='password' className='mb-1.5 text-base font-bold'>
                            New password
                        </label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                className='mb-4 flex w-96 items-center rounded-lg bg-white pb-2 pl-2 pt-3.5 shadow outline-none'
                                placeholder='**********'
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-0 top-[15px] flex cursor-pointer items-center pr-3'
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <label htmlFor='confirmPassword' className='mb-1.5 text-base font-bold'>
                            Confirm password
                        </label>
                        <div className='relative mb-9'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                className=' flex w-96 items-center rounded-lg bg-white pb-2 pl-2 pt-3.5 shadow outline-none'
                                placeholder='**********'
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-0 top-[15px] flex cursor-pointer items-center pr-3'
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className='mb-6 text-customRed'>
                            <p>{errors.password?.message}</p>
                            <p>{errors.confirmPassword?.message}</p>
                        </div>

                        <div className='flex flex-col items-center gap-5'>
                            <button type='submit' className='adminProjectBtn w-[179px]'>
                                Change Password
                            </button>
                            <button
                                type='button'
                                onClick={() => setIsModal(false)}
                                className='text-base font-bold text-customDarkBlue underline'
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
export default UserPassword;

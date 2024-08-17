import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';

import { createUserSchema } from '../../shared/formValidations';
import { CreateUserDataType } from '../../shared/types';
import InputComponent from '../../UI/formComponents/InputComponent';
import useCreateUser from './hooks/useCreateUser';

import mainLogo from '@/assets/timeManagementLogo.png';
import GearSvg from '@/UI/design/GearSvg';
import useFetchEmailValidation from '@/reactQuery/hooks/useFetchEmailValidation';
import { useParams } from 'react-router-dom';
import Loader from '@/UI/Loader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function GoogleCreateAcc() {
    const [isVisible, setIsVisible] = useState(false);
    const { createUser, isSuccess } = useCreateUser();
    const { id } = useParams<string>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        reset,
    } = useForm<CreateUserDataType>({
        resolver: yupResolver(createUserSchema),
    });

    const { data, error, isLoading } = useFetchEmailValidation(id!);

    const onSubmit: SubmitHandler<CreateUserDataType> = (data) => {
        createUser(data);
    };

    const toggleVisibility = () => {
        setIsVisible((prevVisibility) => !prevVisibility);
    };

    useEffect(() => {
        if (isSuccess) {
            reset();
        }
    }, [isSuccess, reset]);

    useEffect(() => {
        if (error) {
            toast.error('Invalid or expired invite!');
            navigate('/'); // Redirect to home page on error
        }
    }, [error, navigate]);

    if (isLoading) {
        return (
            <div className='flex flex-row items-center justify-center'>
                <Loader />
            </div>
        );
    }

    return (
        <div className='mx-auto flex max-w-xl flex-col gap-6 p-5'>
            <div className='flex flex-col items-center'>
                <img src={mainLogo} className='mx-auto mb-2 mt-2 scale-50' />
                <p className='scale-75 font-mavenPro text-xl font-bold text-welcomeMsgColor'>
                    Welcome to your time management hero.
                </p>
            </div>
            <div className='absolute left-[20rem] top-[51rem] -z-10'>
                <GearSvg />
            </div>
            <div className='bot-[45rem] absolute right-[3rem] -z-10'>
                <GearSvg />
            </div>
            <div className='bot-[45rem] absolute left-[-1rem] -z-10 scale-150'>
                <GearSvg />
            </div>
            <form
                className='flex flex-col rounded-3xl border bg-white  p-9 shadow-loginFormShadow'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className='mb-6 self-center font-mavenPro text-2xl font-semibold text-welcomeMsgColor'>
                    Create your account
                </h2>

                {errors && (
                    <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                        {errors[Object.keys(errors)[0] as keyof CreateUserDataType]?.message}
                    </span>
                )}

                <>
                    <InputComponent
                        error={errors.email?.message}
                        register={register}
                        trigger={trigger}
                        field='email'
                    />
                    <div className='flex justify-between gap-5'>
                        <InputComponent
                            error={errors.firstName?.message}
                            register={register}
                            trigger={trigger}
                            field='firstName'
                        />
                        <InputComponent
                            error={errors.lastName?.message}
                            register={register}
                            trigger={trigger}
                            field='lastName'
                        />
                    </div>

                    <>
                        <div className='flex justify-between gap-5'>
                            <InputComponent
                                error={errors.companyName?.message}
                                register={register}
                                trigger={trigger}
                                field='companyName'
                                placeholder='Company Name'
                            />
                            <InputComponent
                                error={errors.phoneNumber?.message}
                                register={register}
                                trigger={trigger}
                                field='phoneNumber'
                                placeholder='Phone Number'
                            />
                        </div>
                        <InputComponent
                            error={errors.address?.message}
                            register={register}
                            trigger={trigger}
                            field='address'
                            placeholder='Address'
                        />
                    </>

                    <div className='flex justify-between gap-5'>
                        <InputComponent
                            error={errors.password?.message}
                            register={register}
                            trigger={trigger}
                            field='password'
                            type={isVisible ? 'text' : 'password'}
                            password={true}
                            toggleVisibility={toggleVisibility}
                            isVisible={isVisible}
                            placeholder='Password'
                        />
                        <InputComponent
                            error={errors.confirmPassword?.message}
                            register={register}
                            trigger={trigger}
                            field='confirmPassword'
                            type={isVisible ? 'text' : 'password'}
                            password={true}
                            toggleVisibility={toggleVisibility}
                            isVisible={isVisible}
                            placeholder='Confirm password'
                        />
                    </div>
                    <InputComponent
                        error={errors.description?.message}
                        register={register}
                        trigger={trigger}
                        field='description'
                    />
                    <button
                        type='submit'
                        className='mt-6 w-1/3 self-center rounded-lg bg-loginBtnColor px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                        // disabled={loading}
                    >
                        {/* {loading ? 'Creating...' : 'Create user'} */}
                        Continue
                    </button>
                    <div className='my-4 flex items-center justify-center'>
                        <div className='w-1/3 border-t border-gray-300'></div>
                        <span className='mx-2 text-gray-500'>or</span>
                        <div className='w-1/3 border-t border-gray-300'></div>
                    </div>
                    <div className='self-center'>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                </>
            </form>
        </div>
    );
}

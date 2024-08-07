import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import LoginError from '../errors/LoginError';
import useLogin from './hooks/useLogin';

import mainLogo from '@/assets/timeManagementLogo.png';
import { loginSchema } from '@/shared/formValidations';
import { LoginFormDataType } from '@/shared/types';
import InputComponent from '@/UI/formComponents/InputComponent';
import Loader from '@/UI/Loader';

export default function Login() {
    const { login, error, isError, isPending } = useLogin();

    const [isVisible, setIsVisible] = useState(false);

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const googleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('google submit');
    };

    const onSubmit: SubmitHandler<LoginFormDataType> = (data) => {
        login(data);
    };

    const toggleVisibility = () => {
        setIsVisible((prevVisibility) => !prevVisibility);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            {isPending && <Loader />}
            <div>
                <img src={mainLogo} className='mx-auto mb-12 mt-20 scale-50' />
                <p className='scale-75 self-center font-mavenPro text-xl font-bold text-welcomeMsgColor'>
                    Welcome to your time management hero.
                </p>
            </div>
            <div className='mt-4 w-full max-w-sm rounded-3xl border bg-white px-8 py-10  shadow-loginFormShadow'>
                <div className='flex flex-col'>
                    <h2 className='mb-6 self-center font-mavenPro text-2xl font-semibold text-welcomeMsgColor'>
                        Log in your account.
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                        <InputComponent
                            disabled={isPending}
                            error={errors.email?.message}
                            isResponseError={isError}
                            register={register}
                            trigger={trigger}
                            field='email'
                            shouldShowIcons={true}
                        />
                        <InputComponent
                            disabled={isPending}
                            error={errors.password?.message}
                            isResponseError={isError}
                            register={register}
                            trigger={trigger}
                            field='password'
                            type={isVisible ? 'text' : 'password'}
                            password={true}
                            toggleVisibility={toggleVisibility}
                            isVisible={isVisible}
                            shouldShowIcons={true}
                        />
                        <LoginError errors={errors} loginResponseErr={error} />
                        <button
                            disabled={isPending}
                            type='submit'
                            className='mt-12 w-2/3 self-center rounded-lg bg-loginBtnColor px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                        >
                            Login
                        </button>
                        <div className='my-4 flex w-2/4 items-center self-center'>
                            <div className='flex-grow border-t border-gray-400'></div>
                            <span className='mx-4 text-gray-500'>or</span>
                            <div className='flex-grow border-t border-gray-400'></div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <button
                                className='flex w-2/3 items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-xs font-medium text-gray-800 shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                                onClick={(e) => googleSubmit(e)}
                            >
                                <svg
                                    className='mr-2 h-6 w-6'
                                    xmlns='http://www.w3.org/2000/svg'
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    width='800px'
                                    height='800px'
                                    viewBox='-0.5 0 48 48'
                                    version='1.1'
                                >
                                    {' '}
                                    <title>Google-color</title> <desc>Created with Sketch.</desc>{' '}
                                    <defs> </defs>{' '}
                                    <g
                                        id='Icons'
                                        stroke='none'
                                        strokeWidth='1'
                                        fill='none'
                                        fillRule='evenodd'
                                    >
                                        {' '}
                                        <g
                                            id='Color-'
                                            transform='translate(-401.000000, -860.000000)'
                                        >
                                            {' '}
                                            <g
                                                id='Google'
                                                transform='translate(401.000000, 860.000000)'
                                            >
                                                {' '}
                                                <path
                                                    d='M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24'
                                                    id='Fill-1'
                                                    fill='#FBBC05'
                                                >
                                                    {' '}
                                                </path>{' '}
                                                <path
                                                    d='M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333'
                                                    id='Fill-2'
                                                    fill='#EB4335'
                                                >
                                                    {' '}
                                                </path>{' '}
                                                <path
                                                    d='M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667'
                                                    id='Fill-3'
                                                    fill='#34A853'
                                                >
                                                    {' '}
                                                </path>{' '}
                                                <path
                                                    d='M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24'
                                                    id='Fill-4'
                                                    fill='#4285F4'
                                                >
                                                    {' '}
                                                </path>{' '}
                                            </g>{' '}
                                        </g>{' '}
                                    </g>{' '}
                                </svg>
                                <span>Continue with Google</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

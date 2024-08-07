import { yupResolver } from '@hookform/resolvers/yup';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import LoginError from '../errors/LoginError';
import useLogin from './hooks/useLogin';

import mainLogo from '@/assets/timeManagementLogo.png';
import httpServices from '@/services/httpServices';
import { loginSchema } from '@/shared/formValidations';
import { LoginFormDataType } from '@/shared/types';
import InputComponent from '@/UI/formComponents/InputComponent';
import Loader from '@/UI/Loader';

export default function Login() {
    const { login, error, isError, isPending } = useLogin();
    const { post } = httpServices();

    const [isVisible, setIsVisible] = useState(false);
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormDataType> = (data) => {
        login(data);
    };

    const toggleVisibility = () => {
        setIsVisible((prevVisibility) => !prevVisibility);
    };

    const onSuccess = (response: CredentialResponse) => {
        const token = response.credential;

        post(`${import.meta.env.VITE_API_BASE_URL}/login/google/${token}`).then((resp) => {
            console.log(resp);
        });
    };

    const onError = () => {
        console.error('Google login failed');
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
                        <div className='w-auto self-center'>
                        <GoogleLogin onSuccess={onSuccess} onError={onError} text='continue_with' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

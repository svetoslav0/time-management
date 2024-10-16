import { yupResolver } from '@hookform/resolvers/yup';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import LoginError from '../errors/LoginError';
import { useLoginData } from './AuthContext';
import useLogin from './hooks/useLogin';

import mainLogo from '@/assets/timeManagementLogo.png';
import httpServices from '@/services/httpServices';
import { loginSchema } from '@/shared/formValidations';
import { LoginFormDataType, LoginResponseData } from '@/shared/types';
import InputComponent from '@/UI/formComponents/InputComponent';
import Loader from '@/UI/Loader';
import GearSvg from '@/UI/design/GearSvg';

export default function Login() {
    const { login, error, isError, isPending } = useLogin();
    const { post } = httpServices();
    const { setLoginData } = useLoginData();
    const navigate = useNavigate();

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
        post(`/login/google/${token}`)
            .then((res) => {
                const loginResponse = res as LoginResponseData;
                setLoginData(loginResponse);
                navigate('/dashboard')
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const onError = () => {
        toast.error('Google login failed');
        console.error('Google login failed');
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            {isPending && <Loader />}

            <div className='absolute left-[20rem] top-[51rem] -z-10'>
                <GearSvg />
            </div>
            <div className='bot-[45rem] absolute right-[3rem] -z-10'>
                <GearSvg />
            </div>
            <div className='bot-[45rem] absolute left-[-1rem] -z-10 scale-150'>
                <GearSvg />
            </div>

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
                        <div className='w-auto self-center'>
                            <GoogleLogin
                                onSuccess={onSuccess}
                                onError={onError}
                                text='continue_with'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

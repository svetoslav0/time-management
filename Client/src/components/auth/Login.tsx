import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import LoginError from '../errors/LoginError';
import useLogin from './hooks/useLogin';

import mainLogo from '@/assets/timeManagementLogo.png';
import { loginSchema } from '@/shared/formValidations';
import { LoginFormDataType } from '@/shared/types';
import InputComponent from '@/UI/formComponents/InputComponent';

export default function Login() {
    const { mutate: login, loginResponseErr } = useLogin();

    const [isVisible, setIsVisible] = useState(false);
    const [isLoginError, setIsLoginError] = useState<string | null>(null);

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

    useEffect(() => {
        if (loginResponseErr) {
            setIsLoginError(loginResponseErr);
        }
    }, [loginResponseErr]);

    return (
        <div className='flex flex-col items-center justify-center'>
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
                            error={errors.email?.message}
                            responseError={isLoginError}
                            register={register}
                            trigger={trigger}
                            field='email'
                        />
                        <InputComponent
                            error={errors.password?.message}
                            responseError={isLoginError}
                            register={register}
                            trigger={trigger}
                            field='password'
                            type={isVisible ? 'text' : 'password'}
                            password={true}
                            toggleVisibility={toggleVisibility}
                            isVisible={isVisible}
                        />
                        <LoginError errors={errors} loginResponseErr={isLoginError} />
                        <button
                            type='submit'
                            className='mt-12 w-2/3 self-center rounded-lg bg-loginBtnColor px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

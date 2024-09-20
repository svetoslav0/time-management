import { yupResolver } from '@hookform/resolvers/yup';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { createGoogleUserSchema } from '../../shared/formValidations';
import { CreateUserDataType } from '../../shared/types';
import InputComponent from '../../UI/formComponents/InputComponent';
import useInviteRegister from './hooks/useInviteRegister';

import mainLogo from '@/assets/timeManagementLogo.png';
import useFetchEmailValidation from '@/reactQuery/hooks/useFetchEmailValidation';
import GearSvg from '@/UI/design/GearSvg';
import Loader from '@/UI/Loader';

export default function GoogleCreateAcc() {
    const [isVisible, setIsVisible] = useState(false);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const [credentialResponse, setCredentialResponse] = useState({} as CredentialResponse);
    const { createUser, isSuccess } = useInviteRegister();
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const { error, isLoading, data: emailValidationData } = useFetchEmailValidation(id);
    const [email, setEmail] = useState('');

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CreateUserDataType>({
        resolver: yupResolver(createGoogleUserSchema),
        defaultValues: {
            userRole: 'customer',
        },
    });

    const { data: initialData, error, isLoading } = useFetchEmailValidation(id);

    const onSubmit: SubmitHandler<CreateUserDataType> = (data) => {
        data.email = initialData!.email;
        const inviteData = { ...data, inviteId: id };
        if (isGoogleLogin) {
            inviteData.isGoogleLogin = true;
            inviteData.googleToken = credentialResponse.credential;
            createUser(inviteData);
        } else {
            console.log(inviteData.email);
            createUser(inviteData);
        }

    };

    const toggleVisibility = () => {
        setIsVisible((prevVisibility) => !prevVisibility);
    };

    const onSuccess = (response: CredentialResponse) => {
        setIsGoogleLogin(true);
        setCredentialResponse(response);
    };

    useEffect(() => {
        if (isSuccess) {
            reset();
        }
    }, [isSuccess, reset]);

    useEffect(() => {
        if (error) {
            toast.error('Invalid or expired invite!');
            navigate('/');
        }
    }, [error, navigate]);

    useEffect(() => {
        if (emailValidationData && emailValidationData.email) {
            setEmail(emailValidationData.email);
        }
    }, [emailValidationData]);

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
                <div>
                    <p>Complete account for</p>
                    <p className='font-bold'>{initialData?.email}</p>
                </div>

                {errors && (
                    <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                        {errors[Object.keys(errors)[0] as keyof CreateUserDataType]?.message}
                    </span>
                )}

                <>
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

                    {!isGoogleLogin && (
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
                    )}
                    <InputComponent
                        error={errors.description?.message}
                        register={register}
                        trigger={trigger}
                        field='description'
                    />
                    <button
                        type='submit'
                        className='mt-6 w-2/3 self-center rounded-lg bg-loginBtnColor px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                        // disabled={loading}
                    >
                        {/* {loading ? 'Creating...' : 'Create user'} */}
                        Complete your account
                    </button>
                    {!isGoogleLogin && (
                        <>
                            <div className='my-4 flex items-center justify-center'>
                                <div className='w-1/3 border-t border-gray-300'></div>
                                <span className='mx-2 text-gray-500'>or</span>
                                <div className='w-1/3 border-t border-gray-300'></div>
                            </div>
                            <div className='self-center'>
                                <GoogleLogin
                                    text='continue_with'
                                    onSuccess={onSuccess}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                        </>
                    )}
                </>
            </form>
        </div>
    );
}

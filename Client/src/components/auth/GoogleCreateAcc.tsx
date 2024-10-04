import { yupResolver } from '@hookform/resolvers/yup';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { createGoogleUserSchema } from '@/shared/formValidations';
import { CreateUserDataType } from '@/shared/types';
import InputComponent from '../../UI/formComponents/InputComponent';
import useInviteRegister from './hooks/useInviteRegister';

import mainLogo from '@/assets/timeManagementLogo.png';
import useFetchEmailValidation from '@/reactQuery/hooks/useFetchEmailValidation';
import GearSvg from '@/UI/design/GearSvg';
import Loader from '@/UI/Loader';
import { urlKeys } from '@/reactQuery/constants';
import useFetchUserEmailValidation from '@/reactQuery/hooks/useFetchUserEmailValidation';

import httpServices from '@/services/httpServices';

import httpServices from '../../services/httpServices';

export default function GoogleCreateAcc() {
    const [isVisible, setIsVisible] = useState(false);
    const [isGoogleLoginSuccessful, setIsGoogleLoginSuccessful] = useState(false);
    const [credentialResponse, setCredentialResponse] = useState<CredentialResponse>({});
    const { createUser, isSuccess } = useInviteRegister();
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [googleEmail, setGoogleEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const { post } = httpServices();

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
        const inviteData = { ...data, inviteId: id };
        if (isGoogleLoginSuccessful) {
            inviteData.email = googleEmail;
            inviteData.isGoogleLogin = true;
            inviteData.googleToken = credentialResponse.credential;
            createUser(inviteData);
        } else {
            createUser(inviteData);
        }
    };

    const toggleVisibility = () => {
        setIsVisible((prevVisibility) => !prevVisibility);
    };

    const onSuccessfulGoogleLogin = async (response: CredentialResponse) => {
        try {
            const decodedToken = jwtDecode(response.credential as string) as JwtPayload & {
                email?: string;
                given_name?: string;
                family_name?: string;
            };
            const userEmail = decodedToken.email || '';

            post(`/users/validate_email/${userEmail}`)
                .then(res => {
                    const isExisting = res.isExisting;

                    if (isExisting) {
                        toast.error('Such user already exists');
                        return;
                    }

                    setIsGoogleLoginSuccessful(true);
                    setCredentialResponse(response);
                    setGoogleEmail(userEmail || '');
                    setFirstName(decodedToken.given_name || '');
                    setLastName(decodedToken.family_name || '');

                    setValue('firstName', decodedToken.given_name || '');
                    setValue('lastName', decodedToken.family_name || '');
                })
                .catch(err => {
                    console.error('Error checking email:', err);
                    toast.error('Something went wrong. Please try again.');
                });
        } catch (error) {
            console.error('Error checking email:', error);
            toast.error('Something went wrong. Please try again.');
        }
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
        if (initialData) {
            setValue('email', initialData?.email);
            setEmail(initialData?.email);
        }
    }, [initialData]);

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

                {isGoogleLoginSuccessful && (
                    <div>
                        <p>Complete account for</p>
                        <p className='font-bold'>{googleEmail}</p>
                    </div>
                )}

                {errors && (
                    <ul role='alert' className='text-sm text-red-500 dark:text-red-400'>
                        {Object.keys(errors).map((key) => (
                            <li key={key}>{errors[key as keyof CreateUserDataType]?.message}</li>
                        ))}
                    </ul>
                )}

                <>
                    {!isGoogleLoginSuccessful && (
                        <InputComponent
                            error={errors.email?.message}
                            register={register}
                            trigger={trigger}
                            field='email'
                            value={email}
                            onChange={(e) => {
                                setValue('email', e.currentTarget.value);
                                setEmail(e.currentTarget.value);
                            }}
                        />
                    )}
                    <div className='flex justify-between gap-5'>
                        <InputComponent
                            error={errors.firstName?.message}
                            register={register}
                            trigger={trigger}
                            field='firstName'
                            value={firstName}
                            onChange={(e) => {
                                setValue('firstName', e.currentTarget.value);
                                setFirstName(e.currentTarget.value);
                            }}
                        />
                        <InputComponent
                            error={errors.lastName?.message}
                            register={register}
                            trigger={trigger}
                            field='lastName'
                            value={lastName}
                            onChange={(e) => {
                                setValue('lastName', e.currentTarget.value);
                                setLastName(e.currentTarget.value);
                            }}
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

                    {!isGoogleLoginSuccessful && (
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
                        type='textarea'
                    />
                    <button
                        type='submit'
                        className='mt-6 w-2/3 self-center rounded-lg bg-loginBtnColor px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                        // disabled={loading}
                    >
                        {/* {loading ? 'Creating...' : 'Create user'} */}
                        Complete your account
                    </button>
                    {!isGoogleLoginSuccessful && (
                        <>
                            <div className='my-4 flex items-center justify-center'>
                                <div className='w-1/3 border-t border-gray-300'></div>
                                <span className='mx-2 text-gray-500'>or</span>
                                <div className='w-1/3 border-t border-gray-300'></div>
                            </div>
                            <div className='self-center'>
                                <GoogleLogin
                                    text='continue_with'
                                    onSuccess={onSuccessfulGoogleLogin}
                                    onError={() => {
                                        console.error('Login Failed');
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

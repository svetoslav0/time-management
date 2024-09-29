import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createUserSchema } from '../../shared/formValidations';
import { CreateUserDataType } from '../../shared/types';
import InputComponent from '../../UI/formComponents/InputComponent';
import useCreateUser from './hooks/useCreateUser';

import mainLogo from '@/assets/timeManagementLogo.png';
import GearSvg from '@/UI/design/GearSvg';
import cn from '@/util/cn';
//TODO: Implement Route Guard so this page will only be available to Admin users

export default function CreateUser() {
    const selectRef = useRef<HTMLSelectElement>(null);
    const Arrow = () => (
        <svg
            width='28'
            height='28'
            viewBox='0 0 28 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='cursor-pointer'
        >
            <g id='ri:arrow-drop-down-line'>
                <path
                    id='Vector'
                    d='M16.7817 22.5984C15.2309 24.0992 12.7691 24.0992 11.2183 22.5984L2.41082 14.075C1.09243 12.7991 1.09268 10.685 2.41136 9.40946C3.66998 8.19201 5.66741 8.19237 6.9256 9.41026L11.218 13.5652C12.7689 15.0664 15.2311 15.0664 16.782 13.5651L21.0744 9.41025C22.3326 8.19236 24.33 8.19201 25.5886 9.40946C26.9073 10.685 26.9076 12.7991 25.5892 14.075L16.7817 22.5984Z'
                    fill='#008CFF'
                />
            </g>
        </svg>
    );
    const [userType, setUserType] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { createUser, isSuccess } = useCreateUser();
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(createUserSchema),
    });

    const onSubmit: SubmitHandler<CreateUserDataType> = (data) => {
        createUser(data);
    };

    const toggleVisibility = () => {
        setIsVisible((prevVisibility) => !prevVisibility);
    };

    useEffect(() => {
        if (isSuccess) {
            reset();
            setUserType('');
        }
    }, [isSuccess, reset]);

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
                    Create user
                </h2>
                <div className='relative mb-3'>
                    <div
                        className={cn(
                            isOpen ? 'rotate-180' : '',
                            'absolute left-[345px] top-[7px] scale-50 cursor-pointer'
                        )}
                    >
                        <Arrow />
                    </div>
                    <select
                        id='userRole'
                        className='z-10 mx-auto block w-2/3 appearance-none rounded-xl border border-blue-500 p-2.5 text-sm text-gray-900 opacity-50 ring-blue-500 focus:border-2 focus:border-blue-700'
                        defaultValue=''
                        {...register('userRole')}
                        ref={selectRef}
                        onClick={() => setIsOpen((prev) => !prev)}
                        onBlur={() => trigger('userRole')}
                        onChange={(e) => {
                            setUserType(e.currentTarget.value);
                            setValue('userRole', e.currentTarget.value);
                        }}
                    >
                        <option value='' disabled>
                            Select a role
                        </option>
                        <option value='customer'>Customer</option>
                        <option value='employee'>Employee</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>

                {errors.userRole && (
                    <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                        {errors.userRole.message}
                    </span>
                )}
                {userType && (
                    <>
                        {userType === 'employee' && (
                            <div className='mt-5'>
                                <select
                                    id='experienceLevel'
                                    className='block h-11 w-full rounded-xl border border-blue-500 bg-gray-100 p-2.5 text-sm text-gray-900'
                                    defaultValue=''
                                    {...register('experienceLevel')}
                                    onBlur={() => trigger('experienceLevel')}
                                >
                                    <option value='' disabled>
                                        Select experience
                                    </option>
                                    <option value='Junior'>Junior</option>
                                    <option value='Mid-Level'>Mid-Level</option>
                                    <option value='Senior'>Senior</option>
                                    <option value='Architect'>Architect</option>
                                </select>
                                {errors.experienceLevel && (
                                    <span
                                        role='alert'
                                        className='text-sm text-red-500 dark:text-red-400'
                                    >
                                        {errors.experienceLevel.message}
                                    </span>
                                )}
                            </div>
                        )}

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
                        {userType === 'customer' && (
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
                        )}
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
                            type='textarea'
                        />
                        <button
                            type='submit'
                            className='mt-6 w-1/3 self-center rounded-lg bg-loginBtnColor px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                        >
                            Create user
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}

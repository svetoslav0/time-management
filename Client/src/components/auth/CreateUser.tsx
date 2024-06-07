import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createUserSchema } from '../../shared/formValidations';
import { CreateUserDataType } from '../../shared/types';
import InputComponent from '../../UI/formComponents/InputComponent';
import useCreateUser from './hooks/useCreateUser';

//TODO: Implement Route Guard so this page will only be available to Admin users

export default function CreateUser() {
    const [userType, setUserType] = useState('');
    const [isVisible, setIsVisible] = useState(false);

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
        <div className='mx-auto flex max-w-sm flex-col gap-6 p-5'>
            <h2 className='self-center'>Create user</h2>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-5'>
                    <select
                        id='userRole'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                        defaultValue=''
                        {...register('userRole')}
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
                    {errors.userRole && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            {errors.userRole.message}
                        </span>
                    )}
                </div>

                {userType === 'employee' && (
                    <div className='mb-5'>
                        <select
                            id='experience'
                            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                            defaultValue=''
                            {...register('experience')}
                            onBlur={() => trigger('experience')}
                        >
                            <option value='' disabled>
                                Select experience
                            </option>
                            <option value='junior'>Junior</option>
                            <option value='mid-level'>Mid-Level</option>
                            <option value='senior'>Senior</option>
                            <option value='architect'>Architect</option>
                        </select>
                        {errors.experience && (
                            <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                                {errors.experience.message}
                            </span>
                        )}
                    </div>
                )}

                <InputComponent
                    error={errors.username?.message}
                    register={register}
                    trigger={trigger}
                    field='username'
                />
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
                {userType === 'customer' && (
                    <>
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
                        <InputComponent
                            error={errors.address?.message}
                            register={register}
                            trigger={trigger}
                            field='address'
                            placeholder='Address'
                        />
                    </>
                )}
                <InputComponent
                    error={errors.description?.message}
                    register={register}
                    trigger={trigger}
                    field='description'
                />
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
                <button
                    type='submit'
                    className='block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-full'
                    // disabled={loading}
                >
                    {/* {loading ? 'Creating...' : 'Create user'} */}
                    Create user
                </button>
            </form>
        </div>
    );
}

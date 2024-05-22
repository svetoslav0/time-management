import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../../shared/formValidations';
import { CreateUserDataType } from '../../shared/types';

//TODO: Implement Route Guard so this page will only be available to Admin users

export default function CreateUser() {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(createUserSchema),
    });

    const onSubmit: SubmitHandler<CreateUserDataType> = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div className='mx-auto flex max-w-sm flex-col gap-6 p-5'>
            <h2 className='self-center'>Create user</h2>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-5'>
                    <label
                        htmlFor='username'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    />

                    <input
                        type='text'
                        id='username'
                        className={`block w-full rounded-lg border ${
                            errors.username ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                        placeholder='Username'
                        {...register('username')}
                        onBlur={() => trigger('username')}
                    />
                    {errors.username && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            {errors.username.message}
                        </span>
                    )}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='firstName'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    />

                    <input
                        type='text'
                        id='firstName'
                        className={`block w-full rounded-lg border ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                        placeholder='First name'
                        {...register('firstName')}
                        onBlur={() => trigger('firstName')}
                    />
                    {errors.firstName && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            {errors.firstName.message}
                        </span>
                    )}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='lastName'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    />

                    <input
                        type='text'
                        id='lastName'
                        className={`block w-full rounded-lg border ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                        placeholder='Last name'
                        {...register('lastName')}
                        onBlur={() => trigger('lastName')}
                    />
                    {errors.lastName && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            {errors.lastName.message}
                        </span>
                    )}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='role'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    />

                    <select
                        id='role'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                        defaultValue=''
                        {...register('role')}
                        onBlur={() => trigger('role')}
                    >
                        <option value='' disabled>
                            Select a role
                        </option>
                        <option value='customer'>Customer</option>
                        <option value='employee'>Employee</option>
                        <option value='admin'>Admin</option>
                    </select>
                    {errors.role && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            {errors.role.message}
                        </span>
                    )}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='password'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    />

                    <input
                        type='password'
                        id='password'
                        placeholder='Password'
                        className={`block w-full rounded-lg border ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                        {...register('password')}
                        onBlur={() => trigger('password')}
                    />
                    {errors.password && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='rePassword'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    />

                    <input
                        type='password'
                        id='rePassword'
                        placeholder='Repeat password'
                        className={`block w-full rounded-lg border ${
                            errors.rePassword ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                        {...register('rePassword')}
                        onBlur={() => trigger('rePassword')}
                    />
                    {errors.rePassword && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            {errors.rePassword.message}
                        </span>
                    )}
                </div>
                <button
                    type='submit'
                    className='block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Create user
                </button>
            </form>
        </div>
    );
}

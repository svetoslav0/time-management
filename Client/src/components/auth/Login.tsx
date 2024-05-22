import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../shared/formValidations';
import { LoginFormDataType } from '../../shared/types';

export default function Login() {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormDataType> = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div className='mx-auto flex max-w-sm flex-col gap-6 p-5'>
            <h2 className='self-center'>Login</h2>
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
                <button
                    type='submit'
                    className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Login
                </button>
            </form>
        </div>
    );
}

import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    rePassword: string;
};

export default function CreateUser() {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        watch,
        reset,
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
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
                    >
                        Username
                    </label>
                    <input
                        type='text'
                        id='username'
                        className={`block w-full rounded-lg border ${
                            errors.username ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                        placeholder='Peter123'
                        {...register('username', { required: true })}
                        aria-invalid={errors.username ? 'true' : 'false'}
                        onBlur={() => trigger('username')}
                    />
                    {errors.username?.type === 'required' && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            Username required!
                        </span>
                    )}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='firstName'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        First name
                    </label>
                    <input
                        type='text'
                        id='firstName'
                        className={`block w-full rounded-lg border ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                        placeholder='Peter'
                        {...register('firstName', { required: true })}
                        aria-invalid={errors.username ? 'true' : 'false'}
                        onBlur={() => trigger('firstName')}
                    />
                    {errors.firstName?.type === 'required' && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            First name required!
                        </span>
                    )}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='lastName'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Last name
                    </label>
                    <input
                        type='text'
                        id='lastName'
                        className={`block w-full rounded-lg border ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                        placeholder='Petrov'
                        {...register('lastName', { required: true })}
                        aria-invalid={errors.username ? 'true' : 'false'}
                        onBlur={() => trigger('lastName')}
                    />
                    {errors.lastName?.type === 'required' && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            Last name required!
                        </span>
                    )}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='role'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Select role
                    </label>
                    <select
                        id='role'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                        defaultValue=''
                        {...register('role', { required: true })}
                    >
                        <option value='' disabled>
                            Select a role
                        </option>
                        <option value='customer'>Customer</option>
                        <option value='employee'>Employee</option>
                        <option value='admin'>Admin</option>
                    </select>
                    {errors.role?.type === 'required' && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            Role required!
                        </span>
                    )}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='password'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className={`block w-full rounded-lg border ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                        {...register('password', { required: true })}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        onBlur={() => trigger('password')}
                    />
                    {errors.password?.type === 'required' && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            Password required!
                        </span>
                    )}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='rePassword'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Repeat Password
                    </label>
                    <input
                        type='password'
                        id='rePassword'
                        className={`block w-full rounded-lg border ${
                            errors.rePassword ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                        {...register('rePassword', {
                            validate: (value) => value === watch('password'),
                        })}
                        aria-invalid={errors.rePassword ? 'true' : 'false'}
                        onBlur={() => trigger('rePassword')}
                    />
                    {errors.rePassword && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            Passwords must match!
                        </span>
                    )}
                </div>
                <button
                    type='submit'
                    className='block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Register
                </button>
            </form>
        </div>
    );
}

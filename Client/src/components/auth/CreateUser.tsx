import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import httpServices from '../../services/httpServices';
import { createUserSchema } from '../../shared/formValidations';
import { CreateUserDataType, User } from '../../shared/types';
import InputComponent from '../../UI/formComponents/InputComponent';

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

    const onSubmit: SubmitHandler<CreateUserDataType> = async (data) => {
        await httpServices().post<CreateUserDataType, User>('/users/user', data);

        reset();
    };

    return (
        <div className='mx-auto flex max-w-sm flex-col gap-6 p-5'>
            <h2 className='self-center'>Create user</h2>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
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
                <div className='mb-5'>
                    <label
                        htmlFor='userRole'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    />

                    <select
                        id='userRole'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                        defaultValue=''
                        {...register('userRole')}
                        onBlur={() => trigger('userRole')}
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
                <InputComponent
                    error={errors.password?.message}
                    register={register}
                    trigger={trigger}
                    field='password'
                    type='password'
                />
                <InputComponent
                    error={errors.rePassword?.message}
                    register={register}
                    trigger={trigger}
                    field='rePassword'
                    type='password'
                />
                <button
                    type='submit'
                    className='block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-full'
                >
                    Create user
                </button>
            </form>
        </div>
    );
}

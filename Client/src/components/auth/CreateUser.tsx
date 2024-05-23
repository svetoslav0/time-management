import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler,useForm } from 'react-hook-form';

import { createUserSchema } from '../../shared/formValidations';
import { CreateUserDataType } from '../../shared/types';
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

    const onSubmit: SubmitHandler<CreateUserDataType> = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div className='mx-auto flex max-w-sm flex-col gap-6 p-5'>
            <h2 className='self-center'>Create user</h2>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
                <InputComponent errors={errors} register={register} trigger={trigger} field='username' />
                <InputComponent errors={errors} register={register} trigger={trigger} field='firstName' />
                <InputComponent errors={errors} register={register} trigger={trigger} field='lastName' />
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
                        <option value='Customer'>Customer</option>
                        <option value='Employee'>Employee</option>
                        <option value='Admin'>Admin</option>
                    </select>
                    {errors.role && (
                        <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                            {errors.role.message}
                        </span>
                    )}
                </div>
                <InputComponent errors={errors} register={register} trigger={trigger} field='password' />
                <InputComponent errors={errors} register={register} trigger={trigger} field='rePassword' />
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

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import httpServices from '../../services/httpServices';
import { loginSchema } from '../../shared/formValidations';
import { LoginFormDataType } from '../../shared/types';
import InputComponent from '../../UI/formComponents/InputComponent';

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

    const onSubmit: SubmitHandler<LoginFormDataType> = async (data) => {
        const response = await httpServices().post('/users/login', data);
        if (response) {
            localStorage.setItem('user', JSON.stringify(response)); // Convert response to a string
        }
        reset();
    };

    return (
        <div className='mx-auto flex max-w-sm flex-col gap-6 p-5'>
            <h2 className='self-center'>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputComponent
                    error={errors.username?.message}
                    register={register}
                    trigger={trigger}
                    field='username'
                />
                <InputComponent
                    error={errors.password?.message}
                    register={register}
                    trigger={trigger}
                    field='password'
                    type='password'
                />
                <button
                    type='submit'
                    className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-full'
                >
                    Login
                </button>
            </form>
        </div>
    );
}

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler,useForm } from 'react-hook-form';

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

    const onSubmit: SubmitHandler<LoginFormDataType> = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div className='mx-auto flex max-w-sm flex-col gap-6 p-5'>
            <h2 className='self-center'>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputComponent errors={errors} register={register} trigger={trigger} field='username' />
                <InputComponent errors={errors} register={register} trigger={trigger} field='password' />
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

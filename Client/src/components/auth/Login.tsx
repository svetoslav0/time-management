import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { loginSchema } from '../../shared/formValidations';
import { FormProps, LoginFormDataType } from '../../shared/types';
import LoginForm from '../../UI/formComponents/LoginForm';

export default function Login() {
    const formMethods = useForm<LoginFormDataType>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormDataType> = (data) => {
        console.log(data);
        formMethods.reset();
    };

    const formProps: FormProps<LoginFormDataType> = {
        ...formMethods,
        onSubmit,
    };

    return (
        <div className='mx-auto flex max-w-sm flex-col gap-6 p-5'>
            <h2 className='self-center'>Login</h2>
            <LoginForm {...formProps} />
        </div>
    );
}

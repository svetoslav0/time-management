import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createUserSchema } from '../../shared/formValidations';
import { CreateUserDataType, FormProps } from '../../shared/types';
import CreateUserForm from '../../UI/formComponents/CreateUserForm';

//TODO: Implement Route Guard so this page will only be available to Admin users

export default function CreateUser() {
    const formMethods = useForm<CreateUserDataType>({
        resolver: yupResolver(createUserSchema),
    });

    const onSubmit: SubmitHandler<CreateUserDataType> = (data) => {
        console.log(data);
        formMethods.reset();
    };

    const formProps: FormProps<CreateUserDataType> = {
        ...formMethods,
        onSubmit,
    };

    return (
        <div className='mx-auto flex max-w-sm flex-col gap-6 p-5'>
            <h2 className='self-center'>Create user</h2>
            <CreateUserForm {...formProps} />
        </div>
    );
}

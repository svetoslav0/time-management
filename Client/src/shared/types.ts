import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export type LoginFormDataType = {
    username: string;
    password: string;
};

export type CreateUserDataType = {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    rePassword?: string;
};

export type FormProps<T extends FieldValues> = UseFormReturn<T> & { onSubmit: SubmitHandler<T> };

export interface LoginFormProps extends FormProps<LoginFormDataType> {}
export interface CreateUserFormProps extends FormProps<CreateUserDataType> {}

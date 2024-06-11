import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export type User = {
    email: string;
    firstName: string;
    lastName: string;
    userRole: string;
    status: string;
    _id: string;
};

export type LoginFormDataType = {
    email: string;
    password: string;
};

export type CreateUserDataType = {
    email: string;
    firstName: string;
    lastName: string;
    userRole: string;
    password: string;
    description?: string | undefined;
    confirmPassword: string;
    experience?: string | undefined;
    companyName?: string | undefined;
    phoneNumber?: string | undefined;
    address?: string | undefined;

};

// requestsTypes

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestOptions<T> {
    url: string;
    method: MethodType;
    data?: T;
    headers?: Record<string, string>;
}

export interface HttpService {
    get<V>(url: string, headers?: Record<string, string>): Promise<V>;
    post<T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V>;
    put<T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V>;
    delete<V>(url: string, headers?: Record<string, string>): Promise<V>;
}

export type FormProps<T extends FieldValues> = UseFormReturn<T> & { onSubmit: SubmitHandler<T> };

export interface LoginFormProps extends FormProps<LoginFormDataType> {}
export interface CreateUserFormProps extends FormProps<CreateUserDataType> {}

// Project Type

export type Project = {
    projectName: string;
    clientName: string;
    startingDate: number;
    pricePerHour: number;
    listOfEmployees: string[];
    projectStatus: string;
};

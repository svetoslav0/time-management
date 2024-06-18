import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export type User = {
    email: string;
    firstName: string;
    lastName: string;
    userRole: string;
    status: string;
    createdAt: string;
    description?: string | undefined;
    experienceLevel?: string | undefined;
    companyName?: string | undefined;
    phoneNumber?: string | undefined;
    address?: string | undefined;
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
    experienceLevel?: string | undefined;
    companyName?: string | undefined;
    phoneNumber?: string | undefined;
    address?: string | undefined;
};
export type EditUserDataType = {
    email: string;
    firstName: string;
    lastName: string;
    userRole?: string;
    description?: string | undefined;
    experienceLevel?: string | undefined;
    companyName?: string | undefined;
    phoneNumber?: string | undefined;
    address?: string | undefined;
    status?: string;
};

// requestsTypes

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

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

export interface ResetPassword {
    password: string;
    confirmPassword: string;
}

// Project Type

export type Project = {
    projectName: string;
    clientName: string;
    startingDate: number;
    pricePerHour: number;
    listOfEmployees: string[];
    projectStatus: string;
};

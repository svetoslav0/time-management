import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export type UserDetails = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    userRole: string;
    status: string;
    createdAt: string;
    description?: string | undefined;
};

export type EmployeeDetails = {
    experienceLevel: string;
} & UserDetails;

export type CustomerDetails = {
    companyName: string;
    phoneNumber: string;
    address: string;
} & UserDetails;

export type UserResponseDetails = {
    total: number;
    items: (EmployeeDetails | CustomerDetails)[];
};

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
    ref?: string;
    _id: string;
};

export type LoginResponseData = {
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    userRole: string;
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
    ref?: string;
    userId?: string;
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
    patch<T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V>;
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
    pricePerHour: number;
    employeeIds: string[];
    customerIds: string[];
    startingDate: string;
    _id: string | undefined;
    status: string;
};
export type ProjectStatusType = 'inProgress' | 'completed';

export type ProjectDataType = {
    projectName: string;
    pricePerHour: number;
    employeeIds: string[];
    customerIds?: string[];
    startingDate: string;
    inviteEmails?: string[];
};

export type ProjectResponseDataType = {
    _id: string;
    status: ProjectStatusType;
} & ProjectDataType;

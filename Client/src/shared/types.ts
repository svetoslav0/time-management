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

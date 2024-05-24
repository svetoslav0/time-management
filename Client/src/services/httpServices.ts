import { HttpService, MethodType, RequestOptions } from '../shared/types';
import { httpRequest } from './httpRequests';

export default function httpServices(): HttpService {
    const request = async <T, V>(
        url: string,
        method: MethodType,
        data?: T,
        headers?: Record<string, string>
    ): Promise<V> => {
        const options: RequestOptions<T> = { url, method, data, headers };
        return httpRequest<T, V>(options);
    };

    return {
        get: async <V>(url: string): Promise<V> => {
            return request<null, V>(url, 'GET');
        },
        post: async <T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V> => {
            return request<T, V>(url, 'POST', data, headers);
        },
        put: async <T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V> => {
            return request<T, V>(url, 'PUT', data, headers);
        },
        delete: async <V>(url: string): Promise<V> => {
            return request<null, V>(url, 'DELETE');
        },
    };
}

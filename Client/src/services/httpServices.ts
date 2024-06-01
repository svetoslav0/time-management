import buildQueryString from './buildQueryString';
import { httpRequest } from './httpRequests';

export default function httpServices() {
    return {
        get: async <V>(
            url: string,
            params?: Record<string, string | boolean | number>
        ): Promise<V> => {
            const queryString = params ? `?${buildQueryString(params)}` : '';
            const fullUrl = url + queryString;
            return httpRequest<null, V>({ url: fullUrl, method: 'GET' });
        },
        post: async <T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V> => {
            return httpRequest<T, V>({ url, method: 'POST', data, headers });
        },
        put: async <T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V> => {
            return httpRequest<T, V>({ url, method: 'PUT', data, headers });
        },
        delete: async <V>(url: string): Promise<V> => {
            return httpRequest<null, V>({ url, method: 'DELETE' });
        },
    };
}

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions<T> {
    url: string;
    method: MethodType;
    data?: T;
    headers?: Record<string, string>;
}

async function httpRequest<T, V>(options: RequestOptions<T>): Promise<V> {
    const { url, method, data, headers } = options;
    const fetchHeaders = new Headers({
        // Authorization: 'Bearer /* TOKEN */',
        'Content-Type': 'application/json',
        ...headers,
    });

    const request: RequestInit = {
        method,
        headers: fetchHeaders,
    };

    if (data) {
        if (data instanceof FormData) {
            request.body = data;
            fetchHeaders.delete('Content-Type');
        } else {
            request.body = JSON.stringify(data);
        }
    }

    try {
        const response = await fetch(url, request);

        if (!response.ok) {
            throw new Error(`HTTP Request failed: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('HTTP Request failed: unknown error');
        }
    }
}

export default function httpService() {
    return {
        get: async <V>(url: string): Promise<V> => {
            return httpRequest<null, V>({ url: url, method: 'GET' });
        },
        post: async <T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V> => {
            return httpRequest<T, V>({ url, method: 'POST', data, headers });
        },
        put: async <T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V> => {
            return httpRequest<T, V>({ url, method: 'PUT', data, headers });
        },
        delete: async <V>(url: string, headers?: Record<string, string>): Promise<V> => {
            return httpRequest<null, V>({ url, method: 'DELETE', headers });
        },
    };
}

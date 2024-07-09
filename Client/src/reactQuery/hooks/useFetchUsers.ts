import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { UserResponseDetails } from '@/shared/types';

const { get } = httpServices();

type useFetchUsersProps = {
    userRole?: 'customer' | 'employee';
    status?: 'active' | 'inactive';
};

export default function useFetchUsers({ userRole, status }: useFetchUsersProps) {
    const [filter, setFilter] = useState('');

    const handleChangeFilter = useCallback((data: string) => {
        setFilter(data);
    }, []);

    const selectFn = useCallback((data: UserResponseDetails, filter: string) => {
        if (filter) {
            const filteredData = data.items.filter((users) =>
                users.email.toLowerCase().includes(filter.toLowerCase())
            );
            return { total: filteredData.length, items: filteredData };
        }
        return data;
    }, []);

    const queryKey = [queryKeys.users];
    const params: { userRole?: string; status?: string } = {};
    if (status) {
        queryKey.push(status);
        params.status = status;
    }
    if (userRole) {
        queryKey.push(userRole);
        params.userRole = userRole;
    }

    const { data, error, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: () => get<UserResponseDetails>(urlKeys.getUsers, params),
        select: (data) => selectFn(data, filter),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    return { data, error, isLoading, refetch, filter, handleChangeFilter };
}

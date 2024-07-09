import { useQuery } from '@tanstack/react-query';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { UserResponseDetails } from '@/shared/types';

const { get } = httpServices();

type useFetchUsersProps = {
    userRole?: 'customer' | 'employee';
    status?: 'active' | 'inactive';
};

export default function useFetchUsers({ userRole, status }: useFetchUsersProps) {
    const queryKey = [queryKeys.users];
    const params: { userRole?: string; status?: string } = {};
    if (status) {
        queryKey.push(status);
        params.status = status
    }
    if (userRole) {
        queryKey.push(userRole);
        params.userRole = userRole
    }

    const { data, error, isLoading, refetch } = useQuery<UserResponseDetails>({
        queryKey,
        queryFn: () => get<UserResponseDetails>(urlKeys.getUsers, params),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    return { data, error, isLoading, refetch };
}

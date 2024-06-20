import { useQuery } from '@tanstack/react-query';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { UserResponseDetails } from '@/shared/types';


const { get } = httpServices();

type UserRole = 'customer' | 'employee';
type StatusType = 'active' | 'inactive';

export default function useFetchUsers(userRole: UserRole, status: StatusType) {

    const queryKey = [queryKeys.users, queryKeys[status], queryKeys[userRole]];

    const { data, error, isLoading, refetch } = useQuery<UserResponseDetails>({
        queryKey,
        queryFn: () => get<UserResponseDetails>(urlKeys.getUsers, { userRole, status }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10
        
    });

    return { data, error, isLoading, refetch };
}
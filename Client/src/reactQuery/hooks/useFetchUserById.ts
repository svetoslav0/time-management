import { useQuery } from '@tanstack/react-query';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { User } from '@/shared/types';

const { get } = httpServices();

export default function useFetchUserById(id: string) {
    const queryKey = [queryKeys.user, id];
    const generatedUrl = `${urlKeys.getUserById}/${id}`;

    const { data, error, isFetching, refetch } = useQuery<User>({
        queryKey,
        queryFn: () => get<User>(generatedUrl),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
        enabled: !!id,
    });
    return { data, error, isFetching, refetch };
}

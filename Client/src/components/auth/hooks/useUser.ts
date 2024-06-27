import { useQuery } from '@tanstack/react-query';

import { useLoginData } from '../AuthContext';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';
import { User } from '@/shared/types';

export function useUser() {
    const { get } = httpServices();
    const { loginResponseData } = useLoginData();
    const queryKey = [queryKeys.user];

    const { data: currentUser } = useQuery<User | undefined>({
        enabled: !!loginResponseData?._id,
        queryKey,
        queryFn: () => get<User>(urlKeys.getUserById + `/${loginResponseData?._id}`),
        staleTime: Infinity,
    });

    function updateUser(newUser: User): void {
        queryClient.setQueryData(queryKey, newUser);
    }

    function clearUser() {
        queryClient.removeQueries({ queryKey: [queryKeys.user] });
    }

    return { currentUser, updateUser, clearUser };
}

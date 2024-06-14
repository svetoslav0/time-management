import { useQueryClient } from '@tanstack/react-query';

import { User } from '@/shared/types';

type QueryKey = 'user';

function useUser() {
    const queryKey: QueryKey = 'user';
    const queryClient = useQueryClient();

    // Function to get user data directly from the query cache
    const getUserFromCache = () => {
        // return queryClient.getQueryData(['user']);
        return queryClient.getQueryData<User>([queryKey]);
    };

    return { getUserFromCache };
}

export default useUser;

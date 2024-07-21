import httpServices from '@/services/httpServices';
import { User } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { queryClient } from '@/reactQuery/queryClient';
import { queryKeys } from '@/reactQuery/constants';

type UseMutationProps = {
    state: string;
    _id: string;
};

const { patch } = httpServices();

export default function useUserMutate() {
    const { mutate: useStatusChange } = useMutation<User, Error, UseMutationProps>({
        mutationFn: (data) => patch<null, User>(generateUrl(data), null),
        onSuccess: () => {
            toast.success('Succesfuly status changed');
            queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return useStatusChange;
}

function generateUrl({ state, _id }: UseMutationProps) {
    if (state === 'active') {
        return `/users/${_id}/archive`;
    }
    return `/users/${_id}/unarchive`;
}

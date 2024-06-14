import httpServices from '@/services/httpServices';
import { User } from '@/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const queryClient = useQueryClient();

const urlKeys = {
    archive: (id: string) => `/users/${id}/archive`,
    unarchive: (id: string) => `/users/${id}/unarchive`,
};

type UseMutationProps = {
    state: string;
    _id: string;
};

const { put } = httpServices();

export default function useUserMutate() {
    const { mutate: useStatusChange } = useMutation<User, Error, UseMutationProps>({
        mutationFn: (data) => put<null, User>(generateUrl(data), null),
        onSuccess: () => {
            // queryClient.invalidateQueries(['user'])
            toast.success('Succesfuly archived user');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return useStatusChange;
}

function generateUrl({ state, _id }: UseMutationProps) {
    if (state === 'Active') {
        return `/users/${_id}/archive`;
    }
    return `/users/${_id}/unarchive`;
}

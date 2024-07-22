import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { queryClient } from '@/reactQuery/queryClient';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';
import { EditUserDataType, User } from '@/shared/types';

export default function useEditUser() {
    const { patch } = httpServices();
    const { id } = useParams<{ id: string }>();
    const { mutate: editUser, isSuccess } = useMutation<User, Error, EditUserDataType>({
        mutationFn: (data) => patch<EditUserDataType, User>(urlKeys.editUser + `/${id}`, data),
        onSuccess: () => {
            toast.success('User edited');
            queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { editUser, isSuccess };
}

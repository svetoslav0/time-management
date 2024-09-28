import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';
import { CustomerDetails, EmployeeDetails } from '@/shared/types';

export default function useUpdateUser() {
    const { patch } = httpServices();
    const { id } = useParams<{ id: string }>();
    const { mutate: updateUser, isSuccess } = useMutation({
        mutationFn: (data: EmployeeDetails | CustomerDetails) => patch(urlKeys.editUser + `/${id}`, data),
        onSuccess: () => {
            toast.success('User updated');
            queryClient.invalidateQueries({ queryKey: [queryKeys.user, id] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { updateUser, isSuccess };
}

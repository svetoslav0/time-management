import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { queryKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';
import { CustomerDetails, EmployeeDetails, UserStatus } from '@/shared/types';

const { patch } = httpServices();

function generateUrl(status: UserStatus, id: string | undefined) {
    if (status === 'active') {
        return `/users/${id}/archive`;
    }
    return `/users/${id}/unarchive`;
}

export default function useUpdateUserStatus() {
    const { id } = useParams<{ id: string }>();
    const { mutate: updateUserStatus, isSuccess: isUpdateUserStatusSuccess } = useMutation({
        mutationFn: (data: CustomerDetails | EmployeeDetails) =>
            patch(generateUrl(data.status, id), null),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.user, id] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { updateUserStatus, isUpdateUserStatusSuccess };
}

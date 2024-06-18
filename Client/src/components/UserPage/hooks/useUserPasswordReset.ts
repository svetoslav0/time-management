import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';
import { ResetPassword, User } from '@/shared/types';

export default function useUserPasswordReset() {
    const { patch } = httpServices();
    const { id } = useParams<{ id: string }>();
    const { mutate: passwordReset, isSuccess } = useMutation<User, Error, ResetPassword>({
        mutationFn: (data) => patch<ResetPassword, User>(urlKeys.editUser + `/${id}/password_restore`, data),
        onSuccess: () => {
            toast.success('Password changed successfully!');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { passwordReset, isSuccess };
}

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/reactQuery/queryClient';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';
import { CreateUserDataType, User } from '@/shared/types';

export default function useInviteRegister() {
    const { post } = httpServices();
    const navigate = useNavigate();

    const { mutate: createUser, isSuccess } = useMutation<User, Error, CreateUserDataType>({
        mutationFn: (data) => post<CreateUserDataType, User>(urlKeys.inviteRegister, data),
        onSuccess: () => {
            toast.success('User created');
            queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { createUser, isSuccess };
}

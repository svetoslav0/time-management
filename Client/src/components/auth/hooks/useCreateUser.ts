import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';
import { CreateUserDataType, User } from '@/shared/types';

export default function useCreateUser() {
    const { post } = httpServices();
    const navigate = useNavigate();

    const { mutate: createUser, isSuccess } = useMutation<User, Error, CreateUserDataType>({
        mutationFn: (data) => post<CreateUserDataType, User>(urlKeys.createUser, data),
        onSuccess: () => {
            toast.success('User created');
            navigate('/')
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { createUser, isSuccess };
}

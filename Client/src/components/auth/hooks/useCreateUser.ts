import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';
import { CreateUserDataType, User } from '@/shared/types';

export default function useCreateUser() {
    const { post } = httpServices();

    const { mutate: createUser, isSuccess } = useMutation<User, Error, CreateUserDataType>({
        mutationFn: (data) => post<CreateUserDataType, User>(urlKeys.createUser, data),
        onSuccess: () => {
            toast.success('User created');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { createUser, isSuccess };
}

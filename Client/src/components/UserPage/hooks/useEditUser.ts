import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';
import {  EditUserDataType, User } from '@/shared/types';

export default function useEditUser() {
    const { patch } = httpServices();

    const { mutate: editUser, isSuccess } = useMutation<User, Error, EditUserDataType>({
        mutationFn: (data) => patch<EditUserDataType, User>(urlKeys.editUser, data),
        onSuccess: () => {
            toast.success('User created');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { editUser, isSuccess };
}

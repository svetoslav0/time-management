import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';
import { LoginFormDataType, User } from '@/shared/types';

export default function useLogin() {
    const { post } = httpServices();
    const navigate = useNavigate();

    const { mutate } = useMutation<User, Error, LoginFormDataType>({
        mutationFn: (data) => post<LoginFormDataType, User>(urlKeys.login, data),
        onSuccess: (response) => {
            localStorage.setItem('userData', JSON.stringify(response));
            navigate('/');
        },
        onError: (error) => toast.error(error.message),
    });

    return mutate;
}

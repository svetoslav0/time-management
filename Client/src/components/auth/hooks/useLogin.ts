import { useMutation } from '@tanstack/react-query';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';
import { LoginFormDataType, User } from '@/shared/types';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
    const { post } = httpServices();
    const navigate = useNavigate()

    const { mutate } = useMutation<User, Error, LoginFormDataType>({
        mutationFn: (data) => post<LoginFormDataType, User>(urlKeys.login, data),
        onSuccess: (response) => {
            localStorage.setItem('userData', JSON.stringify(response));
            navigate('/')
        },
    });

    return mutate;
}

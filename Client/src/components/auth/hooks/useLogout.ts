import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useLoginData } from '../AuthContext';
import { useUser } from './useUser';

import { urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';

type SignOut = () => void;

export default function useLogout(): SignOut {
    const { post } = httpServices();
    const navigate = useNavigate();
    const { clearUser } = useUser();
    const { clearLoginData } = useLoginData();

    const { mutate: logout } = useMutation({
        mutationFn: async () => post(urlKeys.logout),
        onSuccess: () => {
            queryClient.clear();
            clearUser();
            clearLoginData();
            navigate('/auth/login');
        },
        onError: (error) => {
            console.error('Logout failed', error.message);
        },
    });
    return logout;
}

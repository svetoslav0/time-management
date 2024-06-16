import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { clearUserData } from '@/util/util';

export default function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout } = useMutation({
        mutationFn: async () => {},
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['user'] });
            clearUserData();
            navigate('/auth/login');
        },
        onError: (error) => {
            console.error('Logout failed', error);
        },
    });

    return logout;
}

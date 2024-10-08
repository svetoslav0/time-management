import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';

export default function useChangeNames() {
    const { patch } = httpServices();

    const {
        mutate: changeUserNames,
        isSuccess: isChangeUserNamesSuccessfully,
        isError: isChangeUserNamesError,
        isPending: isChangeUserNamesPending,
    } = useMutation({
        mutationFn: (data: { firstName: string; lastName: string; id: string }) =>
            patch(`${urlKeys.editUser}/${data.id}`, data),
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return {
        changeUserNames,
        isChangeUserNamesSuccessfully,
        isChangeUserNamesError,
        isChangeUserNamesPending,
    };
}

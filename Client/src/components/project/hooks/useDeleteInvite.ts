import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';
import { InvitesProjectData } from '@/shared/types';

export default function useDeleteInvite() {
    const { delete: deleteInvite } = httpServices();

    const {
        mutate: deleteInviteUser,
        isSuccess: isInviteSuccess,
        error,
    } = useMutation({
        mutationFn: (data: InvitesProjectData) => deleteInvite(`${urlKeys.invites}/${data._id}`),
        onSuccess: () => toast.success('Email was sent successfully!'),
        onError: (error) => toast.error(error.message),
    });

    return { deleteInviteUser, isInviteSuccess, error };
}

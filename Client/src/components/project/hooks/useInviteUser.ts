import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';

type InviteDataType = {
    projectId: string;
    inviteEmail: string;
};

export default function useInviteUser() {
    const { post } = httpServices();

    const {
        mutate: inviteUser,
        isSuccess: isInviteSuccess,
        error,
    } = useMutation({
        mutationFn: (data: InviteDataType) =>
            post(urlKeys.invites, { projectId: data.projectId, inviteEmail: data.inviteEmail }),
        onSuccess: () => toast.success('Email was sent successfully!'),
        onError: (error) => toast.error(error.message),
    });

    return { inviteUser, isInviteSuccess, error };
}

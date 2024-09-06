import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';

type InviteDataType = {
    projectId: string;
    inviteEmail: string;
};

type UseInviteUserProps = {
    projectId: string;
};

export default function useInviteUser({ projectId }: UseInviteUserProps) {
    const { post } = httpServices();

    const {
        mutate: inviteUser,
        isSuccess: isInviteSuccess,
        error,
    } = useMutation({
        mutationFn: (data: InviteDataType) =>
            post(urlKeys.invites, { projectId: data.projectId, inviteEmail: data.inviteEmail }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.projects, projectId],
            });
            toast.success('Email was sent successfully!');
        },
        onError: (error) => toast.error(error.message),
    });

    return { inviteUser, isInviteSuccess, error };
}

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';
import { ProjectDataType } from '@/shared/types';

export default function useUpdateProject(id: string | undefined) {
    const { patch } = httpServices();
    const { mutate: updateProject, isError } = useMutation({
        mutationFn: (data: ProjectDataType) => patch(urlKeys.completeProject + id, data),
        onSettled: (data) => {
            if (data) {
                queryClient.invalidateQueries({
                    queryKey: [queryKeys.projects, id],
                });
            }
        },
        onSuccess: () => {
            toast.success('Project Updated');
            queryClient.invalidateQueries({
                queryKey: [queryKeys.projects, id],
            });
        },
        onError: (error) => {
            toast.error(error.message);
            queryClient.invalidateQueries({
                queryKey: [queryKeys.projects, id],
            });
        },
    });

    return { updateProject, isError };
}

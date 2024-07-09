import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';
import { ProjectDataType, ProjectResponseDataType } from '@/shared/types';

export default function useProjectCreate() {
    const { post } = httpServices();
    const navigate = useNavigate();

    const { mutate: createProject, isSuccess } = useMutation({
        mutationFn: (data: ProjectDataType) =>
            post<ProjectDataType, ProjectResponseDataType>(urlKeys.createProject, data),
        onSuccess: (data) => {
            toast.success(`${data.projectName} created successfully`);
            queryClient.invalidateQueries({
                queryKey: [queryKeys.projects],
            });
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { createProject, isSuccess };
}

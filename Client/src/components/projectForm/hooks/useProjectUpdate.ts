import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';
import { ProjectDataType, ProjectResponseDataType } from '@/shared/types';

// TODO add more invalidateQueries for status

export default function useProjectUpdate(id: string) {
    const { patch } = httpServices();
    const navigate = useNavigate();

    const generateProjectUpdateUrl = () => `${urlKeys.projects}/${id}`;

    const { mutate: updateProject, isSuccess } = useMutation({
        mutationFn: ( data: ProjectDataType) =>
            patch<ProjectDataType, ProjectResponseDataType>(generateProjectUpdateUrl(), data),
        onSuccess: () => {
            toast.success('Project created');
            queryClient.invalidateQueries({ queryKey: [queryKeys.projects, id] });
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        },
        
    });

    return { updateProject, isSuccess };
}

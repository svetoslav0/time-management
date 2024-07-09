import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';
import { Project, ProjectResponseDataType } from '@/shared/types';

export default function useCompleteProject(id: string | undefined) {
    const { patch } = httpServices();
    const navigate = useNavigate();
    const { mutate: completeProject } = useMutation<Project, Error, ProjectResponseDataType>({
        mutationFn: (data) =>
            patch<ProjectResponseDataType, Project>(urlKeys.completeProject + id, data),
        onSuccess: () => {
            toast.success('Project Complete');
            navigate(`/admin/projects`);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { completeProject };
}

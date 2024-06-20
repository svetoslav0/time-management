import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ProjectFormDataType } from '../ProjectFormControl';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';

export default function useProjectCreate() {
    const { post } = httpServices();
    const navigate = useNavigate();

    const { mutate: createProject, isSuccess } = useMutation({
        mutationFn: (data: ProjectFormDataType) =>
            post<ProjectFormDataType, ProjectFormDataType>(urlKeys.createProject, data),
        onSuccess: () => {
            toast.success('Project created');
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { createProject, isSuccess };
}

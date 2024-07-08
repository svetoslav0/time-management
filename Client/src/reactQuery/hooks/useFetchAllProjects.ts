import { useQuery } from '@tanstack/react-query';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { ProjectResponseDataType, ProjectStatusType } from '@/shared/types';

const { get } = httpServices();

export default function useFetchAllProjects(status?: ProjectStatusType) {
    const queryKey = [queryKeys.projects];
    const generatedUrl = urlKeys.projects;

    if (status) {
        queryKey.push(status);
    }

    const { data, error, isLoading, refetch } = useQuery<ProjectResponseDataType[]>({
        queryKey,
        queryFn: () => get<ProjectResponseDataType[]>(generatedUrl, status && { status }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
    });
    return { data, error, isLoading, refetch };
}

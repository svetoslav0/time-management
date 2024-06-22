import { useQuery } from '@tanstack/react-query';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { ProjectDataType } from '@/shared/types';

const { get } = httpServices();

export default function useFetchProjectById(id: string) {
    const queryKey = [queryKeys.projects, id];
    const generatedUrl = `${urlKeys.projects}/${id}`;

    const { data, error, isLoading, refetch } = useQuery<ProjectDataType>({
        queryKey,
        queryFn: () => get<ProjectDataType>(generatedUrl),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
    });

    return { data, error, isLoading, refetch };
}

import { useQuery } from '@tanstack/react-query';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { ProjectResponseDataType } from '@/shared/types';

const { get } = httpServices();

export default function useFetchProjectById(id: string | undefined) {
    const queryKey = [queryKeys.projects, id];
    const generatedUrl = `${urlKeys.projects}/${id}`;

    const { data, error, isLoading, isFetching, refetch } = useQuery<ProjectResponseDataType>({
        queryKey,
        queryFn: () => get<ProjectResponseDataType>(generatedUrl),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
        enabled: !!id,
    });
    return { data, error, isLoading, isFetching, refetch };
}

import { useQuery } from '@tanstack/react-query';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { ProjectReport } from '@/shared/types';


const { get } = httpServices();

export default function useFetchProjectByIdReport(id: string) {
    const queryKey = [queryKeys.projects, id];
    const generatedUrl = `${urlKeys.projects}/${id}/report`;

    const { data, error, isLoading, isFetching, refetch } = useQuery<ProjectReport>({
        queryKey,
        queryFn: () => get<ProjectReport>(generatedUrl),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
        enabled: !!id,
    });
    return { data, error, isLoading, isFetching, refetch };
}
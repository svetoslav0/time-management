import { useQuery } from '@tanstack/react-query';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { GeneratedReportsType } from '@/shared/types';

const { get } = httpServices();

export default function useFetchGeneratedReports(id: string | undefined) {
    const queryKey = [queryKeys.reports, queryKeys.all, id];
    const generatedUrl = `${urlKeys.report}?projectId=${id}`;

    const {
        data: generatedReports,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey,
        queryFn: () => get<GeneratedReportsType>(generatedUrl),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
        enabled: !!id,
    });
    return { generatedReports, error, isLoading, isFetching, refetch };
}

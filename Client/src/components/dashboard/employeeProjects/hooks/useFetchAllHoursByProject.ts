import { useQuery } from '@tanstack/react-query';

import { HoursResponseData } from '../types';

import { useLoginData } from '@/components/auth/AuthContext';
import { queryKeys, urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';

const { get } = httpServices();

export default function useFetchAllHoursByProject({ projectId }: { projectId: string }) {
    // TODO loginResponseData and userId is temporary
    const { loginResponseData } = useLoginData();
    const id = loginResponseData?._id || '';

    const queryKey = [queryKeys.hours, `ProjectId-${projectId}`];

    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: () =>
            get<HoursResponseData[] | undefined>(urlKeys.hours, { projectId, userId: id }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        enabled: !!id,
    });
    return { data, error, isLoading };
}

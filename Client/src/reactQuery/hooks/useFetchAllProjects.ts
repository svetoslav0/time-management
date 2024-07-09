import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { ProjectResponseDataType, ProjectStatusType } from '@/shared/types';

const { get } = httpServices();

export default function useFetchAllProjects(status?: ProjectStatusType) {
    const [filter, setFilter] = useState('');

    const handleChangeFilter = useCallback((data: string) => {
        setFilter(data);
    }, []);

    const selectFn = useCallback((data: ProjectResponseDataType[], filter: string) => {
        if (filter) {
            return data.filter((project) =>
                project.projectName.toLowerCase().includes(filter.toLowerCase())
            );
        }
        return data;
    }, []);

    const queryKey = [queryKeys.projects];
    const generatedUrl = urlKeys.projects;

    if (status) {
        queryKey.push(status);
    }

    const { data, error, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: () => get<ProjectResponseDataType[]>(generatedUrl, status && { status }),
        select: (data) => selectFn(data, filter),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
    });
    return { data, error, isLoading, refetch, filter, handleChangeFilter };
}

import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';
import { ProjectResponseDataType } from '@/shared/types';

const { get } = httpServices();

export default function useFetchAllProjects() {
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
    const generatedUrl = `${urlKeys.projects}`;

    const { data, error, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: () => get<ProjectResponseDataType[]>(generatedUrl),
        select: (data) => selectFn(data, filter),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
    });
    return { data, error, isLoading, refetch, filter, handleChangeFilter };
}

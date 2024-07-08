import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {  HoursData, HoursResponseData } from '../types';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';

export default function useAddHours() {
    const { post } = httpServices();

    const { mutate: addHours, isSuccess: isAddHoursSuccess, error } = useMutation({
        mutationKey: ['add-hours'],
        mutationFn: (data: HoursData) => post<HoursData, HoursResponseData>(urlKeys.hours, data),
        onSettled: (data) => {
            if (data) {
                queryClient.invalidateQueries({
                    queryKey: [queryKeys.hours, `ProjectId-${data.projectId}`],
                });
            }
        },
        onError: (error) => toast.error(error.message),
    });

    return { addHours, isAddHoursSuccess, error };
}

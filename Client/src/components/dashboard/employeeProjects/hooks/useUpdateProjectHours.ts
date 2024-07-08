import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { HoursResponseData, UpdateHoursData } from '../types';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';



export default function useUpdateProjectHours() {
    const { patch } = httpServices();

    const generateUrl = (id: string) => `${urlKeys.hours}/${id}`;

    const { mutate: updateHours, isSuccess, } = useMutation({
        mutationKey: ['update-hours'],
        mutationFn: (data: UpdateHoursData) =>
            patch<UpdateHoursData, HoursResponseData>(generateUrl(data._id), data),
        onSettled: (data) => {
            if (data) {
                queryClient.invalidateQueries({
                    queryKey: [queryKeys.hours, `ProjectId-${data.projectId}`],
                });
            }
        },
        onError: (error) => toast.error(error.message),
    });

    return { updateHours, isSuccess };
}

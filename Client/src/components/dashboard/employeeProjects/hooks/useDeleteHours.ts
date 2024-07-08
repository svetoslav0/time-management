import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { HoursResponseData } from '../types';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';


export default function useDeleteHours() {
    const { delete: deleteHour } = httpServices();

    const { mutate: deletedHour, isSuccess: isSuccessfullyDeleted } = useMutation({
        mutationFn: (data: HoursResponseData) => deleteHour<HoursResponseData>( `${urlKeys.hours}/${data._id}`),
        onSettled: (data) => {
            if (data) {
                queryClient.invalidateQueries({
                    queryKey: [queryKeys.hours, `ProjectId-${data.projectId}`],
                });
            }
        },
        onError: (error) => toast.error(error.message),
    });

    return { deletedHour , isSuccessfullyDeleted};
}

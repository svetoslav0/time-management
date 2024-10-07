import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';

export default function useDeleteReport() {
    const { delete: deleteReport } = httpServices();
    const { id } = useParams<{ id: string }>();
    const {
        mutate: deleteReportById,
        isSuccess: isSuccessfullyDeleted,
        isPending: isDeletePending,
    } = useMutation({
        mutationFn: (data: { id: string }) => deleteReport(`${urlKeys.report}/${data.id}`),
        onSuccess: () => {
            toast.success('Report deleted successfully');
            queryClient.invalidateQueries({
                queryKey: [queryKeys.reports, queryKeys.all, id],
            });
        },
        onError: (error) => toast.error(error.message),
    });

    return { deleteReportById, isSuccessfullyDeleted, isDeletePending };
}

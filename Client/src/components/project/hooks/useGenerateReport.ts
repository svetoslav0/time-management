import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { queryKeys, urlKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import httpServices from '@/services/httpServices';

export default function useGenerateReport() {
    const { post } = httpServices();
    const { id } = useParams<{ id: string }>();
    const {
        mutate: generateReport,
        isSuccess: isGenerateSuccess,
        isPending: isGeneratePending,
        error,
    } = useMutation({
        mutationFn: (data: {
            name: string;
            startDate: string;
            endDate: string;
            projectId: string;
        }) => post(urlKeys.report, data),
        onSuccess: () => {
            toast.success('Report was create successfully!');
            queryClient.invalidateQueries({
                queryKey: [queryKeys.reports, queryKeys.all, id],
            });
        },
        onError: (error) =>
            toast.error(error.message, {
                style: {
                    maxWidth: 600,
                },
            }),
    });
    return { generateReport, isGenerateSuccess, error, isGeneratePending };
}

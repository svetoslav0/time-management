import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { urlKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';

export default function useGenerateReport() {
    const { post } = httpServices();

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

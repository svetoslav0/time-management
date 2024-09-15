import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/reactQuery/constants';
import httpServices from '@/services/httpServices';

const { get } = httpServices();

export default function useGetReport(id: string | undefined) {
    const queryKey = [queryKeys.pdf, id];
    const generatedUrl = `/projects/${id}/report/pdf`;

    const { data: report } = useQuery<Blob>({
        queryKey,
        queryFn: () => get<Blob>(generatedUrl, undefined, 'blob'),
        retry: 0,
        enabled: !!id,
    });
    return { report };
}

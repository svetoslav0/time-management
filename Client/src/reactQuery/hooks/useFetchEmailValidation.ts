import { useQuery } from '@tanstack/react-query';

import { queryKeys, urlKeys } from '../constants';

import httpServices from '@/services/httpServices';

type EmailValidationResponse = {
    _id: string;
    email: string;
    uuid: string;
    expiresOn: string;
    projectId: string;
};

export default function useFetchEmailValidation(id: string | undefined) {
    const { get } = httpServices();
    const generatedUrl = `${urlKeys.emailValidation}/${id}`;

    const { data, error, isLoading } = useQuery<EmailValidationResponse>({
        queryKey: [queryKeys.isValidEmail, id],
        queryFn: () => get<EmailValidationResponse>(generatedUrl),
        enabled: !!id,
        retry: 1,
    });

    return { data, error, isLoading };
}

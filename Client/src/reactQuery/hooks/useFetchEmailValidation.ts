import { useQuery } from '@tanstack/react-query';
import { queryKeys, urlKeys } from '../constants';
import httpServices from '@/services/httpServices';

type EmailValidationResponse = {
    isValid: boolean;
};

export default function useFetchEmailValidation(id: string) {
    const { get } = httpServices();
    const generatedUrl = `${urlKeys.emailValidation}/${id}`;

    const { data, error, isLoading } = useQuery<EmailValidationResponse>({
        queryKey: [queryKeys.isValidEmail, id],
        queryFn: () => get<EmailValidationResponse>(generatedUrl),
    });

    return { data, error, isLoading };
}

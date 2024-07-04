import { FieldErrors } from 'react-hook-form';

export default function LoginError(
    errors: FieldErrors<{
        email: string;
        password: string;
    }>
) {
    if (errors.email && errors.password) {
        return (
            <p className='mt-4 self-start text-sm text-red-500 dark:text-red-400'>
                Email or password required!
            </p>
        );
    }
    if (errors.email) {
        return (
            <p className='mt-4 self-start text-sm text-red-500 dark:text-red-400'>
                {errors.email.message}
            </p>
        );
    }
    if (errors.password) {
        return (
            <p className='mt-4 self-start text-sm text-red-500 dark:text-red-400'>
                {errors.password.message}
            </p>
        );
    }
    return null;
}

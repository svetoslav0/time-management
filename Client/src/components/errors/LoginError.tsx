import { FieldErrors } from 'react-hook-form';

interface LoginErrorProps {
    errors: FieldErrors<{
        email: string;
        password: string;
    }>;
    loginResponseErr: Error | null;
}

export default function LoginError({ errors, loginResponseErr }: LoginErrorProps) {
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
    if (loginResponseErr) {
        return (
            <p className='mt-4 self-start text-sm text-red-500 dark:text-red-400'>
                {loginResponseErr.message}
            </p>
        );
    }
    return null;
}

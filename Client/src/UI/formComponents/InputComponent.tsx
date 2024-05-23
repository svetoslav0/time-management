import { ComponentPropsWithoutRef } from 'react';
import { FieldValues, Path, UseFormRegister, UseFormTrigger } from 'react-hook-form';

import { capitalizeAndFormat } from '../../shared/utils';

type InputComponentProps<T extends FieldValues> = {
    error:string | undefined;
    register: UseFormRegister<T>;
    trigger: UseFormTrigger<T>;
    field: Path<T>;
    type?: string;
} & ComponentPropsWithoutRef<'input'>;

export default function InputComponent<T extends FieldValues>({
    error,
    register,
    trigger,
    field,
    type = 'text',
    ...props
}: InputComponentProps<T>) {
    return (
        <div className='mb-5'>
            <label
                htmlFor={field}
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            />

            <input
                type={type}
                id={field}
                className={`block w-full rounded-lg border ${
                    error ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                placeholder={capitalizeAndFormat(field)}
                {...register(field)}
                onBlur={() => trigger(field)}
                {...props}
            />
            {error && (
                <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                    {error}
                </span>
            )}
        </div>
    );
}

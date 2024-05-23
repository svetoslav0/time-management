import { FieldErrors, FieldValues, Path, UseFormRegister, UseFormTrigger } from 'react-hook-form';

import { capitalizeAndFormat } from '../../shared/utils';

interface InputComponentProps<T extends FieldValues> {
    errors: FieldErrors<T>;
    register: UseFormRegister<T>;
    trigger: UseFormTrigger<T>;
}

export default function InputComponent<T extends FieldValues>({
    errors,
    register,
    trigger,
    field,
}: InputComponentProps<T> & { field: keyof T }) {
    return (
        <div className='mb-5'>
            <label
                htmlFor={field as string}
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            />

            <input
                type='text'
                id={field as string}
                className={`block w-full rounded-lg border ${
                    errors[field] ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                placeholder={capitalizeAndFormat(field as string)}
                {...register(field as Path<T>)}
                onBlur={() => trigger(field as Path<T>)}
            />
            {errors[field] && (
                <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                    {errors[field]?.message as string}
                </span>
            )}
        </div>
    );
}

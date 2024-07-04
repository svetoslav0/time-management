import { ComponentPropsWithoutRef } from 'react';
import { FieldValues, Path, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { CiLock, CiMail } from 'react-icons/ci';

import { capitalizeAndFormat } from '../../shared/utils';

type InputComponentProps<T extends FieldValues> = {
    error: string | undefined;
    responseError?: string | null;
    register: UseFormRegister<T>;
    trigger: UseFormTrigger<T>;
    field: Path<T>;
    type?: string;
    password?: boolean;
    toggleVisibility?: () => void;
    isVisible?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export default function InputComponent<T extends FieldValues>({
    error,
    responseError,
    register,
    trigger,
    field,
    type = 'text',
    password,
    toggleVisibility,
    isVisible,
    ...props
}: InputComponentProps<T>) {
    return (
        <div className='mt-5'>
            <label
                htmlFor={field}
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            />
            <div className='relative'>
                <input
                    type={type}
                    id={field}
                    className={`block w-full rounded-xl border border-inputFieldBorderColor ${
                        error || responseError ? 'border-red-500' : 'border-gray-300'
                    } ${password || field === 'email' ? 'pl-10' : ''} bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                    placeholder={capitalizeAndFormat(field)}
                    {...register(field)}
                    onBlur={() => trigger(field)}
                    {...props}
                />
                {password && (
                    <span
                        onClick={toggleVisibility}
                        className='absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-gray-400'
                    >
                        {isVisible ? (
                            <AiFillEye className='h-6 w-6' />
                        ) : (
                            <AiOutlineEyeInvisible className='h-6 w-6' />
                        )}
                    </span>
                )}
                {field === 'email' && (
                    <span>
                        <CiMail className='absolute left-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor' />
                    </span>
                )}
                {password && (
                    <span>
                        <CiLock className='absolute left-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor' />
                    </span>
                )}
            </div>
            {/* {error && (
                <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                    {error}
                </span>
            )} */}
        </div>
    );
}

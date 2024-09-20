import { ComponentPropsWithoutRef } from 'react';
import { FieldValues, Path, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { CiLock, CiMail } from 'react-icons/ci';

import { capitalizeAndFormat } from '../../shared/utils';

type InputComponentProps<T extends FieldValues> = {
    error: string | undefined;
    isResponseError?: boolean;
    register: UseFormRegister<T>;
    trigger: UseFormTrigger<T>;
    field: Path<T>;
    type?: string;
    password?: boolean;
    ref?: string;
    toggleVisibility?: () => void;
    isVisible?: boolean;
    shouldShowIcons?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export default function InputComponent<T extends FieldValues>({
    error,
    isResponseError,
    register,
    trigger,
    field,
    type = 'text',
    password,
    toggleVisibility,
    isVisible,
    shouldShowIcons,
    ...props
}: InputComponentProps<T>) {
    return (
        <div className='mt-3 w-full'>
            <label
                htmlFor={field}
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            />
            <div className='relative'>
                <input
                    type={type}
                    id={field}
                    className={`block w-full ${field === 'description' ? 'mb-5 h-20 placeholder-custom' : ''} rounded-xl border border-customBlue  ${
                        error || isResponseError ? 'border-customRed' : 'border-customBlue'
                    } ${(password || field === 'email') && shouldShowIcons === true ? 'pl-10' : ''}  p-2.5 text-sm text-customDarkBlue focus:border-customBlue focus:ring-customBlue outline-none`}
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
                {field === 'email' && shouldShowIcons === true && (
                    <span>
                        <CiMail className='absolute left-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor' />
                    </span>
                )}
                {password && shouldShowIcons === true && (
                    <span>
                        <CiLock className='absolute left-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor' />
                    </span>
                )}
            </div>
        </div>
    );
}

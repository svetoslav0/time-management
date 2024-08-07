import { ComponentPropsWithoutRef, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import cn from '../../util/cn';

type UserSelectorProps = {
    inviteEmails: string[];
    setInviteEmails: React.Dispatch<React.SetStateAction<string[]>>;
    error: string | undefined;
    field: string;
} & ComponentPropsWithoutRef<'input'>;

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export default function EmailInvite({
    inviteEmails,
    setInviteEmails,
    error,
    field,
    ...props
}: UserSelectorProps) {
    const [input, setInput] = useState<string>('');

    const { register } = useFormContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleAddEmail = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;

            if (e.code === 'Space' && isValidEmail(target.value.trim())) {
                setInviteEmails((emails) => [...emails, target.value.trim()]);
                setInput('');
            }
        },
        [setInviteEmails, setInput]
    );

    const handleRemoveEmail = (emailToRemove: string) => {
        setInviteEmails(inviteEmails.filter((email) => email !== emailToRemove));
    };

    return (
        <div className='place-items-center'>
            <div
                className={cn(
                    error ? 'border-red-500 dark:border-red-500' : '',
                    'relative w-full rounded-md border-2 border-gray-300 bg-gray-50 text-sm dark:border-gray-600 dark:bg-gray-700'
                )}
            >
                <input value={inviteEmails} id={field} {...register(field)} className='hidden' />
                {inviteEmails.length ? (
                    <div className='relative flex w-full flex-wrap gap-2 rounded-md  p-2.5'>
                        {inviteEmails.map((email) => {
                            return (
                                <div
                                    key={email}
                                    className='flex w-fit items-center gap-2  rounded-lg border-gray-400 bg-gray-200 px-3  text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                                >
                                    <span>{email}</span>
                                    <div
                                        className='cursor-pointer text-red-500'
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleRemoveEmail(email)}
                                    >
                                        X
                                    </div>
                                </div>
                            );
                        })}
                        <div className='flex-grow text-right'>
                            <span
                                className='cursor-pointer text-gray-400'
                                onClick={() => setInviteEmails([])}
                            >
                                Clear all
                            </span>
                        </div>
                    </div>
                ) : null}
                <div className='flex w-full items-center justify-between gap-2.5 p-2.5'>
                    <input
                        className='flex-1 bg-transparent text-sm outline-none dark:text-gray-50'
                        {...props}
                        type='text'
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleAddEmail}
                    />
                </div>
            </div>
            {error && (
                <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                    {error}
                </span>
            )}
        </div>
    );
}

import { ComponentPropsWithoutRef, useCallback, useEffect, useState } from 'react';
import { UseFormClearErrors, useFormContext, UseFormSetError } from 'react-hook-form';

import cn from '../../util/cn';
import { ProjectFormDataType } from './types';

type UserSelectorProps = {
    inviteEmails: string[];
    setInviteEmails: React.Dispatch<React.SetStateAction<string[]>>;
    error: string | undefined;
    field: string;
    selectedError: string[];
    setError: UseFormSetError<ProjectFormDataType>;
    clearErrors: UseFormClearErrors<ProjectFormDataType>;
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
    selectedError,
    setError,
    clearErrors,
    ...props
}: UserSelectorProps) {
    const [input, setInput] = useState<string>('');
    const [isInputFocused, setIsInputFocused] = useState(false);

    const { register } = useFormContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleAddEmail = useCallback(
        (email: string) => {
            if (isValidEmail(email.trim())) {
                setInviteEmails((emails) => [...emails, email.trim()]);
                setInput('');
            }
        },
        [setInviteEmails, setInput]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (e.code === 'Space') {
            handleAddEmail(target.value);
        }
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setInviteEmails(inviteEmails.filter((email) => email !== emailToRemove));
    };

    const handleBlur = () => {
        setIsInputFocused(false);
        if (input && isValidEmail(input.trim())) {
            handleAddEmail(input);
        }
    };

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    useEffect(() => {
        if (selectedError.length === 0 && !isInputFocused) {
            setError('inviteEmails', { message: 'Please add invite email' });
        } else {
            clearErrors('inviteEmails');
        }
    }, [selectedError, isInputFocused, setError, clearErrors]);

    return (
        <div className='place-items-center'>
            <div
                className={cn(
                    error ? 'border-customRed' : 'border-customBlue',
                    'relative w-full rounded-xl border text-sm'
                )}
            >
                <input value={inviteEmails} id={field} {...register(field)} className='hidden' />
                {inviteEmails.length ? (
                    <div className='relative flex w-full flex-wrap gap-2 rounded-md p-2.5'>
                        {inviteEmails.map((email) => {
                            return (
                                <div
                                    key={email}
                                    className='flex w-fit items-center gap-2 px-3 text-customDarkBlue'
                                >
                                    <span>{email}</span>
                                    <div
                                        className='cursor-pointer text-customRed'
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleRemoveEmail(email)}
                                    >
                                        X
                                    </div>
                                </div>
                            );
                        })}
                        <div className='flex-grow text-right'>
                            <span className='cursor-pointer ' onClick={() => setInviteEmails([])}>
                                Clear all
                            </span>
                        </div>
                    </div>
                ) : null}
                <div className='flex w-full items-center justify-between gap-2.5 p-2.5'>
                    <input
                        className='flex-1 bg-transparent text-sm outline-none'
                        {...props}
                        type='text'
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                </div>
            </div>
        </div>
    );
}

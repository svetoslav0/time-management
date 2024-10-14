import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { UseFormClearErrors, useFormContext, UseFormSetError } from 'react-hook-form';

import cn from '../../util/cn';
import { ProjectFormDataType } from './types';

import { UserResponseDetails } from '@/shared/types';

type UserSelectorProps = {
    usersList: UserResponseDetails | undefined;
    selectedUsers: string[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    error: string | undefined;
    field: 'customerIds' | 'employeeIds';
    selectedError: string[];
    setError: UseFormSetError<ProjectFormDataType>;
    clearErrors: UseFormClearErrors<ProjectFormDataType>;
    handleError?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export default function MultiSelector({
    usersList,
    handleError = true,
    selectedUsers,
    setSelectedUsers,
    error,
    field,
    selectedError,
    setError,
    clearErrors,
    ...props
}: UserSelectorProps) {
    const [itemList, setItemList] = useState('');
    const [isListOpen, setIsListOpen] = useState(false);
    const [isBlur, setIsBlur] = useState(false);

    const { register } = useFormContext();

    const filteredUsers = usersList?.items.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return (
            fullName.toLowerCase().includes(itemList.toLowerCase().trim()) &&
            !selectedUsers.includes(user._id)
        );
    });

    useEffect(() => {
        if (handleError) {
            if (selectedError.length === 0 && isBlur) {
                setError(field, {
                    type: 'value',
                    message: `Please select ${field === 'customerIds' ? 'Customer' : 'Employee'}`,
                });
            } else {
                clearErrors(field);
            }
        }
    }, [selectedError, isBlur, setError, field, clearErrors, handleError]);

    return (
        <div className='place-items-center'>
            <div
                className={cn(
                    error && handleError ? 'border-customRed' : 'border-customBlue',
                    'relative w-full rounded-xl border text-sm '
                )}
            >
                <input value={selectedUsers} id={field} {...register(field)} className='hidden' />
                {selectedUsers.length ? (
                    <div className='relative flex w-full flex-wrap gap-2 rounded-xl  p-2.5'>
                        {selectedUsers.map((id) => {
                            const user = usersList?.items.find((user) => user._id === id);
                            return (
                                <div
                                    key={id}
                                    className='flex w-fit items-center gap-2  rounded-lg border-gray-400 bg-gray-200 px-3  text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                                >
                                    <span>
                                        {user?.firstName} {user?.lastName}
                                    </span>
                                    <div
                                        className='cursor-pointer text-customRed'
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() =>
                                            setSelectedUsers(
                                                selectedUsers.filter((user) => user !== id)
                                            )
                                        }
                                    >
                                        X
                                    </div>
                                </div>
                            );
                        })}
                        <div className='flex-grow text-right'>
                            <span
                                className='cursor-pointer text-gray-400'
                                onClick={() => {
                                    setSelectedUsers([]);
                                }}
                            >
                                Clear all
                            </span>
                        </div>
                    </div>
                ) : null}
                <div className='flex w-full items-center  justify-between gap-2.5 p-2.5'>
                    <input
                        type='text'
                        value={itemList}
                        onChange={(e) => setItemList(e.target.value.trimStart())}
                        className='flex-1 bg-transparent text-sm outline-none'
                        onFocus={() => setIsListOpen(true)}
                        onBlur={() => {
                            setIsListOpen(false);
                            setIsBlur(true);
                        }}
                        {...props}
                    />
                </div>
                {isListOpen && (
                    <div className='absolute z-10 mt-2 flex max-h-52 w-full overflow-y-auto  p-1 scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200'>
                        <ul className='w-full'>
                            {filteredUsers && filteredUsers.length ? (
                                filteredUsers.map((user) => (
                                    <li
                                        key={user._id}
                                        className='w-full cursor-pointer rounded-md bg-white p-2 hover:bg-customVeryLightBlue'
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            setIsListOpen(true);
                                            setSelectedUsers((prevUsers) => [
                                                ...prevUsers,
                                                user._id,
                                            ]);
                                        }}
                                    >
                                        {user.firstName} {user.lastName} (
                                        {'companyName' in user ? user.companyName : user.email})
                                    </li>
                                ))
                            ) : (
                                <li className='p-2 '>No employee</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

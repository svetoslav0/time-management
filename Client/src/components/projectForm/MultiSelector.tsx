import { ComponentPropsWithoutRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import cn from '../../util/cn';

import { UserResponseDetails } from '@/shared/types';

type UserSelectorProps = {
    usersList: UserResponseDetails | undefined;
    selectedUsers: string[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    error: string | undefined;
    field: string;
} & ComponentPropsWithoutRef<'input'>;

export default function MultiSelector({
    usersList,
    selectedUsers,
    setSelectedUsers,
    error,
    field,
    ...props
}: UserSelectorProps) {
    const [itemList, setItemList] = useState('');
    const [isListOpen, setIsListOpen] = useState(false);

    const { register } = useFormContext();

    const filteredUsers = usersList?.items.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return (
            fullName.toLowerCase().includes(itemList.toLowerCase().trim()) &&
            !selectedUsers.includes(user._id)
        );
    });

    return (
        <div className='place-items-center'>
            <div
                className={cn(
                    error ? 'border-red-500 dark:border-red-500' : '',
                    'relative w-full rounded-md border-2 border-gray-300 bg-gray-50 text-sm dark:border-gray-600 dark:bg-gray-700'
                )}
            >
                <input value={selectedUsers} id={field} {...register(field)} className='hidden' />
                {selectedUsers.length ? (
                    <div className='relative flex w-full flex-wrap gap-2 rounded-md  p-2.5'>
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
                                        className='cursor-pointer text-red-500'
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
                                onClick={() => setSelectedUsers([])}
                            >
                                Clear all
                            </span>
                        </div>
                    </div>
                ) : null}
                <div className='flex w-full items-center justify-between gap-2.5 p-2.5'>
                    <input
                        type='text'
                        value={itemList}
                        onChange={(e) => setItemList(e.target.value.trimStart())}
                        className='flex-1 bg-transparent text-sm outline-none dark:text-gray-50'
                        onFocus={() => setIsListOpen(true)}
                        onBlur={() => setIsListOpen(false)}
                        {...props}
                    />
                </div>
                {isListOpen && (
                    <div className='absolute z-10 mt-2 flex max-h-52 w-full overflow-y-auto bg-gray-50 p-1 scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 dark:bg-gray-600 dark:text-gray-50 dark:scrollbar-track-slate-600 dark:scrollbar-thumb-slate-800'>
                        <ul className='w-full'>
                            {filteredUsers && filteredUsers.length ? (
                                filteredUsers.map((user) => (
                                    <li
                                        key={user._id}
                                        className='w-full cursor-pointer rounded-md p-2 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-gray-700'
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
                                        {'companyName' in user ? user.companyName : user.email}))
                                    </li>
                                ))
                            ) : (
                                <li className='p-2 '>No employee</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            {error && (
                <span role='alert' className='text-sm text-red-500 dark:text-red-400'>
                    {error}
                </span>
            )}
        </div>
    );
}

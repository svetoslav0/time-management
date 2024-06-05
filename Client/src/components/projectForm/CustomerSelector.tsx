import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CustomerProps } from './types';

type CustomerSelectorProps = {
    customers: CustomerProps[];
    selectedCustomer: string;
    setSelectedCustomer: React.Dispatch<React.SetStateAction<string>>;
    error: string | undefined;
};

export default function CustomerSelector({
    customers,
    selectedCustomer,
    setSelectedCustomer,
    error,
}: CustomerSelectorProps) {
    const [customerList, setCustomer] = useState('');
    const [isCListOpen, setIsCListOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { register } = useFormContext();

    const filteredEmployees = customers?.filter((emp) => {
        const fullName = `${emp.firstName} ${emp.lastName}`;
        return (
            fullName.toLowerCase().includes(customerList.toLocaleLowerCase().trim()) &&
            !selectedCustomer.includes(emp.id)
        );
    });

    return (
        <div className='place-items-center'>
            <div className='relative w-full rounded-md border-2 border-gray-300 bg-gray-50 text-sm dark:border-gray-600 dark:bg-gray-700'>
                <input
                    value={selectedCustomer}
                    id='customerId'
                    {...register('customerId')}
                    className='hidden'
                />
                {selectedCustomer ? (
                    <div className='relative flex w-full flex-wrap gap-2 rounded-md  p-2.5'>
                        <div className='flex w-fit items-center gap-2  rounded-lg border-gray-400 bg-gray-200 px-3  text-gray-900 dark:bg-gray-800 dark:text-gray-50'>
                            <span>
                                {
                                    customers.find((customer) => customer.id === selectedCustomer)
                                        ?.firstName
                                }{' '}
                                {
                                    customers.find((customer) => customer.id === selectedCustomer)
                                        ?.lastName
                                }{' '}
                                ({' '}
                                {
                                    customers.find((customer) => customer.id === selectedCustomer)
                                        ?.companyName
                                }{' '}
                                )
                            </span>
                            <div
                                className='cursor-pointer text-red-500'
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    setSelectedCustomer('');
                                    setCustomer('');
                                    setTimeout(() => {
                                        inputRef.current?.focus();
                                    }, 0);
                                    setIsCListOpen(true);
                                }}
                            >
                                X
                            </div>
                        </div>
                    </div>
                ) : null}
                {!selectedCustomer && (
                    <div className='flex w-full items-center justify-between gap-2.5 p-2.5'>
                        <input
                            type='text'
                            ref={inputRef}
                            value={customerList}
                            onChange={(e) => setCustomer(e.target.value.trimStart())}
                            placeholder='Customer'
                            className='flex-1 bg-transparent text-sm outline-none dark:text-gray-50 '
                            onFocus={() => setIsCListOpen(true)}
                            onBlur={() => setIsCListOpen(false)}
                        />
                    </div>
                )}
                {isCListOpen && (
                    <div
                        className='scrollbar-thin scrollbar-track-slate-50  scrollbar-thumb-slate-200 dark:scrollbar-track-slate-600 dark:scrollbar-thumb-slate-800
                     absolute z-10 mt-2 flex max-h-52 w-full overflow-y-auto bg-gray-50 p-1 dark:bg-gray-600 dark:text-gray-50'
                    >
                        <ul className='w-full'>
                            {filteredEmployees && filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee) => (
                                    <li
                                        key={employee.id}
                                        className='w-full cursor-pointer rounded-md p-2 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-gray-700'
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            setIsCListOpen(false);
                                            setSelectedCustomer(employee.id);
                                        }}
                                    >
                                        {employee.firstName} {employee.lastName} (
                                        {employee.companyName})
                                    </li>
                                ))
                            ) : (
                                <li className='p-2 '>No customers</li>
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

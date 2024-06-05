import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { EmployeesProps } from './types';

type EmployeesSelectorProps = {
    employees: EmployeesProps[];
    selectedEmployees: string[];
    setSelectedEmployees: React.Dispatch<React.SetStateAction<string[]>>;
    error: string | undefined;
};

export default function EmployeesSelector({
    employees,
    selectedEmployees,
    setSelectedEmployees,
    error,
}: EmployeesSelectorProps) {
    const [employeesList, setEmployeesList] = useState('');
    const [isEmpListOpen, setIsEmpListOpen] = useState(false);

    const { register } = useFormContext();

    const filteredEmployees = employees.filter((emp) => {
        const fullName = `${emp.firstName} ${emp.lastName}`;
        return (
            fullName.toLowerCase().includes(employeesList.toLocaleLowerCase().trim()) &&
            !selectedEmployees.includes(emp.id)
        );
    });

    return (
        <div className='place-items-center'>
            <div className='relative w-full rounded-md border-2 border-gray-300 bg-gray-50 text-sm dark:border-gray-600 dark:bg-gray-700'>
                <input
                    value={selectedEmployees}
                    id='employeeIds'
                    {...register('employeeIds')}
                    className='hidden'
                />
                {selectedEmployees.length ? (
                    <div className='relative flex w-full flex-wrap gap-2 rounded-md  p-2.5'>
                        {selectedEmployees.map((id) => {
                            const employeeId = employees.find((employee) => employee.id === id);
                            return (
                                <div
                                    key={id}
                                    className='flex w-fit items-center gap-2  rounded-lg border-gray-400 bg-gray-200 px-3  text-gray-900 dark:bg-gray-800
                                     dark:text-gray-50'
                                >
                                    <span>
                                        {employeeId?.firstName} {employeeId?.lastName}
                                    </span>
                                    <div
                                        className='cursor-pointer text-red-500'
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() =>
                                            setSelectedEmployees(
                                                selectedEmployees.filter((e) => e !== id)
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
                                onClick={() => setSelectedEmployees([])}
                            >
                                Clear all
                            </span>
                        </div>
                    </div>
                ) : null}
                <div className='flex w-full items-center justify-between gap-2.5 p-2.5'>
                    <input
                        type='text'
                        value={employeesList}
                        onChange={(e) => setEmployeesList(e.target.value.trimStart())}
                        placeholder='Employees'
                        className='flex-1 bg-transparent text-sm outline-none dark:text-gray-50'
                        onFocus={() => setIsEmpListOpen(true)}
                        onBlur={() => setIsEmpListOpen(false)}
                    />
                </div>
                {isEmpListOpen && (
                    <div
                        className='scrollbar-thin scrollbar-track-slate-50  scrollbar-thumb-slate-200 dark:scrollbar-track-slate-600
                     dark:scrollbar-thumb-slate-800 absolute z-10 mt-2 flex max-h-52 w-full overflow-y-auto bg-gray-50 p-1 dark:bg-gray-600 dark:text-gray-50'
                    >
                        <ul className='w-full'>
                            {filteredEmployees.length ? (
                                filteredEmployees.map((employee) => (
                                    <li
                                        key={employee.id}
                                        className='w-full cursor-pointer rounded-md p-2 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-gray-700'
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            setIsEmpListOpen(true);
                                            setSelectedEmployees((prevEmp) => [
                                                ...prevEmp,
                                                employee.id,
                                            ]);
                                        }}
                                    >
                                        {employee.firstName} {employee.lastName} (
                                        {employee.userName})
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

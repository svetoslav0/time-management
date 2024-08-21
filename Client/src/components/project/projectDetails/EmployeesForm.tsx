import dayjs from 'dayjs';
import { FormEvent, useState } from 'react';

import useUpdateProject from '../hooks/useUpdateProject';

import useFetchUsers from '@/reactQuery/hooks/useFetchUsers';
import { EmployeeIds, ProjectDataType, User } from '@/shared/types';

type EmployeesFormPros = {
    setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
    currentEmployees: EmployeeIds[];
    project: ProjectDataType;
};

export default function EmployeesForm({ setIsAdd, currentEmployees, project }: EmployeesFormPros) {
    const { data: employeeResponse, handleChangeFilter } = useFetchUsers({
        userRole: 'employee',
        status: 'active',
    });

    const { updateProject } = useUpdateProject(project._id);

    const [selectedEmployee, setSelectedEmployee] = useState<null | User>(null);
    const [inputValue, setInputValue] = useState('');

    const [isDropdownActive, setIsDropdownActive] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (selectedEmployee) {
            currentEmployees.push(selectedEmployee);

            project.employeeIds = currentEmployees;
            project.startingDate = project.startingDate = dayjs(project.startingDate).format(
                'YYYY-MM-DD'
            );

            updateProject(project);
            setIsAdd(false);
        }
    }

    function handleDropdown(e: string) {
        if (e.length > 0) {
            setIsDropdownActive(true);
        } else {
            setIsDropdownActive(false);
        }
    }

    function handleSelectEmployee(employee: User) {
        setInputValue(`${employee.firstName} ${employee.lastName}`);
        setSelectedEmployee(employee);
        setIsDropdownActive(false);
    }

    return (
        <div className='relative'>
            <form onSubmit={handleSubmit} className='my-8 ml-6 space-x-4'>
                <input
                    type='text'
                    className='w-44 border-b-[1px] border-customDarkBlue bg-inherit outline-none'
                    onChange={(e) => {
                        handleChangeFilter(e.currentTarget.value);
                        handleDropdown(e.currentTarget.value);
                        setInputValue(e.currentTarget.value);
                    }}
                    value={inputValue}
                />
                <button className='adminProjectBtn bg-customBlue text-white' type='submit'>
                    Save
                </button>
                <button
                    className='adminProjectBtn bg-customDarkBlue text-white'
                    onClick={() => setIsAdd(false)}
                >
                    Cancel
                </button>
            </form>
            {isDropdownActive && (
                <div className='absolute left-6 w-44 rounded border-[1px] border-customDarkBlue bg-white pl-2 text-base text-customDarkBlue'>
                    {employeeResponse && employeeResponse?.total > 0 ? (
                        employeeResponse?.items
                            .filter(
                                (employee) =>
                                    !currentEmployees.some(
                                        (currentEmployee) => currentEmployee._id === employee._id
                                    )
                            )
                            .map((employee) => (
                                <p
                                    className='my-1'
                                    key={employee._id}
                                    onClick={() => handleSelectEmployee(employee)}
                                >
                                    {employee.firstName} {employee.lastName}
                                </p>
                            ))
                    ) : (
                        <p className='text-red-500'>Employee Not Found</p>
                    )}
                </div>
            )}
        </div>
    );
}

import dayjs from 'dayjs';
import { FormEvent, useState } from 'react';

import useUpdateProject from '../hooks/useUpdateProject';

import useFetchUsers from '@/reactQuery/hooks/useFetchUsers';
import { CustomersIds, ProjectDataType, User } from '@/shared/types';

type EmployeesFormPros = {
    setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
    currentEmployees: CustomersIds[];
    project: ProjectDataType;
};

export default function CustomersForm({ setIsAdd, currentEmployees: currentCustomer, project }: EmployeesFormPros) {
    const { data: customersResponse, handleChangeFilter } = useFetchUsers({
        userRole: 'customer',
        status: 'active',
    });

    const { updateProject } = useUpdateProject(project._id);

    const [selectedCustomer, setSelectedCustomer] = useState<null | User>(null);
    const [inputValue, setInputValue] = useState('');

    const [isDropdownActive, setIsDropdownActive] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (selectedCustomer) {
            currentCustomer.push(selectedCustomer);

            project.customerIds = currentCustomer;
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
        setSelectedCustomer(employee);
        setIsDropdownActive(false);
    }

    return (
        <div className='relative'>
            <form onSubmit={handleSubmit} className='ml-6 space-x-4'>
                <input
                    type='text'
                    className='w-44 border-b-[1px] border-customDarkBlue outline-none bg-inherit'
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
                    {customersResponse && customersResponse?.total > 0 ? (
                        customersResponse?.items
                            .filter(
                                (employee) =>
                                    !currentCustomer.some(
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

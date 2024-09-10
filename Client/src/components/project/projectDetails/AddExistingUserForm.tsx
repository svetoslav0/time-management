import dayjs from 'dayjs';
import { FormEvent, useState } from 'react';

import useUpdateProject from '../hooks/useUpdateProject';

import useFetchUsers from '@/reactQuery/hooks/useFetchUsers';
import { ProjectDataType, User, UserData } from '@/shared/types';

type AddExistingUserFormProps = {
    setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
    currentUsers: UserData[];
    project: ProjectDataType;
    userType: 'employeeIds' | 'customerIds';
};

export default function AddExistingUserForm({
    setIsAdd,
    currentUsers,
    project,
    userType,
}: AddExistingUserFormProps) {
    const [selectedCustomer, setSelectedCustomer] = useState<null | User>(null);
    const [inputValue, setInputValue] = useState('');
    const { updateProject } = useUpdateProject(project._id);

    const [isDropdownActive, setIsDropdownActive] = useState(false);

    const { data: customersResponse, handleChangeFilter } = useFetchUsers({
        userRole: userType === 'customerIds' ? 'customer' : 'employee',
        status: 'active',
    });

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

    function handleSubmitNewUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (selectedCustomer) {
            project[userType] = [...project[userType], selectedCustomer];
            project.startingDate = project.startingDate = dayjs(project.startingDate).format(
                'YYYY-MM-DD'
            );

            updateProject(project);
            setIsAdd(false);
        }
    }
    return (
        <div className='relative'>
            <form onSubmit={handleSubmitNewUser} className='ml-6 space-x-4'>
                <input
                    type='text'
                    placeholder='type name or email'
                    className='w-60 rounded-md border-[1px] border-customDarkBlue px-3 py-1.5 text-sm font-semibold text-customDarkBlue placeholder:text-customDarkGray'
                    onChange={(e) => {
                        handleChangeFilter(e.currentTarget.value);
                        handleDropdown(e.currentTarget.value);
                        setInputValue(e.currentTarget.value);
                    }}
                    value={inputValue}
                />
                <button
                    className='adminProjectBtn ml-5 bg-customDarkBlue text-white transition duration-300 ease-out'
                    type='submit'
                >
                    Add {userType === 'customerIds' ? 'customer' : 'employee'}
                </button>
                <button
                    className='adminProjectBtn ml-5 border-[1px] border-customDarkBlue bg-white text-customDarkBlue transition duration-300 ease-out'
                    onClick={() => setIsAdd(false)}
                >
                    Cancel
                </button>
            </form>
            {isDropdownActive && (
                <div className='absolute left-6 z-30 max-h-36 w-44 overflow-auto rounded border-[1px] border-customDarkBlue bg-white pl-2 text-base text-customDarkBlue'>
                    {customersResponse && customersResponse?.total > 0 ? (
                        customersResponse?.items
                            .filter(
                                (employee) =>
                                    !currentUsers.some(
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

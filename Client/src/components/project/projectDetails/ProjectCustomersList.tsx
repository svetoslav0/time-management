import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import useUpdateProject from '../hooks/useUpdateProject';
import CustomersForm from './CustomersForm';
import CustomersInviteForm from './CustomersInviteForm';

import { CustomersIds, EmployeeIds, ProjectResponseDataType } from '@/shared/types';
import EditPenSvg from '@/UI/design/EditPenSvg';
import PlusSvg from '@/UI/design/PlusSvg';
import XSvg from '@/UI/design/XSvg';
import cn from '@/util/cn';

type ProjectCustomersListProps = {
    project: ProjectResponseDataType;
};

export default function ProjectCustomersList({ project }: ProjectCustomersListProps) {
    const [isHover, setIsHover] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isInvite, setIsInvite] = useState(false);

    const [currentCustomers, setCurrentCustomers] = useState<[] | CustomersIds[]>(
        project.customerIds
    );

    const { updateProject, isError } = useUpdateProject(project._id);

    useEffect(() => {
        if (isError) {
            setCurrentCustomers(project.customerIds);
        }
    }, [isError, project]);

    function removeEmployee(employee: EmployeeIds) {
        setCurrentCustomers(
            (prevEmployees) =>
                prevEmployees?.filter((currEmployee) => currEmployee._id !== employee._id) || []
        );
    }

    function handleUpdateEmployees() {
        if (currentCustomers) {
            project.customerIds = currentCustomers;
            project.startingDate = dayjs(project.startingDate).format('YYYY-MM-DD');
            updateProject(project);
            setIsEdit(false);
            setIsAdd(false);
        }
    }

    return (
        <>
            <div
                className='shadow-loginFormShadow rounded-2xl'
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <div className='mt-11 rounded-t-2xl bg-customDarkBlue shadow-loginFormShadow'>
                    <p className='py-2 pl-6 text-base font-bold text-white'>Customers</p>
                </div>
                <div
                    className={cn(
                        isHover || isEdit || isAdd ? 'bg-customVeryLightBlue' : 'bg-while',
                        'relative  min-h-20 flex-row items-center rounded-b-2xl  pr-48 shadow-loginFormShadow transition duration-300 ease-out'
                    )}
                >
                    {currentCustomers && (
                        <div className='py-5'>
                            {currentCustomers.map((customer) => (
                                <div
                                    className='my-4 grid grid-cols-[minmax(236px,_1fr)_minmax(260px,_1fr)_2fr] '
                                    key={customer._id}
                                >
                                    <>
                                        <p className='ml-6 min-w-48 whitespace-nowrap text-base font-medium text-customBlue underline'>
                                            {customer.firstName} {customer.lastName}
                                        </p>
                                        <p className='min-w-48'>{customer.email}</p>
                                        <button
                                            onClick={() => removeEmployee(customer)}
                                            className={cn(
                                                isEdit ? 'opacity-100' : 'opacity-0',
                                                'ml-1 mt-1 transition duration-300 ease-out'
                                            )}
                                        >
                                            <XSvg />
                                        </button>
                                    </>
                                </div>
                            ))}
                        </div>
                    )}
                    {isAdd && (
                        <div className='pb-3'>
                            <CustomersForm
                                setIsAdd={setIsAdd}
                                currentEmployees={currentCustomers}
                                project={project}
                            />
                        </div>
                    )}
                    <div
                        className={cn(
                            isHover && !isEdit && !isAdd ? 'opacity-100' : 'opacity-0',
                            'absolute right-4 top-3 transition duration-300 ease-in-out'
                        )}
                    >
                        <button onClick={() => setIsEdit(true)}>
                            <EditPenSvg />
                        </button>
                    </div>
                    <div
                        className={cn(
                            isEdit ? 'visible' : 'invisible',
                            'absolute right-4 top-3 space-x-4 transition duration-300 ease-in-out'
                        )}
                    >
                        <button
                            className='adminProjectBtn bg-customBlue text-white'
                            onClick={handleUpdateEmployees}
                        >
                            Save
                        </button>
                        <button
                            className='adminProjectBtn bg-customDarkBlue text-white'
                            onClick={() => {
                                setIsEdit(false);
                                setCurrentCustomers(project.customerIds);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                {isInvite ? (
                    <CustomersInviteForm setIsInvite={setIsInvite} project={project} />
                ) : (
                    <>
                        <button
                            onClick={() => setIsAdd(true)}
                            className={cn(
                                isEdit && 'opacity-0',
                                'adminProjectBtn ml-5 bg-customDarkBlue text-white transition duration-300 ease-out'
                            )}
                        >
                            <span className='flex items-center gap-0.5'>
                                <PlusSvg color='white' />
                                Existing user
                            </span>
                        </button>
                        <button
                            onClick={() => setIsInvite(true)}
                            className={cn(
                                isEdit && 'opacity-0',
                                'adminProjectBtn ml-5 border-[1px] border-customDarkBlue bg-white text-customDarkBlue transition duration-300 ease-out'
                            )}
                        >
                            <span className='flex items-center gap-0.5'>
                                <PlusSvg />
                                Invite user
                            </span>
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

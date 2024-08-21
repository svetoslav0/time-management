import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import useUpdateProject from '../hooks/useUpdateProject';
import CustomersForm from './CustomersForm';
import CustomersInviteForm from './CustomersInviteForm';

import { CustomersIds, EmployeeIds, ProjectResponseDataType } from '@/shared/types';
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
        setCurrentCustomers((prevEmployees) =>
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
                className='shadow-loginFormShadow'
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
                                            <svg
                                                width='12'
                                                height='12'
                                                viewBox='0 0 12 12'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <g id='Group 61'>
                                                    <path
                                                        id='Line 3'
                                                        d='M2 2L10 10'
                                                        stroke='#FF7171'
                                                        strokeWidth='3'
                                                        strokeLinecap='round'
                                                    />
                                                    <path
                                                        id='Line 4'
                                                        d='M10 2L2 10'
                                                        stroke='#FF7171'
                                                        strokeWidth='3'
                                                        strokeLinecap='round'
                                                    />
                                                </g>
                                            </svg>
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
                        <svg
                            width='19'
                            height='19'
                            viewBox='0 0 19 19'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            onClick={() => setIsEdit(true)}
                            className='cursor-pointer'
                        >
                            <path
                                d='M17.7656 16.7773H1.23438C0.836816 16.7773 0.515625 17.0985 0.515625 17.4961V18.3047C0.515625 18.4035 0.596484 18.4844 0.695312 18.4844H18.3047C18.4035 18.4844 18.4844 18.4035 18.4844 18.3047V17.4961C18.4844 17.0985 18.1632 16.7773 17.7656 16.7773ZM3.78818 14.8906C3.83311 14.8906 3.87803 14.8861 3.92295 14.8794L7.70088 14.2168C7.7458 14.2078 7.78848 14.1876 7.81992 14.1539L17.3411 4.63271C17.3619 4.61194 17.3785 4.58725 17.3897 4.56008C17.401 4.53291 17.4068 4.50378 17.4068 4.47437C17.4068 4.44495 17.401 4.41582 17.3897 4.38865C17.3785 4.36148 17.3619 4.3368 17.3411 4.31602L13.6081 0.580762C13.5654 0.538086 13.5093 0.515625 13.4486 0.515625C13.388 0.515625 13.3318 0.538086 13.2892 0.580762L3.76797 10.102C3.73428 10.1356 3.71406 10.1761 3.70508 10.221L3.04248 13.9989C3.02063 14.1193 3.02844 14.2431 3.06523 14.3597C3.10202 14.4763 3.16668 14.5823 3.25361 14.6683C3.40186 14.812 3.58828 14.8906 3.78818 14.8906Z'
                                fill='#163851'
                            />
                        </svg>
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
                            onClick={() => setIsEdit(false)}
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
                                <svg
                                    width='13'
                                    height='13'
                                    viewBox='0 0 13 13'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g id='Group'>
                                        <path
                                            id='Vector'
                                            d='M5.68746 10.8337C5.68746 11.0491 5.77306 11.2558 5.92544 11.4082C6.07781 11.5606 6.28447 11.6462 6.49996 11.6462C6.71545 11.6462 6.92211 11.5606 7.07448 11.4082C7.22686 11.2558 7.31246 11.0491 7.31246 10.8337V7.31283H10.8333C11.0488 7.31283 11.2554 7.22722 11.4078 7.07485C11.5602 6.92248 11.6458 6.71581 11.6458 6.50033C11.6458 6.28484 11.5602 6.07817 11.4078 5.9258C11.2554 5.77343 11.0488 5.68783 10.8333 5.68783H7.31246V2.16699C7.31246 1.9515 7.22686 1.74484 7.07448 1.59247C6.92211 1.44009 6.71545 1.35449 6.49996 1.35449C6.28447 1.35449 6.07781 1.44009 5.92544 1.59247C5.77306 1.74484 5.68746 1.9515 5.68746 2.16699V5.68783H2.16663C1.95114 5.68783 1.74448 5.77343 1.5921 5.9258C1.43973 6.07817 1.35413 6.28484 1.35413 6.50033C1.35413 6.71581 1.43973 6.92248 1.5921 7.07485C1.74448 7.22722 1.95114 7.31283 2.16663 7.31283H5.68746V10.8337Z'
                                            fill='white'
                                        />
                                    </g>
                                </svg>
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
                                <svg
                                    width='13'
                                    height='13'
                                    viewBox='0 0 13 13'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g id='Group'>
                                        <path
                                            id='Vector'
                                            d='M5.68746 10.8332C5.68746 11.0487 5.77306 11.2553 5.92544 11.4077C6.07781 11.5601 6.28447 11.6457 6.49996 11.6457C6.71545 11.6457 6.92211 11.5601 7.07448 11.4077C7.22686 11.2553 7.31246 11.0487 7.31246 10.8332V7.31234H10.8333C11.0488 7.31234 11.2554 7.22674 11.4078 7.07436C11.5602 6.92199 11.6458 6.71533 11.6458 6.49984C11.6458 6.28435 11.5602 6.07769 11.4078 5.92531C11.2554 5.77294 11.0488 5.68734 10.8333 5.68734H7.31246V2.1665C7.31246 1.95102 7.22686 1.74435 7.07448 1.59198C6.92211 1.43961 6.71545 1.354 6.49996 1.354C6.28447 1.354 6.07781 1.43961 5.92544 1.59198C5.77306 1.74435 5.68746 1.95102 5.68746 2.1665V5.68734H2.16663C1.95114 5.68734 1.74448 5.77294 1.5921 5.92531C1.43973 6.07769 1.35413 6.28435 1.35413 6.49984C1.35413 6.71533 1.43973 6.92199 1.5921 7.07436C1.74448 7.22674 1.95114 7.31234 2.16663 7.31234H5.68746V10.8332Z'
                                            fill='#163851'
                                        />
                                    </g>
                                </svg>
                                Invite user
                            </span>
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

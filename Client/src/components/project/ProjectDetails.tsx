import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Table from './Table/Table';

import useFetchProjectById from '@/reactQuery/hooks/useFetchProjectById';
import useFetchUsers from '@/reactQuery/hooks/useFetchUsers';


export default function ProjectDetails() {
    const [showCustomers, setShowCustomers] = useState<boolean>(false);
    const [showEmployees, setShowEmployees] = useState<boolean>(false);
    const { data: customers } = useFetchUsers('customer', 'active');
    const { data: employees } = useFetchUsers('employee', 'active');
    const navigate = useNavigate();
    const { id } = useParams<string>();
    const { data: project, error } = useFetchProjectById(id!);
    if (error) {
        navigate('admin/projectAdminDashboard');
    }

    return (
        <>
            <div className='relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8'>
                <span className='absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'></span>
                <div className='sm:flex sm:justify-between sm:gap-4'>
                    <div>
                        <h3 className='text-lg font-bold text-gray-900 sm:text-xl'>
                            {project?.projectName}
                        </h3>
                        <p className='mt-1 text-xs font-medium text-gray-600'>
                            {project?.status === 'inProgress' ? (
                                <span className='rounded-full bg-yellow-500 px-2'>In Progress</span>
                            ) : (
                                <span className='rounded-full bg-green-500 px-2'>Completed</span>
                            )}
                        </p>
                    </div>
                </div>
                {/* DESCRIPTION */}
                <div>
                    <p className='text-pretty text-sm text-gray-500'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
                        provident a, ipsa maiores deleniti consectetur nobis et eaque.
                    </p>
                </div>
                {/* CUSTOM INFORMATION */}
                <dl className='mt-6 flex justify-between sm:gap-6'>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Price per hour</dt>
                        <dd className='text-center text-xs text-gray-500'>
                            {project?.pricePerHour}
                        </dd>
                    </div>
                    <div className='flex flex-col'>
                        <dt className='text-sm font-medium text-gray-600'>Starting date</dt>
                        <dd className='text-center text-xs text-gray-500'>
                            {dayjs(project?.startingDate).format('Do MMMM, YYYY')}
                        </dd>
                    </div>
                </dl>
                {/* BUTTONS */}
                {
                    <div className='mt-5 flex justify-center gap-2 align-middle'>
                        <button
                            onClick={() => {setShowCustomers(true); setShowEmployees(false)}}
                            className='rounded-full border-2 border-yellow-500 bg-yellow-400 px-6 font-semibold text-white hover:bg-yellow-500'
                        >
                            Show Customers
                        </button>
                        <button
                            onClick={() => {setShowEmployees(true); setShowCustomers(false)}}
                            className='rounded-full border-2 border-indigo-500 bg-indigo-400 px-6 font-semibold text-white hover:bg-indigo-500'
                        >
                            Show Employees
                        </button>
                        <button
                            onClick={() => {setShowEmployees(false); setShowCustomers(false)}}
                            className='rounded-full border-2 border-indigo-500 bg-indigo-400 px-6 font-semibold text-white hover:bg-indigo-500'
                        >
                            Close All
                        </button>
                        {/* DEPENDS ON STATUS CONDITIONAL RENDERING */}
                    </div>
                }
            </div>
            {
                showEmployees && (
                    <Table users={employees?.items} />
                )
            }
            {
                showCustomers && (
                    <Table users={customers?.items} />
                )
            }
        </>
    );
}

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import useUpdateProject from '../hooks/useUpdateProject';
import EmployeesForm from './EmployeesForm';

import { EmployeeIds, ProjectResponseDataType } from '@/shared/types';
import cn from '@/util/cn';

type ProjectEmployeesListProps = {
    project: ProjectResponseDataType;
};

export default function ProjectEmployeesList({ project }: ProjectEmployeesListProps) {
    const [isHover, setIsHover] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const [currentEmployees, setCurrentEmployees] = useState<[] | EmployeeIds[]>(
        project.employeeIds
    );

    const { updateProject, isError } = useUpdateProject(project._id);

    useEffect(() => {
        if (isError) {
            setCurrentEmployees(project.employeeIds);
        }
    }, [isError, project]);

    function removeEmployee(employee: EmployeeIds) {
        setCurrentEmployees(
            (prevEmployees) =>
                prevEmployees?.filter((currEmployee) => currEmployee._id !== employee._id) || []
        );
    }

    function handleUpdateEmployees() {
        if (currentEmployees) {
            project.employeeIds = currentEmployees;
            project.startingDate = dayjs(project.startingDate).format('YYYY-MM-DD');
            updateProject(project);
            setIsEdit(false);
            setIsAdd(false);
        }
    }

    return (
        <div
            className='shadow-loginFormShadow'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className='mt-11 rounded-t-2xl bg-customDarkBlue shadow-loginFormShadow'>
                <p className='py-2 pl-6 text-base font-bold text-white'>Employees</p>
            </div>
            <div
                className={cn(
                    isHover || isEdit || isAdd ? 'bg-customVeryLightBlue' : 'bg-while',
                    'relative flex min-h-20 flex-wrap items-center rounded-b-2xl  pr-48 shadow-loginFormShadow transition duration-300 ease-out'
                )}
            >
                {currentEmployees &&
                    currentEmployees.map((employee) => (
                        <div className='flex items-center' key={employee._id}>
                            <p className='my-8 ml-6 whitespace-nowrap text-base font-medium text-customBlue underline'>
                                {employee.firstName} {employee.lastName}
                            </p>
                            <button
                                onClick={() => removeEmployee(employee)}
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
                        </div>
                    ))}
                {isAdd ? (
                    <EmployeesForm
                        setIsAdd={setIsAdd}
                        currentEmployees={currentEmployees}
                        project={project}
                    />
                ) : (
                    <button
                        onClick={() => setIsAdd(true)}
                        className={cn(
                            isEdit && 'opacity-0',
                            'adminProjectBtn my-8 ml-5 bg-customDarkBlue text-white transition duration-300 ease-out'
                        )}
                    >
                        Add
                    </button>
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
    );
}

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import useUpdateProject from '../hooks/useUpdateProject';
import EmployeesForm from './EmployeesForm';

import { EmployeeIds, ProjectResponseDataType } from '@/shared/types';
import cn from '@/util/cn';
import EditPenSvg from '@/UI/design/EditPenSvg';
import XSvg from '@/UI/design/XSvg';

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
                                <XSvg />
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
                            setCurrentEmployees(project.employeeIds);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

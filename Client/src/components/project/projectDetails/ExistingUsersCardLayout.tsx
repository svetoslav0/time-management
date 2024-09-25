import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import useUpdateProject from '../hooks/useUpdateProject';
import AddExistingUserForm from './AddExistingUserForm';

import { ProjectResponseDataType, UserData } from '@/shared/types';
import EditPenSvg from '@/UI/design/EditPenSvg';
import PlusSvg from '@/UI/design/PlusSvg';
import XSvg from '@/UI/design/XSvg';
import cn from '@/util/cn';

type ExistingUsersCardLayoutProps = {
    project: ProjectResponseDataType;
    userType: 'employeeIds' | 'customerIds';
};

export default function ExistingUsersCardLayout({
    project,
    userType,
}: ExistingUsersCardLayoutProps) {
    const [isHover, setIsHover] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const [currentUsers, setCurrentUsers] = useState<[] | UserData[]>(project[userType]);

    const { updateProject } = useUpdateProject(project._id);

    function removePerson(personData: UserData) {
        setCurrentUsers(
            (prevPersons) => prevPersons?.filter((person) => person._id !== personData._id) || []
        );
    }

    useEffect(() => {
        setCurrentUsers(project[userType]);
    }, [project, userType]);

    function handleUpdateEmployees() {
        if (currentUsers) {
            project[userType] = currentUsers;
            project.startingDate = dayjs(project.startingDate).format('YYYY-MM-DD');
            updateProject(project);
            setIsEdit(false);
        }
    }

    return (
        <>
            <div
                className='rounded-2xl shadow-loginFormShadow'
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <div className='mt-11 rounded-t-2xl bg-customDarkBlue shadow-loginFormShadow'>
                    <p className='py-2 pl-6 text-base font-bold text-white'>
                        {(userType === 'customerIds' && 'Customers') ||
                            (userType === 'employeeIds' && 'Employees')}
                    </p>
                </div>
                <div
                    className={cn(
                        isHover || isEdit || isAdd ? 'bg-customVeryLightBlue' : 'bg-while',
                        'relative  min-h-20 flex-row items-center rounded-b-2xl  pr-48 shadow-loginFormShadow transition duration-300 ease-out'
                    )}
                >
                    {currentUsers && (
                        <div className='py-5'>
                            {currentUsers.length == 0 ? (
                                <div className='ml-6  whitespace-nowrap text-base font-medium '>
                                    <div className='font-light italic mt-1.5'>No assigned users!</div>
                                </div>
                            ) : (
                                currentUsers.map((person) => (
                                    <div className='my-4 flex' key={person._id}>
                                        <>
                                            <div className='ml-6  whitespace-nowrap text-base font-medium '>
                                                <span className='text-customBlue underline'>
                                                    {person.firstName} {person.lastName}{' '}
                                                </span>
                                                <span>({person.email})</span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (isEdit) {
                                                        removePerson(person);
                                                    }
                                                }}
                                                className={cn(
                                                    isEdit
                                                        ? 'opacity-100'
                                                        : 'cursor-default opacity-0',
                                                    'ml-1 mt-1 transition duration-300 ease-out'
                                                )}
                                            >
                                                <XSvg />
                                            </button>
                                        </>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    <div
                        className={cn(
                            isHover && !isEdit ? 'opacity-100' : 'opacity-0',
                            'absolute right-4 top-3 transition duration-300 ease-in-out'
                        )}
                    >
                        {currentUsers.length > 0 && !isAdd && (
                            <button onClick={() => setIsEdit(true)}>
                                <EditPenSvg />
                            </button>
                        )}
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
                                setCurrentUsers(project[userType]);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                {isAdd ? (
                    <AddExistingUserForm
                        project={project}
                        currentUsers={currentUsers}
                        setIsAdd={setIsAdd}
                        userType={userType}
                    />
                ) : (
                    <button
                        onClick={() => setIsAdd(true)}
                        className={cn(
                            isEdit && 'opacity-0',
                            'adminProjectBtn ml-5 bg-customDarkBlue text-white transition duration-300 ease-out'
                        )}
                    >
                        <span className='flex items-center gap-0.5'>
                            <PlusSvg color='white' />
                            {userType === 'customerIds' ? 'Add customer' : 'Add employee'}
                        </span>
                    </button>
                )}
            </div>
        </>
    );
}

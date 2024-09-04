import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useCompleteProject from './hooks/useCompleteProject';
import ProjectCustomersList from './projectDetails/ProjectCustomersList';
import ProjectEmployeesList from './projectDetails/ProjectEmployeesList';

import useFetchProjectById from '@/reactQuery/hooks/useFetchProjectById';
import { ProjectResponseDataType } from '@/shared/types';
import GearSvg from '@/UI/design/GearSvg';
import Modal from '@/UI/Modal';
import cn from '@/util/cn';

export default function ProjectDetails() {
    const navigate = useNavigate();
    const { id } = useParams<string>();
    const { data: project, error, isFetching } = useFetchProjectById(id!);
    const { completeProject, isCompletedSuccessful } = useCompleteProject(id);
    const [showActionCompleteModal, setShowActionCompleteModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);

    useEffect(() => {
        if (isCompletedSuccessful) {
            setShowActionCompleteModal(false);
            setShowCompleteModal(true);
        }
    }, [isCompletedSuccessful]);

    useEffect(() => {
        if (error && !isFetching) {
            navigate('/');
        }
    }, [error, isFetching, navigate]);

    const onCompleteProject = async () => {
        if (project && project.status == 'inProgress') {
            const date = dayjs(project.startingDate, 'YYYY-MM-DD');
            const projectData: ProjectResponseDataType = {
                ...project,
                status: 'completed',
                startingDate: date.format('YYYY-MM-DD'),
            };

            completeProject(projectData);
        }
    };

    if (error) {
        navigate('admin/projectAdminDashboard');
    }

    return (
        <div className='mx-20 mt-[126px]'>
            {showCompleteModal && (
                <Modal
                    bgColor='bg-customDarkBlue'
                    padding='p-0'
                    rounded='rounded-[22px]'
                    closeBtn={false}
                    isOpen={showCompleteModal}
                    onClose={() => setShowCompleteModal(false)}
                >
                    <div className='relative flex h-[202px] w-[414px] flex-col items-center justify-evenly '>
                        <p className='max-w-[230px] text-center text-xl font-bold text-white'>
                            This project was successfully completed!
                        </p>
                        <div className='absolute -right-9 top-2'>
                            <GearSvg width={67.55} height={71.95} />
                        </div>
                        <div className='absolute -left-[50px] bottom-2'>
                            <GearSvg width={99.64} height={106.12} />
                        </div>
                    </div>
                </Modal>
            )}
            {showActionCompleteModal && (
                <Modal
                    bgColor='bg-customDarkBlue'
                    padding='p-0'
                    rounded='rounded-[22px]'
                    closeBtn={false}
                    isOpen={showActionCompleteModal}
                    onClose={() => setShowActionCompleteModal(false)}
                >
                    <div className='relative flex h-[202px] w-[414px] flex-col items-center justify-evenly '>
                        <p className='max-w-[239px] text-center text-xl font-bold text-white'>
                            Are you sure you want to complete this project?
                        </p>
                        <div className='flex gap-16'>
                            <button
                                onClick={() => onCompleteProject()}
                                className='h-[32px] w-[67px] rounded-md bg-customBlue text-lg font-bold text-white'
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowActionCompleteModal(false)}
                                className='h-[32px] w-[67px] rounded-md border border-customBlue text-lg font-bold text-white'
                            >
                                No
                            </button>
                        </div>
                        <div className='absolute -left-9 bottom-2'>
                            <GearSvg width={67.55} height={71.95} />
                        </div>
                        <div className='absolute -right-[50px] top-2'>
                            <GearSvg width={99.64} height={106.12} />
                        </div>
                    </div>
                </Modal>
            )}
            {project ? (
                <>
                    <div className='text-lg'>
                        <div className='flex items-center  justify-between font-bold text-customDarkBlue'>
                            <p>Project name: {project.projectName}</p>
                            <p>Start Date: {dayjs(project.startingDate).format('DD.MM.YY')}</p>
                            <p>Price: ${project.pricePerHour}/h</p>
                            {project.status === 'inProgress' ? (
                                <button
                                    className='primaryBtn'
                                    onClick={() => setShowActionCompleteModal(true)}
                                >
                                    Complete project
                                </button>
                            ) : (
                                <button>download button </button>
                            )}
                        </div>
                        <p
                            className={cn(
                                project.status === 'inProgress'
                                    ? 'text-customBlue'
                                    : 'text-customGreen',
                                'mt-6 font-normal'
                            )}
                        >
                            Status: {project.status === 'inProgress' ? 'In Progress' : 'Completed'}
                        </p>
                    </div>
                    <ProjectEmployeesList project={project} />
                    <ProjectCustomersList project={project} />
                </>
            ) : (
                <p>Something went wrong</p>
            )}
        </div>
    );
}

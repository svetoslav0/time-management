import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useCompleteProject from '../hooks/useCompleteProject';
import EditHoursForm from './EditHoursForm';
import ExistingUsersCardLayout from './ExistingUsersCardLayout';
import GeneratedReports from './GeneratedReports';
import GenerateReport from './GenerateReport';
import HoursListCard from './HoursListCard';
import InviteUsersCardLayout from './InviteUsersCardLayout';

import useFetchProjectById from '@/reactQuery/hooks/useFetchProjectById';
import { ProjectResponseDataType } from '@/shared/types';
import DownloadSvg from '@/UI/design/DownloadSvg';
import GearSvg from '@/UI/design/GearSvg';
import DownloadFile from '@/UI/DownloadFile';
import Loader from '@/UI/Loader';
import Modal from '@/UI/Modal';

export default function ProjectDetails() {
    const navigate = useNavigate();
    const { id } = useParams<string>();
    const { data: project, error, isFetching } = useFetchProjectById(id);
    const { completeProject, isCompletedSuccessful, isCompletedPending } = useCompleteProject(id);
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

    const [isDownloading, setIsDownloading] = useState(false);
    const [shouldDownload, setShouldDownload] = useState(false);

    const handleDownload = () => {
        if (!isDownloading) {
            setIsDownloading(true);
            setShouldDownload(true);
        }
    };

    const onDownloadComplete = () => {
        setIsDownloading(false);
        setShouldDownload(false);
    };

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
                        {isCompletedPending ? (
                            <div className='absolute'>
                                <div className='flex w-32 justify-center'>
                                    <span className='relative flex h-20 w-20'>
                                        <span className='h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200'></span>
                                        <span className='absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-blue-500'></span>
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
                        <div className='absolute -left-9 bottom-2'>
                            <GearSvg width={67.55} height={71.95} />
                        </div>
                        <div className='absolute -right-[50px] top-2'>
                            <GearSvg width={99.64} height={106.12} />
                        </div>
                    </div>
                </Modal>
            )}
            {isFetching && (
                <div className='relative flex w-full justify-center'>
                    <Loader />
                </div>
            )}
            {project && (
                <>
                    <div className='text-lg'>
                        <div className='flex items-start  justify-between font-bold text-customDarkBlue'>
                            <div>
                                <p>Project name: {project.projectName}</p>
                                <p>Start Date: {dayjs(project.startingDate).format('DD.MM.YY')}</p>
                                <EditHoursForm project={project} />
                            </div>
                            <div className='flex gap-4'> 
                                {id && <GenerateReport projectId={id} />}
                                {project.status === 'inProgress' ? (
                                    <button
                                        className='primaryBtn'
                                        onClick={() => setShowActionCompleteModal(true)}
                                    >
                                        Complete project
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleDownload}
                                        type='button'
                                        className='primaryBtn'
                                        disabled={isDownloading || shouldDownload}
                                    >
                                        <span className='flex gap-1'>
                                            <DownloadSvg /> Download report
                                        </span>
                                    </button>
                                )}
                                {shouldDownload && (
                                    <DownloadFile
                                        projectId={id}
                                        onDownloadComplete={onDownloadComplete}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <ExistingUsersCardLayout userType='employeeIds' project={project} />
                    <ExistingUsersCardLayout userType='customerIds' project={project} />
                    <InviteUsersCardLayout project={project} />
                    {id && <HoursListCard projectId={id} />}
                    {id && <GeneratedReports projectId={id} />}
                </>
            )}
        </div>
    );
}

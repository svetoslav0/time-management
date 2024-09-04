import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useCompleteProject from './hooks/useCompleteProject';
import ProjectCustomersList from './projectDetails/ProjectCustomersList';
import ProjectEmployeesList from './projectDetails/ProjectEmployeesList';

import useFetchProjectById from '@/reactQuery/hooks/useFetchProjectById';
import { ProjectResponseDataType } from '@/shared/types';
import cn from '@/util/cn';

export default function ProjectDetails() {
    const navigate = useNavigate();
    const { id } = useParams<string>();
    const { data: project, error, isFetching } = useFetchProjectById(id!);

    const { completeProject } = useCompleteProject(id);

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
            {project ? (
                <>
                    <div className='text-lg'>
                        <div className='flex items-center  justify-between font-bold text-customDarkBlue'>
                            <p>Project name: {project.projectName}</p>
                            <p>Start Date: {dayjs(project.startingDate).format('DD.MM.YY')}</p>
                            <p>Price: ${project.pricePerHour}/h</p>
                            <button
                                className='primaryBtn'
                                onClick={() => {
                                    onCompleteProject();
                                }}
                            >
                                Complete project
                            </button>
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

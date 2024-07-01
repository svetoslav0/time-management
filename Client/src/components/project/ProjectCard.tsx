import dayjs from 'dayjs';

import { ProjectResponseDataType } from '../../shared/types';
import ButtonReport from '../../UI/formComponents/ButtonReport';

import ButtonDetails from '@/UI/formComponents/ButtonDetails';
import ButtonEdit from '@/UI/formComponents/ButtonEdit';

export default function ProjectCard({ project }: { project: ProjectResponseDataType }) {
    const colorStatus = `${project.status === 'inProgress' ? 'text-green-600' : project.status === 'completed' ? 'text-blue-600' : 'text-gray-300'}`;
    const daysAgo = dayjs().diff(dayjs(project.startingDate), 'day');

    return (
        <>
            <div className='text-surface shadow-secondary-1 dark:bg-surface-dark background-color max-w block rounded-lg border dark:text-white'>
                <div className='border-b-2 px-6 py-3 text-black dark:rounded-t-lg dark:bg-gray-900 dark:text-white'>
                    Client name: Yet to be implemented
                </div>
                <div className='p-6  text-black dark:bg-gray-900'>
                    <h5 className='mb-2 text-xl font-medium leading-tight dark:text-white'>
                        Project name: {project.projectName}
                    </h5>
                    <p className='text-base text-black dark:text-white'>
                        Team: Yet to be implemented
                    </p>
                    <p className='text-black  dark:text-white'>Starting date {daysAgo} days ago.</p>
                </div>
                <div className='border-t-2 px-6 py-3 dark:rounded-b-lg dark:bg-gray-900'>
                    <p className={`${colorStatus} mr-5 inline-block`}>
                        Status: {project.status === 'inProgress' ? 'In Progress' : 'Complete'}.
                    </p>
                    <ButtonDetails children='Details' path={`/admin/projects/${project._id}`} />
                    <ButtonEdit
                        children='Edit'
                        path={`/admin/projectForm?action=edit&projectId=${project._id}`}
                    />
                    {project.status === 'completed' ? <ButtonReport children='Report' /> : ''}
                </div>
            </div>
        </>
    );
}

import { Link } from 'react-router-dom';

import { ProjectResponseDataType } from '../../shared/types';

import cn from '@/util/cn';

export default function ProjectCard({
    project,
    index,
}: {
    project: ProjectResponseDataType;
    index: number;
}) {
    return (
        <div
            className={cn(
                index % 2 === 0 ? 'justify-self-end' : 'justify-self-start',
                project.status === 'inProgress'
                    ? 'hover:border-customBlue'
                    : 'hover:border-customGreen',
                'flex w-[519px] border-collapse overflow-hidden rounded-2xl border-[1px] border-l-0 border-white transition duration-200 ease-out '
            )}
        >
            <div
                className={cn(
                    project.status === 'inProgress' ? 'bg-customBlue' : 'bg-customGreen',
                    'h-full w-[9px]'
                )}
            ></div>
            <div className='ml-2 w-full text-lg'>
                <p className='mt-5 font-bold text-customDarkBlue'>
                    Project name: {project.projectName}
                </p>
                <div className='mb-5 ml-4 mr-[41px] mt-4 flex justify-between'>
                    <p
                        className={cn(
                            project.status === 'inProgress'
                                ? 'text-customBlue'
                                : 'text-customGreen',
                            'font-normal'
                        )}
                    >
                        Status: {project.status === 'inProgress' ? 'In Progress' : 'Completed'}
                    </p>
                    <Link to={`/admin/projects/${project._id}`} className='secondaryBtn'>
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

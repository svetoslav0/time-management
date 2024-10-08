import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { ProjectResponseDataType } from '@/shared/types';
import cn from '@/util/cn';

type CustomersProjectCardProps = {
    project: ProjectResponseDataType;
};

export default function CustomersProjectCard({ project }: CustomersProjectCardProps) {
    return (
        <div
            className={cn(
                project.status === 'inProgress'
                    ? 'hover:border-customBlue'
                    : 'hover:border-customGreen',
                'relative flex h-full w-[458px] border-collapse overflow-hidden rounded-2xl border-[1px] border-l-0 border-white transition duration-300 ease-out '
            )}
        >
            <div
                className={cn(
                    project.status === 'inProgress' ? 'bg-customBlue' : 'bg-customGreen',
                    'w-[9px]'
                )}
            ></div>
            <div className='ml-2 w-full text-lg'>
                <p className='mt-5 font-bold text-customDarkBlue'>
                    Project name: {project.projectName}
                </p>
                <div className='mb-5 ml-4 mr-[41px] mt-4'>
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
                    <div className='mt-0.5 text-base text-customDarkBlue'>
                        <span className='font-semibold '>Start date: </span>
                        <span className='font-medium'>
                            {dayjs(project.startingDate).format('DD.MM.YY')}
                        </span>
                    </div>
                    <div className='text-base text-customDarkBlue'>
                        <span className='font-semibold '>Price: </span>
                        <span className='font-medium'>${project.pricePerHour}/h</span>
                    </div>
                </div>

                <div className='absolute bottom-[22px] right-[53px]'>
                    <Link
                        to={`${project.status === 'completed' ? '/dashboard/' : '/reports/'}${project._id}`}
                        className='secondaryBtn'
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

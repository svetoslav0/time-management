import CustomersProjectCard from './CustomersProjectCard';

import useFetchAllProjects from '@/reactQuery/hooks/useFetchAllProjects';
import Loader from '@/UI/Loader';
import cn from '@/util/cn';

export default function CustomersProjects() {
    const { data: projects, isLoading } = useFetchAllProjects();

    return (
        <div>
            {isLoading ? (
                <div className='relative flex w-full justify-center'>
                    <Loader />
                </div>
            ) : projects && projects.length > 0 ? (
                <div className='mt-28 grid grid-cols-2 gap-x-[107px] gap-y-10'>
                    {projects.map((project, index) => (
                        <div
                            key={project._id}
                            className={cn(
                                index % 2 === 0 ? 'justify-self-end' : 'justify-self-start'
                            )}
                        >
                            <CustomersProjectCard project={project} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className='mt-28 text-center text-xl text-customDarkBlue'>
                    There is not available projects
                </p>
            )}
        </div>
    );
}

import CustomersProjectCard from './CustomersProjectCard';

import useFetchAllProjects from '@/reactQuery/hooks/useFetchAllProjects';
import cn from '@/util/cn';

export default function CustomersProjects() {
    const { data: projects } = useFetchAllProjects();

    return (
        <div>
            {projects && projects.length > 0 ? (
                <div className='grid grid-cols-2 gap-x-[107px] gap-y-10 mt-28'>
                    {projects.map((project, index) => (
                        <div key={project._id} className={cn(index % 2 === 0 ? 'justify-self-end' : 'justify-self-start')}>
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

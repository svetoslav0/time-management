import ProjectCard from './ProjectCard';

import useFetchAllProjects from '@/reactQuery/hooks/useFetchAllProjects';
import ActionSearchFiled from '@/UI/formComponents/ActionSearchFiled';
import Loader from '@/UI/Loader';

export default function ProjectAdminDashboard() {
    const { data: projects, isLoading, filter, handleChangeFilter } = useFetchAllProjects();

    return (
        <div className=' flex-1'>
            <div className='my-16 flex justify-center'>
                <ActionSearchFiled
                    value={filter}
                    handleChangeFilter={handleChangeFilter}
                    placeholder='search projects..'
                />
            </div>
            {isLoading ? (
                <div className='relative flex w-full justify-center'>
                    <Loader />
                </div>
            ) : (
                <div>
                    {projects && projects.length > 0 ? (
                        <div className='grid grid-cols-2 gap-x-[72px] gap-y-[39px]'>
                            {projects.map((project, index) => (
                                <ProjectCard key={project._id} project={project} index={index} />
                            ))}
                        </div>
                    ) : (
                        <p className='text-center text-lg font-bold text-customDarkBlue'>
                            There is no projects
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

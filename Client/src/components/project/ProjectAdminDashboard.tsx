import { LoginResponseData } from '../../shared/types';
// import SearchBar from '../../UI/formComponents/SearchBar';
import ProjectCard from './ProjectCard';

import useFetchAllProjects from '@/reactQuery/hooks/useFetchAllProjects';
import ActionSearchFiled from '@/UI/formComponents/ActionSearchFiled';
import ButtonCreateProject from '@/UI/formComponents/ButtonCreateProject';
import { getUserData } from '@/util/util';

export default function ProjectAdminDashboard() {
    const { data: projects, isLoading, filter, handleChangeFilter } = useFetchAllProjects();
    const currentUser: LoginResponseData | undefined = getUserData();

    return (
        <div className='flex-1 p-4'>
            <div className='flex justify-center'>
                <h2 className='my-3 text-3xl font-bold'>Projects</h2>
            </div>
            <div className='flex justify-center'>
                {currentUser?.userRole === 'admin' && (
                    <ButtonCreateProject
                        children='Create Project'
                        path={'/admin/projectForm?action=create'}
                    />
                )}
            </div>
            <div className='flex justify-center'>
                <ActionSearchFiled value={filter} handleChangeFilter={handleChangeFilter} />
            </div>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className='mx-10 mt-4 grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4'>
                    {projects?.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}

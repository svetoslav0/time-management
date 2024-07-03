import ButtonCreateProject from '@/UI/formComponents/ButtonCreateProject';
import ProjectCard from './ProjectCard';
import { getUserData } from '@/util/util';
import { LoginResponseData, User } from '../../shared/types';

import useFetchAllProjects from '@/reactQuery/hooks/useFetchAllProjects';

export default function ProjectAdminDashboard() {
    const { data: projects, isLoading } = useFetchAllProjects();
    const currentUser: LoginResponseData | undefined = getUserData();

    return (
        <div className=' flex flex-col items-center justify-center'>
            <h2 className='my-3 text-3xl font-bold'>Projects</h2>
            {currentUser?.userRole === 'admin' && (
                <ButtonCreateProject
                    children='Create Project'
                    path={'/admin/projectForm?action=create'}
                />
            )}

            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className='mx-10 mt-4 grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4'>
                    {projects?.map((project) => (
                        <ProjectCard key={project.projectName} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}

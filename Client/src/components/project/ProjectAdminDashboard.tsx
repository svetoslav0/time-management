import ProjectCard from './ProjectCard';

import useFetchAllProjects from '@/reactQuery/hooks/useFetchAllProjects';

export default function ProjectAdminDashboard() {
    const { data: projects, isLoading } = useFetchAllProjects();

    return (
        <>
            <h2 className='text-center'>Projects</h2>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className='mx-10 mt-4 grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4'>
                    {projects?.map((project) => (
                        <ProjectCard key={project.projectName} project={project} />
                    ))}
                </div>
            )}
        </>
    );
}

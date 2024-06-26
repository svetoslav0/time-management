import { useEffect, useState } from 'react';

import ProjectCard from './ProjectCard';

import useFetchAllProjects from '@/reactQuery/hooks/useFetchAllProjects';
import { ProjectResponseDataType } from '@/shared/types';

export default function ProjectAdminDashboard() {
    const { data: fetchedProjects } = useFetchAllProjects();

    const [projects, setProjects] = useState<ProjectResponseDataType[] | undefined>([]);

    useEffect(() => {
        setProjects(fetchedProjects);
    }, [fetchedProjects, projects]);

    return (
        <>
            <h2 className='text-center'>Projects</h2>
            <div className='mx-10 mt-4 grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4'>
                {projects?.map((project) => (
                    <ProjectCard key={project.projectName} project={project} />
                ))}
            </div>
        </>
    );
}

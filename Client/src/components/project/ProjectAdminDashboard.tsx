import { useEffect, useState } from 'react';

import ProjectCard from './ProjectCard';

import useFetchAllProjects from '@/reactQuery/hooks/useFetchAllProjects';
import { ProjectResponseDataType } from '@/shared/types';

export default function ProjectAdminDashboard() {
    const { data: fetchedProjects } = useFetchAllProjects();

    const [projects, setProjects] = useState<ProjectResponseDataType[] | undefined>([]);

    useEffect(() => {
        // const listOfProjects: Project[] = [
        //     {
        //         projectName: 'New app for iPhone',
        //         clientName: 'Apple',
        //         startingDate: 10,
        //         pricePerHour: 10,
        //         listOfEmployees: ['Bob', 'Alex', 'Smith', 'Jake', 'Martin'],
        //         projectStatus: 'In Progress',
        //     },
        //     {
        //         projectName: 'New app for Google',
        //         clientName: 'Google',
        //         startingDate: 20,
        //         pricePerHour: 20,
        //         listOfEmployees: ['Bob', 'Alex', 'Smith', 'Jake', 'Martin'],
        //         projectStatus: 'Archived',
        //     },
        //     {
        //         projectName: 'New app for VISA',
        //         clientName: 'VISA',
        //         startingDate: 30,
        //         pricePerHour: 30,
        //         listOfEmployees: ['Bob', 'Alex', 'Smith', 'Jake', 'Martin'],
        //         projectStatus: 'Done',
        //     },
        // ];
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

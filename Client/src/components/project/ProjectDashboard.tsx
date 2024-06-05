import { useEffect, useState } from 'react';

import { Project } from '../../shared/types';
import ProjectCard from './ProjectCard';

export default function ProjectDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const listOfProjects: Project[] = [
            {
                projectName: 'New app for iPhone',
                clientName: 'Apple',
                startingDate: 10,
                pricePerHour: 10,
                listOfEmployees: ['Bob', 'Alex', 'Smith', 'Jake', 'Martin'],
                projectStatus: 'In Progress',
            },
            {
                projectName: 'New app for Google',
                clientName: 'Google',
                startingDate: 20,
                pricePerHour: 20,
                listOfEmployees: ['Bob', 'Alex', 'Smith', 'Jake', 'Martin'],
                projectStatus: 'Archived',
            },
            {
                projectName: 'New app for VISA',
                clientName: 'VISA',
                startingDate: 30,
                pricePerHour: 30,
                listOfEmployees: ['Bob', 'Alex', 'Smith', 'Jake', 'Martin'],
                projectStatus: 'Done',
            },
        ];
        setProjects(listOfProjects);
    }, []);

    return (
        <>
            <h2 className='text-center'>Projects</h2>
            <div className='mx-10 mt-4 grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4'>
                {projects.map((project) => (
                    <ProjectCard key={project.projectName} project={project} />
                ))}
            </div>
        </>
    );
}

import EmployeeProjectsAccordion from './EmployeeProjectsAccordion';

import useFetchAllProjects from '@/reactQuery/hooks/useFetchAllProjects';
import GearSvg from '@/UI/design/GearSvg';

export default function EmployeeProjects() {
    const { data: projects } = useFetchAllProjects('inProgress');

    return (
        <>
            <div className='relative z-0 m-auto max-w-[1440px]'>
                <div className='absolute left-[5px] top-[29rem] h-[158px] w-[148px]'>
                    <GearSvg />
                </div>
                <div className='absolute right-[-85px] top-0 h-[158px] w-[148px]'>
                    <GearSvg />
                </div>
            </div>
            <div className='font-maven-pro relative z-10 m-auto mt-16 max-w-[1278px] text-2xl font-bold'>
                {projects &&
                    projects.map((project) => (
                        <EmployeeProjectsAccordion
                            key={project._id}
                            projectName={project.projectName}
                            projectId={project._id}
                            companies={project.customerIds}
                        />
                    ))}
            </div>
        </>
    );
}

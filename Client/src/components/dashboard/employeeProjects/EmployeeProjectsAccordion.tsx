import { useState } from 'react';

import EmployeeProject from './EmployeeProject';

import cn from '@/util/cn';

type EmployeeProjectsAccordionProps = {
    projectName: string;
    projectId: string;
    companies: string[];
};

export default function EmployeeProjectsAccordion({
    projectName,
    projectId,
    companies,
}: EmployeeProjectsAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const Arrow = () => (
        <svg
            width='28'
            height='28'
            viewBox='0 0 28 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g id='ri:arrow-drop-down-line'>
                <path
                    id='Vector'
                    d='M16.7817 22.5984C15.2309 24.0992 12.7691 24.0992 11.2183 22.5984L2.41082 14.075C1.09243 12.7991 1.09268 10.685 2.41136 9.40946C3.66998 8.19201 5.66741 8.19237 6.9256 9.41026L11.218 13.5652C12.7689 15.0664 15.2311 15.0664 16.782 13.5651L21.0744 9.41025C22.3326 8.19236 24.33 8.19201 25.5886 9.40946C26.9073 10.685 26.9076 12.7991 25.5892 14.075L16.7817 22.5984Z'
                    fill='#008CFF'
                />
            </g>
        </svg>
    );
    
    return (
        <div className='font-maven-pro mb-4 w-full rounded-2xl border-2 border-transparent text-left text-lg text-[#163851] transition-all duration-500 hover:border-[#008cff]'>
            <div className='h-full w-full rounded-2xl bg-white shadow-[0px_0px_18.5px_-2px_rgba(0,_0,_0,_0.11)]'>
                <div
                    className='flex cursor-pointer justify-between px-4 py-5'
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <div className='flex w-2/4'>
                        <h2 className='w-1/2'>{projectName}</h2>
                        <div className='w-1/2'>
                            {companies.map((company) => (

                                <span key={company}>{company}</span>
                            ))}
                        </div>
                    </div>
                    <div className=''>
                        <div
                            className={cn(
                                isOpen ? 'rotate-180' : '',
                                'flex justify-items-end transition-transform duration-100'
                            )}
                        >
                            <Arrow />
                        </div>
                    </div>
                </div>
                <div
                    className={cn(
                        'transition-max-height overflow-hidden duration-500 ease-in-out',
                        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    )}
                >
                    {isOpen && <EmployeeProject projectId={projectId} />}
                </div>
            </div>
        </div>
    );
}

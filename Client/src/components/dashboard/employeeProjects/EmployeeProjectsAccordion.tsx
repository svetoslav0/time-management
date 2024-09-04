import { useState } from 'react';

import EmployeeProject from './EmployeeProject';

import { CustomersIds } from '@/shared/types';
import ArrowSvg from '@/UI/design/ArrowSvg';
import cn from '@/util/cn';

type EmployeeProjectsAccordionProps = {
    projectName: string;
    projectId: string;
    companies: CustomersIds[];
};

export default function EmployeeProjectsAccordion({
    projectName,
    projectId,
}: EmployeeProjectsAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='font-maven-pro mb-4 w-full rounded-2xl border-2 border-transparent text-left text-lg text-customDarkBlue transition-all duration-500 hover:border-customBlue'>
            <div className='h-full w-full rounded-2xl bg-white shadow-[0px_0px_18.5px_-2px_rgba(0,_0,_0,_0.11)]'>
                <div
                    className='flex cursor-pointer justify-between pl-4 pr-[29px] py-5'
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <div className='text-lg text-customDarkBlue'>
                        <span className='font-bold'>Project Name: </span>
                        <span className='font-medium'>{projectName}</span>
                    </div>
                    <div>
                        <div
                            className={cn(
                                isOpen ? 'rotate-180' : '',
                                'flex justify-items-end transition-transform duration-100 '
                            )}
                        >
                            <ArrowSvg />
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

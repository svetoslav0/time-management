import { useState } from 'react';

import useFetchAllHoursByProject from './hooks/useFetchAllHoursByProject';
import HoursForm from './HoursForm';

type EmployeeProjectProps = {
    projectId: string;
};

export default function EmployeeProject({ projectId }: EmployeeProjectProps) {
    const [addTime, setAddTime] = useState(false);
    const { data: hours } = useFetchAllHoursByProject({ projectId });

    function cancelAddTime() {
        setAddTime(false);
    }
    return (
        <div className='mt-3'>
            {hours &&
                hours.map((hourData) => (
                    <HoursForm
                        key={hourData._id}
                        action='edit'
                        dateData={hourData}
                        projectId={projectId}
                    />
                ))}
            {addTime ? (
                <div>
                    <HoursForm action='create' onCancel={cancelAddTime} projectId={projectId} />
                </div>
            ) : (
                <button
                    onClick={() => setAddTime(true)}
                    className='rounded-[10px] border-[1px] border-customBlue px-[22px] py-2.5 text-base font-black leading-none text-customBlue hover:bg-customBlue hover:text-white inline-block transition-all duration-300 ml-8 mb-5'
                >
                    Add time
                </button>
            )}
        </div>
    );
}

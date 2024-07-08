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
        <div>
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
                    className='mb-8 ml-10 rounded-xl border-2 border-[#008cff] px-4 py-1 text-lg font-bold text-[#008cff]'
                >
                    Add time
                </button>
            )}
        </div>
    );
}

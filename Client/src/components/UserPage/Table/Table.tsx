import { Project } from '../UserPage';
import SingleTableElement from './SingleTableElement';

interface TableProps {
    projects?: Project[];
}
export default function Table({ projects }: TableProps) {
    if (!projects) {
        return (
            <div>
                <p className='mt-20 text-center text-6xl font-bold'>Loading projects...</p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div>
                <p className='mt-20 text-center text-6xl font-bold'>No projects at the moment</p>
            </div>
        );
    }

    return (
        <>
            {/* ALL-PARTICIPATING-PROJECTS COMPONENT */}
            {/* TITLE */}
            <h1 className='mb-1 mt-20 text-center text-4xl font-bold'>
                All Participating Projects
            </h1>
            {/* TABLE */}
            <div className='mt-10 overflow-x-auto border border-gray-100 p-4 sm:p-6 lg:p-8'>
                {/* LABELS */}
                <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
                    <thead className='ltr:text-left rtl:text-right'>
                        <tr>
                            <th className='font-lg whitespace-nowrap py-2 text-gray-900'>
                                Project Name
                            </th>
                            <th className='font-lg whitespace-nowrap py-2 text-gray-900'>
                                Project Started
                            </th>
                            <th className='font-lg whitespace-nowrap py-2 text-gray-900'>
                                Worked Hours
                            </th>
                            <th className='font-lg whitespace-nowrap py-2 text-gray-900'>Salary</th>
                            <th className='px-4 py-2'></th>
                        </tr>
                    </thead>
                    {/* ALL PROJECTS */}
                    <tbody className='divide-y divide-gray-200 text-center'>
                        {projects.map((project) => (
                            <SingleTableElement key={project.id} data={project} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

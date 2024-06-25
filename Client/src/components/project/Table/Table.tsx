import SingleTableElement from './SingleTableElement';

import { User } from '@/shared/types';

interface TableProps {
    users?: User[];
}
export default function Table({ users }: TableProps) {
    if (!users) {
        return (
            <div>
                <p className='mt-20 text-center text-6xl font-bold'>Loading users...</p>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div>
                <p className='mt-20 text-center text-6xl font-bold'>No users on this project at the moment.</p>
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
                                User
                            </th>
                            <th className='font-lg whitespace-nowrap py-2 text-gray-900'>
                                Full Name
                            </th>
                            <th className='font-lg whitespace-nowrap py-2 text-gray-900'>
                                Type
                            </th>
                            <th className='font-lg whitespace-nowrap py-2 text-gray-900'>Description</th>
                            <th className='px-4 py-2'></th>
                        </tr>
                    </thead>
                    {/* ALL PROJECTS */}
                    <tbody className='divide-y divide-gray-200 text-center'>
                        {users.map((user) => (
                            <SingleTableElement key={user._id} data={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

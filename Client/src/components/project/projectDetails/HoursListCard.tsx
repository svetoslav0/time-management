import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import useFetchAllHoursByProject from '@/components/dashboard/employeeProjects/hooks/useFetchAllHoursByProject';
import cn from '@/util/cn';

export default function HoursListCard({ projectId }: { projectId: string }) {
    const { data: projectHours } = useFetchAllHoursByProject({ projectId });
    const navigate = useNavigate();

    return (
        <div className='mb-16  overflow-hidden rounded-2xl shadow-xl'>
            <p className='mb-4 text-center text-xl font-semibold'>Logged hours</p>
            <table className='w-full rounded-2xl border-none  border-customVeryLightBlue bg-customDarkBlue'>
                <thead className='text-left'>
                    <tr>
                        <th className='py-2 pl-6 text-base font-bold text-white'>Date</th>
                        <th className='py-2 text-base font-bold text-white'>Employee</th>
                        <th className='min-w-[500px] max-w-[700px] py-2 text-base font-bold text-white'>
                            Notes
                        </th>
                        <th className='whitespace-nowrap py-2 text-base font-bold text-white'>
                            Total hours
                        </th>
                    </tr>
                </thead>

                <tbody className='rounded-b-2xl bg-white shadow-loginFormShadow'>
                    {projectHours && projectHours.length > 0 ? (
                        projectHours.map((project, inx) => (
                            <tr
                                key={inx}
                                className={cn(
                                    inx % 2 === 0 ? 'bg-white' : 'bg-customGrey',
                                    'text-base font-medium text-customDarkBlue'
                                )}
                            >
                                <td className='w-36 py-2 pl-6'>
                                    {dayjs(project.date).format('DD.MM.YYYY')}
                                </td>
                                <td
                                    className='min-w-44 cursor-pointer pr-6'
                                    onClick={() => navigate(`/admin/users/${project.userId._id}`)}
                                >
                                    {project.userId.firstName} {project.userId.lastName}
                                </td>
                                <td className='min-w-[500px] max-w-[700px] overflow-hidden break-words pr-10'>
                                    {project.notes}
                                </td>
                                <td className='w-28'>{project.hours.toFixed(1)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className='py-4 text-center'>
                                There are no hours logged in
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

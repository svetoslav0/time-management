import dayjs from 'dayjs';

import useFetchAllHoursByProject from '@/components/dashboard/employeeProjects/hooks/useFetchAllHoursByProject';
import cn from '@/util/cn';

export default function HoursListCard({ projectId }: { projectId: string }) {
    const { data: projectHours } = useFetchAllHoursByProject({ projectId });
    console.log(projectHours)
    return (
        <div className='mb-16  shadow-xl rounded-2xl overflow-hidden'>
            <p className='text-xl mb-4 text-center font-semibold'>Logged hours</p>
            <table className='w-full rounded-2xl border-none  border-customVeryLightBlue bg-customDarkBlue'>
                <thead className='text-left'>
                    <tr>
                        <th className='py-2 pl-6 text-base font-bold text-white'>Date</th>
                        <th className='py-2 text-base font-bold text-white'>Employee</th>
                        <th className='py-2 text-base font-bold text-white min-w-[500px] max-w-[700px]'>Notes</th>
                        <th className='py-2 text-base font-bold text-white whitespace-nowrap'>Total hours</th>
                    </tr>
                </thead>

                <tbody className='bg-white shadow-loginFormShadow rounded-b-2xl'>
                    {projectHours && projectHours.length > 0 ? (
                        projectHours.map((project, inx) => (
                            <tr key={inx} className={cn(inx % 2 === 0 ? 'bg-white': 'bg-customGrey', 'text-base text-customDarkBlue font-medium')}>
                                <td className='py-2 pl-6 w-36'>
                                    {dayjs(project.date).format('DD.MM.YYYY')}
                                </td>
                                <td className='min-w-44 pr-6'>{project.userId.firstName} {project.userId.lastName}</td>
                                <td className='pr-10 overflow-hidden min-w-[500px] max-w-[700px] break-words'>{project.notes}</td>
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

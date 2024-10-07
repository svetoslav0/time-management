import dayjs from 'dayjs';
import { useState } from 'react';

import DeleteReport from './DeleteReport';

import useFetchGeneratedReports from '@/reactQuery/hooks/useFetchGeneratedReports';
import TrashSvg from '@/UI/design/TrashSvg';
import cn from '@/util/cn';

export default function GeneratedReports({ projectId }: { projectId: string }) {
    const { generatedReports } = useFetchGeneratedReports(projectId);

    const [deletedReport, setDeletedReport] = useState<{
        reportName: string | null;
        reportId: string | null;
    }>({
        reportName: null,
        reportId: null,
    });
    const [isModal, setIsModal] = useState(false);

    const onClose = () => {
        setIsModal(false);
        setDeletedReport({ reportId: null, reportName: null });
    };

    return (
        <div className='mb-16  overflow-hidden rounded-2xl shadow-xl'>
            <p className='mb-4 text-center text-xl font-semibold'>Generated reports</p>
            <table className='w-full rounded-2xl border-none  border-customVeryLightBlue bg-customDarkBlue'>
                <thead className='text-left'>
                    <tr>
                        <th className='py-2 pl-6 text-base font-bold text-white w-36'>From</th>
                        <th className='py-2 text-base font-bold text-white w-36'>To</th>
                        <th className='py-2 text-base font-bold text-white'>Name</th>
                        <th className='whitespace-nowrap py-2 text-base font-bold text-white w-14'></th>
                    </tr>
                </thead>
                <tbody className='rounded-b-2xl bg-white shadow-loginFormShadow'>
                    {generatedReports && generatedReports.reports.length > 0 ? (
                        generatedReports.reports.map((report, inx) => (
                            <tr
                                key={inx}
                                className={cn(
                                    inx % 2 === 0 ? 'bg-white' : 'bg-customGrey',
                                    'text-base font-medium text-customDarkBlue'
                                )}
                            >
                                <td className='w-36 py-2 pl-6'>
                                    {dayjs(report.createdAt).format('DD.MM.YYYY')}
                                </td>
                                <td className='w-36 pr-6'>
                                    {dayjs(report.endDate).format('DD.MM.YYYY')}
                                </td>
                                <td className='overflow-hidden break-words pr-10'>{report.name}</td>
                                <td className='w-14'>
                                    <button
                                        onClick={() => {
                                            setIsModal(true);
                                            setDeletedReport({
                                                reportId: report._id,
                                                reportName: report.name,
                                            });
                                        }}
                                    >
                                        <TrashSvg />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className='py-4 text-center'>
                                There are no generated reports in
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {deletedReport.reportId && deletedReport.reportName && (
                <DeleteReport
                    reportId={deletedReport.reportId}
                    reportName={deletedReport.reportName}
                    isOpen={isModal}
                    onClose={onClose}
                />
            )}
        </div>
    );
}

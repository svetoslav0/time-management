import dayjs from 'dayjs';
import { useState } from 'react';

import DeleteReport from './DeleteReport';

import useFetchGeneratedReports from '@/reactQuery/hooks/useFetchGeneratedReports';
import DownloadSvg from '@/UI/design/DownloadSvg';
import TrashSvg from '@/UI/design/TrashSvg';
import DownloadFile from '@/UI/DownloadFile';
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
    const [downloadReportId, setDownloadReportId] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = (reportId: string) => {
        if (!isDownloading) {
            setIsDownloading(true);
            setDownloadReportId(reportId);
        }
    };

    const onDownloadComplete = () => {
        setIsDownloading(false);
        setDownloadReportId(null);
    };

    const onClose = () => {
        setIsModal(false);
        setDeletedReport({ reportId: null, reportName: null });
    };

    return (
        <div className='mb-16 overflow-hidden rounded-2xl shadow-xl'>
            <p className='mb-4 text-center text-xl font-semibold'>Generated reports</p>
            <table className='w-full rounded-2xl border-none border-customVeryLightBlue bg-customDarkBlue'>
                <thead className='text-left'>
                    <tr>
                        <th className='w-36 py-2 pl-6 text-base font-bold text-white'>From</th>
                        <th className='w-36 py-2 text-base font-bold text-white'>To</th>
                        <th className='py-2 text-base font-bold text-white'>Name</th>
                        <th className='w-10 whitespace-nowrap py-2 text-base font-bold text-white'></th>
                        <th className='w-14 whitespace-nowrap py-2 text-base font-bold text-white'></th>
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
                                    {dayjs(report.startDate).format('DD.MM.YYYY')}
                                </td>
                                <td className='w-36 pr-6'>
                                    {dayjs(report.endDate).format('DD.MM.YYYY')}
                                </td>
                                <td className='overflow-hidden break-words pr-10'>{report.name}</td>
                                <td className='w-10'>
                                    <button onClick={() => handleDownload(report._id)}>
                                        <DownloadSvg color='black' />
                                    </button>
                                    {downloadReportId === report._id && (
                                        <DownloadFile
                                            projectId={report._id}
                                            onDownloadComplete={onDownloadComplete}
                                        />
                                    )}
                                </td>
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
                            <td colSpan={5} className='py-4 text-center'>
                                There are no generated reports
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

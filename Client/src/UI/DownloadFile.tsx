import { saveAs } from 'file-saver';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

import useGetReport from '@/reactQuery/hooks/useGetReport';

type DownloadFileProps = {
    projectId: string | undefined;
    onDownloadComplete: () => void;
};

export default function DownloadFile({ projectId, onDownloadComplete }: DownloadFileProps) {
    const { report, downloadError } = useGetReport(projectId);

    const downloadBlob = useCallback(
        (blob: Blob, filename: string) => {
            saveAs(blob, filename);
            onDownloadComplete();
        },
        [onDownloadComplete]
    );

    useEffect(() => {
        if (downloadError) {
            toast.error(downloadError.message);
            onDownloadComplete();
        }
    });

    useEffect(() => {
        if (report) {
            downloadBlob(report, `report_${projectId}.pdf`);
        }
    }, [report, projectId, downloadBlob]);

    return null;
}

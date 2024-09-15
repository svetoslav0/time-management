import { saveAs } from 'file-saver';
import { useEffect } from 'react';

import useGetReport from '@/reactQuery/hooks/useGetReport';

type DownloadFileProps = {
    projectId: string | undefined;
    setIsDownloading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DownloadFile({ projectId, setIsDownloading }: DownloadFileProps) {
    const { report } = useGetReport(projectId);

    const downloadBlob = (blob: Blob, filename: string) => {
        saveAs(blob, filename);
    };

    useEffect(() => {
        if (report) {
            downloadBlob(report, `report_${projectId}.pdf`);
        }
        setIsDownloading(false);
    }, [report, projectId, setIsDownloading]);

    return null;
}

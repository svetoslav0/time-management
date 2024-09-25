import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import mainLogo from '@/assets/timeManagementLogo.png';
import useFetchProjectByIdReport from '@/reactQuery/hooks/useFetchProjectByIdReport';
import DownloadSvg from '@/UI/design/DownloadSvg';
import GearSvg from '@/UI/design/GearSvg';
import DownloadFile from '@/UI/DownloadFile';
import { useLoginData } from '@/components/auth/AuthContext';

export default function CustomerProjectDetails() {
    const { loginData } = useLoginData();
    const navigate = useNavigate();
    const { id } = useParams<string>();
    const [isDownloading, setIsDownloading] = useState(false);
    const [shouldDownload, setShouldDownload] = useState(false);

    const { data: project } = useFetchProjectByIdReport(id!);

    const handleDownload = () => {
        if (!isDownloading) {
            setIsDownloading(true);
            setShouldDownload(true);
        }
    };

    const onDownloadComplete = () => {
        setIsDownloading(false);
        setShouldDownload(false);
    };

    const hours = project?.hours || [];

    useEffect(() => {
        if (!loginData) {
            navigate('/auth/login');
        }
    }, [loginData, navigate]);

    return (
        <div className='mb-20 flex flex-col items-center px-4'>
            <div className='fixed left-[-4rem] top-[40rem] -z-10'>
                <GearSvg />
            </div>
            <div className='fixed right-[-7rem] top-[10rem] -z-10'>
                <GearSvg />
            </div>
            <div className='-mt-4 flex items-center justify-around'>
                <img src={mainLogo} className='m-0 mr-[-75px] scale-35' />
                <h1 className='m-0 font-mavenPro text-5xl font-medium text-welcomeMsgColor'>
                    OpsHero
                </h1>
            </div>
            <div className='relative -mt-8 mb-8 w-3/4 font-medium text-customBlue'>
                <div className='flex'>
                    <p className='min-w-[150px]'>Employee Name:</p>
                    <span className='ml-2 text-customDarkBlue'>
                        {project?.projectData.employeeNames.join(', ')}
                    </span>
                </div>
                <div className='flex'>
                    <p className='min-w-[150px]'>Client Name:</p>
                    <span className='ml-2 text-customDarkBlue'>
                        {project?.projectData.customerNames}
                    </span>
                </div>
                <div className='flex'>
                    <p className='min-w-[150px]'>Project Name:</p>
                    <span className='ml-2 text-customDarkBlue'>
                        {project?.projectData.projectName}
                    </span>
                </div>
                <div className='flex'>
                    <p className='min-w-[150px]'>Price per hour:</p>
                    <span className='ml-2 text-customDarkBlue'>
                        ${project?.projectData.pricePerHours}
                    </span>
                </div>
                <div className='flex'>
                    <p className='min-w-[150px]'>Total price:</p>
                    <span className='ml-2 text-customDarkBlue'>${project?.totalPrice}</span>
                </div>
                <div className='flex'>
                    <p className='min-w-[150px]'>Total price:</p>
                    <span className='ml-2 text-customDarkBlue'>{project?.totalHours} hours</span>
                </div>
                <div className='absolute -top-4 right-4'>
                    <button
                        onClick={handleDownload}
                        type='button'
                        disabled={isDownloading || shouldDownload}
                    >
                        <span className='flex gap-1'>
                            <DownloadSvg color='#163851' />
                        </span>
                    </button>
                    {shouldDownload && (
                        <DownloadFile projectId={id} onDownloadComplete={onDownloadComplete} />
                    )}
                </div>
            </div>
            <div className='w-3/4 overflow-hidden rounded-2xl border shadow-lg'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-customBlue text-white'>
                            <th className='p-4 text-left'>Date</th>
                            <th className='w-3/5 p-4 text-left'>Task</th>
                            <th className='p-4 text-left'>Total hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map((row, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-customDarkTableGrey shadow-TrInsetShadow'} min-h-12`}
                            >
                                <td className='p-4 text-base font-bold text-welcomeMsgColor'>
                                    {row.date}
                                </td>
                                <td className='p-4 font-medium text-welcomeMsgColor text-hoursDescription'>
                                    {row.notes}
                                </td>
                                <td className='p-4 text-base font-bold text-welcomeMsgColor'>
                                    {row.hours.toFixed(1)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

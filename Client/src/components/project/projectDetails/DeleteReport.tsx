import { useEffect } from 'react';

import useDeleteReport from '../hooks/useDeleteReport';

import GearSvg from '@/UI/design/GearSvg';
import Modal from '@/UI/Modal';

export default function DeleteReport({
    reportName,
    reportId,
    isOpen,
    onClose,
}: {
    reportName: string;
    reportId: string;
    isOpen: boolean;
    onClose: () => void;
}) {
    const { deleteReportById, isDeletePending, isSuccessfullyDeleted } = useDeleteReport();

    useEffect(() => {
        if (isSuccessfullyDeleted) {
            onClose();
        }
    });

    return (
        <div>
            <Modal
                bgColor='bg-customDarkBlue'
                padding='p-0'
                rounded='rounded-[22px]'
                closeBtn={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className='relative flex h-[202px] w-[414px] flex-col items-center justify-evenly '>
                    {isDeletePending ? (
                        <div className='absolute'>
                            <div className='flex w-32 justify-center'>
                                <span className='relative flex h-20 w-20'>
                                    <span className='h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200'></span>
                                    <span className='absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-blue-500'></span>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className='max-w-[239px] text-center text-xl font-bold text-white'>
                                Are you sure you want to delete {reportName} report?
                            </p>
                            <div className='flex gap-16'>
                                <button
                                    onClick={() => deleteReportById({ id: reportId })}
                                    className='h-[32px] w-[67px] rounded-md bg-customBlue text-lg font-bold text-white'
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={onClose}
                                    className='h-[32px] w-[67px] rounded-md border border-customBlue text-lg font-bold text-white'
                                >
                                    No
                                </button>
                            </div>
                        </>
                    )}
                    <div className='absolute -left-9 bottom-2'>
                        <GearSvg width={67.55} height={71.95} />
                    </div>
                    <div className='absolute -right-[50px] top-2'>
                        <GearSvg width={99.64} height={106.12} />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

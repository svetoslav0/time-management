import { yupResolver } from '@hookform/resolvers/yup';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import useGenerateReport from '../hooks/useGenerateReport';
import GenerateReportCalendar from './GenerateReportCalendar';

import useFetchAllHoursByProject from '@/components/dashboard/employeeProjects/hooks/useFetchAllHoursByProject';
import { generateReportSchema } from '@/shared/formValidations';
import GearSvg from '@/UI/design/GearSvg';
import Modal from '@/UI/Modal';

type GenerateFormInputs = {
    name: string;
    startDate: Dayjs | '';
    endDate: Dayjs | '';
};

export default function GenerateReport({ projectId }: { projectId: string }) {
    const [showModal, setShowModal] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [selectedDates, setSelectedDates] = useState<{
        startDate: Dayjs | '';
        endDate: Dayjs | '';
    }>({
        startDate: '',
        endDate: '',
    });

    const currentDate = dayjs();
    const { generateReport, isGenerateSuccess, isGeneratePending } = useGenerateReport();
    const { data: projectHours } = useFetchAllHoursByProject({ projectId });

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
    } = useForm<GenerateFormInputs>({
        resolver: yupResolver(generateReportSchema),
    });

    const onReset = () => {
        reset();
        setSelectedDates({ startDate: '', endDate: '' });
    };

    useEffect(() => {
        if (isGenerateSuccess) {
            reset();
            setShowModal(false);
            setSelectedDates({ startDate: '', endDate: '' });
        }
    }, [isGenerateSuccess, reset]);

    const handleChangeDate = useCallback(
        (date: Dayjs) => {
            if (projectHours && projectHours.length === 1) {
                setSelectedDates({
                    startDate: date,
                    endDate: date,
                });
                setValue('startDate', date);
                setValue('endDate', date);
            } else {
                if (selectedDates.startDate !== '' && date.isSame(selectedDates.startDate)) {
                    setSelectedDates((prevDates) => ({
                        startDate: '',
                        endDate: prevDates.endDate,
                    }));
                    setValue('startDate', '');
                } else if (selectedDates.endDate !== '' && date.isSame(selectedDates.endDate)) {
                    setSelectedDates((prevDates) => ({
                        startDate: prevDates.startDate,
                        endDate: '',
                    }));
                    setValue('endDate', '');
                } else if (
                    selectedDates.startDate === '' ||
                    date.isBefore(selectedDates.startDate)
                ) {
                    setSelectedDates((prevDates) => ({
                        startDate: date,
                        endDate: prevDates.endDate,
                    }));
                    setValue('startDate', date);
                } else if (selectedDates.endDate === '' || date.isAfter(selectedDates.startDate)) {
                    setSelectedDates((prevDates) => ({
                        startDate: prevDates.startDate,
                        endDate: date,
                    }));
                    setValue('endDate', date);
                }
            }
        },
        [selectedDates, setValue, projectHours]
    );

    const onSubmit: SubmitHandler<GenerateFormInputs> = (data) => {
        const result = {
            projectId,
            name: data.name,
            startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
        };

        generateReport(result);
    };

    return (
        <>
            {projectHours && projectHours?.length > 0 && (
                <>
                    <button className='primaryBtn' onClick={() => setShowModal(true)}>
                        Generate report
                    </button>
                    <Modal
                        bgColor='bg-customDarkBlue'
                        padding='p-0'
                        rounded='rounded-[22px]'
                        isOpen={showModal}
                        closeBtn={false}
                        onClose={() => setShowModal(false)}
                    >
                        <div className='relative flex  w-[514px] flex-col items-center justify-evenly'>
                            <p className='mt-10 text-white'>Generate Report</p>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className='my-5 grid w-[300px] grid-cols-2 gap-4 text-white'
                            >
                                <input
                                    {...register('name')}
                                    type='text'
                                    className='col-span-2 bg-inherit outline-none'
                                    placeholder='Report name'
                                    autoComplete='off'
                                    onBlur={() => trigger('name')}
                                />

                                <input
                                    {...register('startDate')}
                                    readOnly
                                    type='text'
                                    className='bg-inherit'
                                    placeholder='Start date'
                                    onClick={() => setShowCalendarModal(true)}
                                    value={
                                        dayjs.isDayjs(selectedDates.startDate)
                                            ? selectedDates.startDate.format('DD/MM/YYYY')
                                            : ''
                                    }
                                />

                                <input
                                    {...register('endDate')}
                                    readOnly
                                    type='text'
                                    className='bg-inherit'
                                    placeholder='End date'
                                    onClick={() => setShowCalendarModal(true)}
                                    value={
                                        dayjs.isDayjs(selectedDates.endDate)
                                            ? selectedDates.endDate.format('DD/MM/YYYY')
                                            : ''
                                    }
                                />
                                {errors.name && (
                                    <p className='col-span-2 text-sm text-customRed'>
                                        {errors.name.message}
                                    </p>
                                )}
                                {errors.startDate && (
                                    <p className='col-span-2 text-sm text-customRed'>
                                        {errors.startDate.message}
                                    </p>
                                )}
                                {errors.endDate && (
                                    <p className='col-span-2 text-sm text-customRed'>
                                        {errors.endDate.message}
                                    </p>
                                )}

                                <button
                                    className='rounded-md border border-customBlue text-lg font-bold text-white'
                                    type='button'
                                    onClick={() => {
                                        setShowModal(false);
                                        onReset();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='rounded-md bg-customBlue text-lg font-bold text-white'
                                >
                                    Submit
                                </button>

                                <Modal
                                    onClose={() => setShowCalendarModal(false)}
                                    isOpen={showCalendarModal}
                                    bgColor='bg-customDarkBlue'
                                    closeBtn={false}
                                >
                                    <GenerateReportCalendar
                                        projectHours={projectHours}
                                        changeDate={handleChangeDate}
                                        selectedDates={selectedDates}
                                        currentDate={currentDate}
                                    />
                                    <button
                                        className='my-4 rounded-md bg-customBlue px-4 py-1 text-lg font-bold text-white'
                                        onClick={() => setShowCalendarModal(false)}
                                    >
                                        Confirm
                                    </button>
                                </Modal>
                            </form>
                            <div className='absolute -left-9 bottom-2'>
                                <GearSvg width={67.55} height={71.95} />
                            </div>
                            <div className='absolute -right-[50px] top-2'>
                                <GearSvg width={99.64} height={106.12} />
                            </div>
                            {isGeneratePending && (
                                <div className='absolute left-[200px] top-[50px]'>
                                    <div className='absolute z-50'>
                                        <div className='flex w-32 justify-center'>
                                            <span className='relative flex h-20 w-20'>
                                                <span className='h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200'></span>
                                                <span className='absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-blue-500'></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
}

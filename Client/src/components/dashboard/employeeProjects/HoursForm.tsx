import { yupResolver } from '@hookform/resolvers/yup';
import { useMutationState } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { LuClipboardEdit } from 'react-icons/lu';

import useAddHours from './hooks/useAddHours';
import useDeleteHours from './hooks/useDeleteHours';
import useUpdateProjectHours from './hooks/useUpdateProjectHours';
import { HoursResponseData, UpdateHoursData } from './types';

import { useLoginData } from '@/components/auth/AuthContext';
import Calendar from '@/components/projectForm/Calendar';
import { hoursFormSchema } from '@/shared/formValidations';
import Modal from '@/UI/Modal';
import cn from '@/util/cn';

type HoursFormProps =
    | { action: 'create'; onCancel: () => void; projectId: string }
    | { action: 'edit'; projectId: string; dateData: HoursResponseData };

type FormInputs = {
    date: string;
    hours: number;
    notes: string;
};

export default function HoursForm(props: HoursFormProps) {
    const { addHours } = useAddHours();
    const { updateHours, isSuccess } = useUpdateProjectHours();
    const { deletedHour } = useDeleteHours();
    const [isDeleting, setIsDeleting] = useState(false);
    const currentDate = dayjs();
    const [selectedDate, setSelectedDate] = useState<Dayjs | string>('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [edit, setEdit] = useState(false);

    const { loginResponseData } = useLoginData();

    let isTimeOwner = false;

    if (props.action === 'edit') {
        isTimeOwner = loginResponseData?._id === props.dateData.userId._id;
    }

    const pendingData = useMutationState({
        filters: { mutationKey: ['update-hours'], status: 'pending' },
        select: (mutation) => {
            return mutation.state.variables as UpdateHoursData;
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: yupResolver(hoursFormSchema),
    });

    useEffect(() => {
        if (props.action === 'edit' && !edit) {
            if (!pendingData.length && !isSuccess) {
                const parsedDate = dayjs(props.dateData.date);
                setSelectedDate(parsedDate);
                setValue('date', parsedDate.format('YYYY-MM-DD'));
                setValue('hours', props.dateData.hours);
                setValue('notes', props.dateData.notes);
            } else if (pendingData.length && pendingData[0]._id === props.dateData._id) {
                const date = dayjs(pendingData[0].date);
                setValue('date', date.format('YYYY-MM-DD'));
                setValue('hours', pendingData[0].hours);
                setValue('notes', pendingData[0].notes);
            }
        }
    }, [props, edit, setValue, pendingData, isSuccess]);

    useEffect(() => {
        if (errors.date && errors.hours?.message === 'Please add time' && errors.notes) {
            setError('root', { type: 'manual', message: 'All fields are required' });
        } else {
            const errorMessages = Object.values(errors)
                .filter((error) => error?.message && error !== errors.root)
                .map((error) => error.message)
                .join(', ');

            if (errorMessages) {
                setError('root', { type: 'manual', message: errorMessages });
            } else {
                clearErrors('root');
            }
        }
    }, [errors.date, errors.hours, errors.notes, errors, setError, clearErrors]);

    const onSubmit: SubmitHandler<{ date: string; hours: number; notes: string }> = (data) => {
        if (props.action === 'create') {
            addHours({ ...data, projectId: props.projectId });
            props.onCancel();
        } else {
            updateHours({ ...data, projectId: props.projectId, _id: props.dateData._id });
            setEdit(false);
        }
    };

    const handleChangeDate = useCallback(
        (date: Dayjs) => {
            setSelectedDate(date);
            setValue('date', date.format('YYYY-MM-DD'));
            setShowCalendar(false);
            clearErrors('date');
        },
        [setValue, clearErrors]
    );

    return (
        <div className={cn(props.action === 'create' ? 'bg-[#F0F0F0]' : 'bg-[#fcfcfc]')}>
            {errors && <p className='mx-6 text-red-600'>{errors.root?.message}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className='mx-6 mb-8 grid grid-cols-6'>
                <input
                    type='text'
                    className='w-32 bg-transparent outline-none'
                    {...register('date')}
                    value={
                        dayjs.isDayjs(selectedDate)
                            ? selectedDate.format('YYYY-MM-DD')
                            : selectedDate
                    }
                    placeholder='Choose date'
                    onClick={() => setShowCalendar(true)}
                    readOnly
                />
                <div>
                    <input
                        readOnly={props.action === 'edit' && !edit}
                        type='number'
                        step='0.5'
                        min={0.5}
                        max={8}
                        className={cn(
                            props.action === 'edit' ? 'w-12 text-right' : 'w-28',
                            ' bg-transparent text-left outline-none',
                            errors.hours?.message ? 'border-2 border-red-500' : ''
                        )}
                        {...register('hours')}
                        placeholder='Add hours'
                    />
                    {props.action === 'edit' && <span>hours</span>}
                </div>
                {props.action === 'edit' && !isTimeOwner ? (
                    <p className='text-base font-semibold text-customDarkBlue'>
                        {props.dateData.userId.email}
                    </p>
                ) : (
                    <p></p>
                )}
                <input
                    readOnly={props.action === 'edit' && !edit}
                    type='text'
                    className='w-48 bg-transparent outline-none'
                    {...register('notes')}
                    placeholder='Add notes'
                />

                {showCalendar && (
                    <Modal isOpen={showCalendar} onClose={() => setShowCalendar(false)}>
                        <Calendar
                            changeDate={handleChangeDate}
                            currentDate={currentDate}
                            selectedDate={selectedDate}
                        />
                    </Modal>
                )}

                {isDeleting && props.action === 'edit' ? (
                    <div className='col-span-2 flex justify-end'>
                        <button
                            className='h-7 w-20 rounded-lg bg-red-400 text-center text-base font-extrabold text-white'
                            onClick={() => {
                                if (props.dateData) {
                                    deletedHour(props.dateData);
                                    setIsDeleting(false);
                                }
                            }}
                        >
                            Delete?
                        </button>
                    </div>
                ) : (
                    <div className='col-span-2 flex justify-end'>
                        {props.action === 'edit' && isTimeOwner && !edit && (
                            <>
                                <button
                                    type='button'
                                    className='mr-2 h-6 w-6'
                                    onClick={() => setEdit(true)}
                                >
                                    <LuClipboardEdit size='100%' />
                                </button>
                                <button
                                    type='button'
                                    className='mr-4 h-6 w-6'
                                    onClick={() => setIsDeleting(true)}
                                >
                                    <FaTrash size='100%' color='red' />
                                </button>
                            </>
                        )}
                        {props.action === 'edit' && edit && (
                            <>
                                <button
                                    type='button'
                                    onClick={() => setEdit(false)}
                                    className='mr-4 rounded-xl border-2 border-[#163851] px-3 py-0.5 text-lg font-bold text-[#163851]'
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        {props.action === 'create' && (
                            <button
                                type='button'
                                onClick={props.onCancel}
                                className='mr-4 rounded-xl border-2 border-[#163851] px-3 py-0.5 text-lg font-bold text-[#163851]'
                            >
                                Cancel
                            </button>
                        )}
                        {(props.action === 'create' || edit) && (
                            <button
                                type='submit'
                                className='mr-4 rounded-xl border-2 border-[#008cff] bg-[#008cff] px-5 py-0.5 text-lg font-bold text-white'
                            >
                                Save
                            </button>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutationState } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import useAddHours from './hooks/useAddHours';
import useDeleteHours from './hooks/useDeleteHours';
import useUpdateProjectHours from './hooks/useUpdateProjectHours';
import { HoursResponseData, UpdateHoursData } from './types';

import { useLoginData } from '@/components/auth/AuthContext';
import Calendar from '@/components/projectForm/Calendar';
import { hoursFormSchema } from '@/shared/formValidations';
import ClipboardEditSvg from '@/UI/design/ClipboardEditSvg';
import PolygonSvg from '@/UI/design/PolygonSvg';
import TrashSvg from '@/UI/design/TrashSvg';
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
    const [isEdit, setIsEdit] = useState(false);

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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
        getValues,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: yupResolver(hoursFormSchema),
    });

    const { ref, ...restNotes } = register('notes');

    useEffect(() => {
        if (props.action === 'edit' && !isEdit) {
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
    }, [props, isEdit, setValue, pendingData, isSuccess]);

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
            setIsEdit(false);
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
        <div>
            {errors && <p className='mx-6 text-red-600'>{errors.root?.message}</p>}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={cn(
                    'min-h-11 grid grid-cols-[130px_130px_280px_484px_1fr] items-center pl-8 pr-6 mb-3.5 text-base font-semibold text-customDarkBlue',
                    (isEdit || isDeleting )&& 'bg-customDarkWhite'
                )}
            >
                <input
                    type='text'
                    className='bg-transparent outline-none'
                    {...register('date')}
                    value={
                        dayjs.isDayjs(selectedDate) ? selectedDate.format('DD.MM.YY') : selectedDate
                    }
                    placeholder='Choose date'
                    onClick={() => setShowCalendar(true)}
                    readOnly
                />
                <div className='relative flex'>
                    <input
                        readOnly={props.action === 'edit' && !isEdit}
                        type={isEdit ? 'number' : 'text'}
                        step='0.5'
                        min={0.5}
                        max={8}
                        className={cn(
                            isEdit ? 'w-10' : 'w-7',
                            ' relative bg-transparent outline-none',
                            errors.hours?.message ? 'border-2 border-customRed' : ''
                        )}
                        {...register('hours')}
                        placeholder='Add hours'
                    />
                    {props.action === 'edit' && !isEdit ? (
                        <span>hours</span>
                    ) : (
                        <div className='absolute left-7 -top-1.5'>
                            <button
                                type='button'
                                className='my-1 flex'
                                onClick={() => {
                                    const hours = getValues('hours') as unknown as string;
                                    let currentValue = parseFloat(hours) || 0;
                                    if (
                                        typeof currentValue === 'number' &&
                                        !isNaN(currentValue) &&
                                        currentValue < 8
                                    ) {
                                        currentValue += 0.5;
                                        setValue('hours', parseFloat(currentValue.toFixed(1)));
                                    }
                                }}
                            >
                                <PolygonSvg />
                            </button>
                            <button
                                type='button'
                                className='my-0.5 flex rotate-180'
                                onClick={() => {
                                    const hours = getValues('hours') as unknown as string;
                                    let currentValue = parseFloat(hours) || 0;
                                    if (
                                        typeof currentValue === 'number' &&
                                        !isNaN(currentValue) &&
                                        currentValue > 0
                                    ) {
                                        currentValue -= 0.5;
                                        setValue('hours', parseFloat(currentValue.toFixed(1)));
                                    }
                                }}
                            >
                                <PolygonSvg />
                            </button>
                        </div>
                    )}
                </div>
                {props.action === 'edit' && !isTimeOwner ? (
                    <p className='text-base font-semibold text-customDarkBlue'>
                        {props.dateData.userId.email}
                    </p>
                ) : (
                    <p></p>
                )}
                <textarea
                    ref={(e) => {
                        ref(e);
                        textAreaRef.current = e;
                        if (e) {
                            // Resize on load
                            e.style.height = 'auto';
                            e.style.height = `${e.scrollHeight}px`;
                        }
                    }}
                    rows={1}
                    readOnly={props.action === 'edit' && !isEdit}
                    className='max-h-20 w-96 resize-none bg-transparent px-4  text-sm font-medium outline-none'
                    placeholder='Add notes'
                    {...restNotes}
                    onChange={(e) => {
                        // Resize when we add new text
                        e.currentTarget.style.height = 'auto';
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    }}
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
                    <div className='col-span-1 flex justify-end gap-[14px]'>
                        <button
                            type='button'
                            onClick={() => setIsDeleting(false)}
                            className='employeeProjectBtn border-[1px] border-customDarkBlue text-customDarkBlue'
                        >
                            Cancel
                        </button>
                        <button
                            className='employeeProjectBtn bg-customRed  text-white'
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
                    <div className='col-span-1 flex justify-end gap-[14px]'>
                        {props.action === 'edit' && isTimeOwner && !isEdit && (
                            <>
                                <button
                                    type='button'

                                    onClick={() => setIsEdit(true)}
                                >
                                    <ClipboardEditSvg />
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setIsDeleting(true)}
                                >
                                    <TrashSvg />
                                </button>
                            </>
                        )}
                        {props.action === 'edit' && isEdit && (
                            <>
                                <button
                                    type='button'
                                    onClick={() => setIsEdit(false)}
                                    className='employeeProjectBtn border-[1px] border-customDarkBlue text-customDarkBlue'
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        {props.action === 'create' && (
                            <button
                                type='button'
                                onClick={props.onCancel}
                                className='employeeProjectBtn border-[1px] border-customDarkBlue text-customDarkBlue'
                            >
                                Cancel
                            </button>
                        )}
                        {(props.action === 'create' || isEdit) && (
                            <button
                                type='submit'
                                className='employeeProjectBtn bg-customBlue text-white'
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

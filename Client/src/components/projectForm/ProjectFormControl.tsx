import { yupResolver } from '@hookform/resolvers/yup';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useCallback, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate,  } from 'react-router-dom';

import { projectFormSchema } from '../../shared/formValidations';
import InputComponent from '../../UI/formComponents/InputComponent';
import cn from '../../util/cn';
import Calendar from './Calendar';
import EmailInvite from './EmailInvite';
import useProjectCreate from './hooks/useProjectCreate';

import MultiSelector from './MultiSelector';

import useFetchUsers from '@/reactQuery/hooks/useFetchUsers';
import { ProjectDataType } from '@/shared/types';

dayjs.extend(customParseFormat);

export default function ProjectFormControl() {
    const { data: employeeResponse } = useFetchUsers({ userRole: 'employee', status: 'active' });
    const { data: customerResponse } = useFetchUsers({ userRole: 'customer', status: 'active' });
    const [projectName, setProjectName] = useState('');
    const [pricePerHour, setPricePerHour] = useState<number | string>('');
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<string[]>([]);
    const [inviteEmails, setInviteEmails] = useState<string[]>([]);
    const currentDate = dayjs();
    const [selectedDate, setSelectedDate] = useState<Dayjs | string>('');
    const [showCalendar, setShowCalendar] = useState(false);
    const { createProject } = useProjectCreate();
    const navigate = useNavigate();

    const methods = useForm<ProjectDataType>({
        resolver: yupResolver(projectFormSchema),
    });

    const {
        handleSubmit,
        reset,
        formState: { errors },
        register,
        trigger,
        setValue,
    } = methods;

    const onSubmit: SubmitHandler<ProjectDataType> = async (data) => {
        createProject(data);
        reset();
        setInviteEmails([]);
        setSelectedEmployees([]);
        setSelectedCustomer([]);
        setPricePerHour('');
        setProjectName('');
        setSelectedDate('');
        navigate('/admin/projects')
    };


    const handleChangeDate = useCallback((date: Dayjs) => {
        setSelectedDate(date);
        setShowCalendar((prev) => !prev);
    }, []);

    const handleShowCalendar = () => {
        setShowCalendar((prev) => !prev);
    };

    return (
        <>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='m-auto w-2/4 rounded-md border-2 border-gray-900/10 dark:border-gray-50 dark:bg-gray-900'
                    >
                        <div className='m-10 grid grid-cols-2 gap-10 space-y-12'>
                            <h1 className='col-span-2 text-center text-4xl font-semibold capitalize text-gray-900 dark:text-gray-50'>
                                Create New Project
                            </h1>
                            <InputComponent
                                error={errors.projectName?.message}
                                register={register}
                                trigger={trigger}
                                field='projectName'
                                value={projectName}
                                onChange={(e) => {
                                    setValue('projectName', e.currentTarget.value);
                                    setProjectName(e.currentTarget.value);
                                }}
                            />
                            <InputComponent
                                error={errors.pricePerHour?.message}
                                register={register}
                                trigger={trigger}
                                field='pricePerHour'
                                type='number'
                                value={pricePerHour}
                                onChange={(e) => {
                                    setValue('pricePerHour', Number(e.currentTarget.value));
                                    setPricePerHour(Number(e.currentTarget.value));
                                }}
                                min={0}
                            />
                            <MultiSelector
                                error={errors.customerIds?.message}
                                usersList={customerResponse}
                                selectedUsers={selectedCustomer}
                                setSelectedUsers={setSelectedCustomer}
                                field='customerIds'
                                placeholder='Customers'
                            />
                            <div className='relative'>
                                <input
                                    type='date'
                                    readOnly
                                    {...register('startingDate')}
                                    value={
                                        dayjs.isDayjs(selectedDate)
                                            ? selectedDate.format('YYYY-MM-DD')
                                            : selectedDate
                                    }
                                    onClick={handleShowCalendar}
                                    className={cn(
                                        errors.startingDate
                                            ? 'border-red-500 dark:border-red-500'
                                            : 'border-gray-300',
                                        selectedDate === ''
                                            ? 'text-gray-400 dark:text-gray-400'
                                            : '',
                                        `block w-full rounded-lg border  bg-gray-50 p-2.5 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
                                         dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`
                                    )}
                                />
                                {errors.startingDate && (
                                    <span
                                        role='alert'
                                        className='text-sm text-red-500 dark:text-red-400'
                                    >
                                        {errors.startingDate?.message}
                                    </span>
                                )}

                                {showCalendar && (
                                    <div className='absolute z-10 mt-4 rounded-md border-2 border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-600'>
                                        <Calendar
                                            changeDate={handleChangeDate}
                                            selectedDate={selectedDate}
                                            currentDate={currentDate}
                                        />
                                    </div>
                                )}
                            </div>

                            <MultiSelector
                                error={errors.employeeIds?.message}
                                usersList={employeeResponse}
                                selectedUsers={selectedEmployees}
                                setSelectedUsers={setSelectedEmployees}
                                field='employeeIds'
                                placeholder='Employees'
                            />

                            <EmailInvite
                                error={errors.inviteEmails?.message}
                                inviteEmails={inviteEmails}
                                setInviteEmails={setInviteEmails}
                                field='inviteEmails'
                                placeholder='Invite emails'
                            />
                        </div>
                        <div className='flex w-full justify-center'>
                            <button
                                className=' mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium
                                 text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800'
                                type='submit'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </FormProvider>
        </>
    );
}

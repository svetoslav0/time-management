import { yupResolver } from '@hookform/resolvers/yup';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { projectFormSchema } from '../../shared/formValidations';
import InputComponent from '../../UI/formComponents/InputComponent';
import cn from '../../util/cn';
import Calendar from './Calendar';
import EmailInvite from './EmailInvite';
import useProjectCreate from './hooks/useProjectCreate';
import MultiSelector from './MultiSelector';
import { ProjectFormDataType } from './types';

import useFetchUsers from '@/reactQuery/hooks/useFetchUsers';
import LogoSvg from '@/UI/design/LogoSvg';

dayjs.extend(customParseFormat);
const initialPrices: {
    pricePerHourForArchitect: number | string;
    pricePerHourForJunior: number | string;
    pricePerHourForMid: number | string;
    pricePerHourForSenior: number | string;
} = {
    pricePerHourForArchitect: '',
    pricePerHourForJunior: '',
    pricePerHourForMid: '',
    pricePerHourForSenior: '',
};

export default function ProjectFormControl() {
    const { data: employeeResponse } = useFetchUsers({ userRole: 'employee', status: 'active' });
    const { data: customerResponse } = useFetchUsers({ userRole: 'customer', status: 'active' });
    const [projectName, setProjectName] = useState('');
    const [pricePerHour, setPricePerHour] = useState(initialPrices);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<string[]>([]);
    const [inviteEmails, setInviteEmails] = useState<string[]>([]);
    const currentDate = dayjs();
    const [selectedDate, setSelectedDate] = useState<Dayjs | string>('');
    const [showCalendar, setShowCalendar] = useState(false);
    const { createProject } = useProjectCreate();
    const navigate = useNavigate();

    const methods = useForm<ProjectFormDataType>({
        resolver: yupResolver(projectFormSchema),
    });

    const {
        handleSubmit,
        reset,
        formState: { errors },
        register,
        trigger,
        setValue,
        clearErrors,
        setError,
    } = methods;

    const onSubmit: SubmitHandler<ProjectFormDataType> = async (data) => {
        createProject(data);
        reset();
        setInviteEmails([]);
        setSelectedEmployees([]);
        setSelectedCustomer([]);
        setPricePerHour(initialPrices);
        setProjectName('');
        setSelectedDate('');
        navigate('/admin/projects');
    };

    const handleChangeDate = useCallback((date: Dayjs) => {
        setSelectedDate(date);
        setShowCalendar((prev) => !prev);
    }, []);

    const handleShowCalendar = () => {
        setShowCalendar((prev) => !prev);
    };

    useEffect(() => {
        setValue('employeeIds', selectedEmployees);
        setValue('inviteEmails', inviteEmails);
        setValue('customerIds', selectedCustomer);
        if (dayjs.isDayjs(selectedDate) && selectedDate.isValid()) {
            setValue('startingDate', selectedDate.format('YYYY-MM-DD'));
        }
    }, [selectedEmployees, inviteEmails, selectedCustomer, selectedDate, setValue]);

    useEffect(() => {
        if (dayjs.isDayjs(selectedDate) && selectedDate.isValid()) {
            setValue('startingDate', selectedDate.format('YYYY-MM-DD'));
            clearErrors('startingDate');
        }
    }, [selectedDate, setValue, clearErrors]);

    const errorMessages = Object.values(errors)
        .map((error) => error?.message)
        .filter(Boolean);

    return (
        <div>
            <div className='z-10 mt-7  flex justify-center'>
                <LogoSvg />
            </div>
            <p className='my-16 text-center text-base font-semibold text-customDarkBlue'>
                Welcome to your time management hero.
            </p>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='m-auto w-2/4 rounded-2xl border  bg-white shadow-2xl backdrop-blur-[13.50px]'
                >
                    <div className='m-10 mb-3 grid grid-cols-2 gap-x-3.5 gap-y-5'>
                        <h1 className='col-span-2 text-center text-2xl font-semibold capitalize text-customDarkBlue'>
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
                            showLabel={false}
                            triggerError={false}
                        />
                        <div className='relative mt-3'>
                            <input
                                type='text'
                                placeholder='Date'
                                readOnly
                                {...register('startingDate')}
                                value={
                                    dayjs.isDayjs(selectedDate)
                                        ? selectedDate.format('DD/MM/YYYY')
                                        : selectedDate
                                }
                                onClick={handleShowCalendar}
                                onBlur={() => {
                                    if (!selectedDate) {
                                        setError('startingDate', { message: 'Please select date' });
                                    }
                                }}
                                className={cn(
                                    errors.startingDate ? 'border-customRed' : 'border-customBlue',
                                    selectedDate === '' ? 'text-customDarkBlue' : '',
                                    'focus:customBlue block w-full rounded-xl   border p-2.5  text-sm focus:outline-none focus:ring-red-500'
                                )}
                            />
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
                        <InputComponent
                            error={errors.pricePerHourForJunior?.message}
                            register={register}
                            trigger={trigger}
                            field='pricePerHourForJunior'
                            placeholder='Price per hour for Junior-level'
                            type='number'
                            value={pricePerHour.pricePerHourForJunior ?? ''}
                            onChange={(e) => {
                                setValue('pricePerHourForJunior', Number(e.target.value));
                                setPricePerHour((prevPrices) => ({
                                    ...prevPrices,
                                    pricePerHourForJunior: Number(e.target.value),
                                }));
                            }}
                            min={0}
                            showLabel={false}
                            triggerError={false}
                        />
                        <InputComponent
                            error={errors.pricePerHourForMid?.message}
                            register={register}
                            trigger={trigger}
                            field='pricePerHourForMid'
                            type='number'
                            placeholder='Price per hour for Mid-level'
                            value={pricePerHour.pricePerHourForMid ?? ''}
                            onChange={(e) => {
                                setValue('pricePerHourForMid', Number(e.target.value));
                                setPricePerHour((prevPrices) => ({
                                    ...prevPrices,
                                    pricePerHourForMid: Number(e.target.value),
                                }));
                            }}
                            min={0}
                            showLabel={false}
                            triggerError={false}
                        />
                        <InputComponent
                            error={errors.pricePerHourForSenior?.message}
                            register={register}
                            trigger={trigger}
                            field='pricePerHourForSenior'
                            type='number'
                            placeholder='Price per hour for Senior-level'
                            value={pricePerHour.pricePerHourForSenior ?? ''}
                            onChange={(e) => {
                                setValue('pricePerHourForSenior', Number(e.target.value));
                                setPricePerHour((prevPrices) => ({
                                    ...prevPrices,
                                    pricePerHourForSenior: Number(e.target.value),
                                }));
                            }}
                            min={0}
                            showLabel={false}
                            triggerError={false}
                        />
                        <InputComponent
                            error={errors.pricePerHourForArchitect?.message}
                            register={register}
                            trigger={trigger}
                            field='pricePerHourForArchitect'
                            type='number'
                            placeholder='Price per hour for Architect-level'
                            value={pricePerHour.pricePerHourForArchitect ?? ''}
                            onChange={(e) => {
                                setValue('pricePerHourForArchitect', Number(e.target.value));
                                setPricePerHour((prevPrices) => ({
                                    ...prevPrices,
                                    pricePerHourForArchitect: Number(e.target.value),
                                }));
                            }}
                            min={0}
                            showLabel={false}
                            triggerError={false}
                        />
                        <MultiSelector
                            error={errors.customerIds?.message}
                            usersList={customerResponse}
                            selectedUsers={selectedCustomer}
                            setSelectedUsers={setSelectedCustomer}
                            field='customerIds'
                            placeholder='Customers'
                            setError={setError}
                            clearErrors={clearErrors}
                            selectedError={
                                selectedCustomer.length > 0 ? selectedCustomer : inviteEmails
                            }
                            handleError={false}
                        />

                        <MultiSelector
                            error={errors.employeeIds?.message}
                            usersList={employeeResponse}
                            selectedUsers={selectedEmployees}
                            setSelectedUsers={setSelectedEmployees}
                            field='employeeIds'
                            placeholder='Employees'
                            setError={setError}
                            clearErrors={clearErrors}
                            selectedError={selectedEmployees}
                        />
                        <div className='col-span-2 flex items-center justify-center'>
                            <div className='w-20  border-t border-gray-400'></div>
                            <span className='mx-4 text-gray-500'>or</span>
                            <div className='w-20 border-t border-gray-400'></div>
                        </div>

                        <div className='col-span-2'>
                            <EmailInvite
                                inviteEmails={inviteEmails}
                                setInviteEmails={setInviteEmails}
                                field='inviteEmails'
                                placeholder='Invite customers via email'
                            />
                        </div>
                    </div>
                    <div className='mb-4 ml-12 text-xs font-medium text-customRed'>
                        {errorMessages &&
                            errorMessages.map((errorMessage, inx) => (
                                <p key={inx}>{errorMessage}*</p>
                            ))}
                    </div>
                    <div className='mb-11 flex w-full justify-center'>
                        <button
                            className='rounded-lg bg-customBlue px-14 py-2 text-base font-bold text-white '
                            type='submit'
                        >
                            Create
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

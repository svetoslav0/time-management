import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import useUpdateProject from '../hooks/useUpdateProject';

import { changePricesSchema } from '@/shared/formValidations';
import { ProjectResponseDataType } from '@/shared/types';
import EditPenSvg from '@/UI/design/EditPenSvg';
import cn from '@/util/cn';

type FormInputData = {
    pricePerHourForJunior: number;
    pricePerHourForMid: number;
    pricePerHourForSenior: number;
    pricePerHourForArchitect: number;
};

type EditHoursFormProps = {
    project: ProjectResponseDataType;
};

export default function EditHoursForm({ project }: EditHoursFormProps) {
    const [edit, setEdit] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const defaultValues = {
        pricePerHourForArchitect: project.pricePerHourForArchitect,
        pricePerHourForJunior: project.pricePerHourForJunior,
        pricePerHourForMid: project.pricePerHourForMid,
        pricePerHourForSenior: project.pricePerHourForSenior,
    };

    const { updateProject, isSuccess } = useUpdateProject(project._id);

    useEffect(() => {
        if (isChanged && isSuccess) {
            setIsChanged(false);
            setEdit(false);
        }
    }, [isChanged, isSuccess]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormInputData>({
        resolver: yupResolver(changePricesSchema),
        defaultValues: defaultValues,
    });

    const onCancel = () => {
        setEdit(false);
        reset();
    };

    const onSubmit: SubmitHandler<FormInputData> = async (formData) => {
        const newProjectData: ProjectResponseDataType = {
            ...project,
            ...formData,
            startingDate: dayjs(project.startingDate).format('YYYY-MM-DD'),
        };
        setIsChanged(true);
        updateProject(newProjectData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='relative flex items-center gap-1'>
                <label htmlFor='pricePerHourForJunior' className='mr-2'>
                    Price per hour for Junior-level:
                </label>
                <div className='flex'>
                    <p className='mr-0.5'>$</p>
                    <p className={cn(edit ? 'hidden' : 'block')}>{project.pricePerHourForJunior}</p>
                    <input
                        type='number'
                        step={0.05}
                        className={cn(
                            edit ? 'opacity-100' : 'hidden opacity-0',
                            'w-14 border-b border-b-customDarkGray outline-none'
                        )}
                        {...register('pricePerHourForJunior')}
                    />
                    <p>/h</p>
                    <button
                        type='button'
                        className={cn(
                            edit
                                ? 'pointer-events-none opacity-0'
                                : 'pointer-events-auto opacity-100',
                            'ml-2 transition-all duration-300'
                        )}
                        onClick={() => setEdit(true)}
                    >
                        <EditPenSvg />
                    </button>
                </div>
            </div>
            <div className='relative flex items-center gap-1'>
                <label htmlFor='pricePerHourForMid' className='mr-2'>
                    Price per hour for Mid-level:
                </label>
                <div className='flex'>
                    <p className='mr-0.5'>$</p>
                    <p className={cn(edit ? 'hidden' : 'block')}>{project.pricePerHourForMid}</p>
                    <input
                        type='number'
                        step={0.05}
                        className={cn(
                            edit ? 'opacity-100' : 'hidden opacity-0',
                            'w-14 border-b border-b-customDarkGray outline-none'
                        )}
                        {...register('pricePerHourForMid')}
                    />
                    <p>/h</p>
                    <button
                        type='button'
                        className={cn(
                            edit
                                ? 'pointer-events-none opacity-0'
                                : 'pointer-events-auto opacity-100',
                            'ml-2 transition-all duration-300'
                        )}
                        onClick={() => setEdit(true)}
                    >
                        <EditPenSvg />
                    </button>
                </div>
            </div>
            <div className='relative flex items-center gap-1'>
                <label htmlFor='pricePerHourForSenior'>Price per hour for Senior-level:</label>
                <div className='flex'>
                    <p className='mr-0.5'>$</p>
                    <p className={cn(edit ? 'hidden' : 'block')}>{project.pricePerHourForSenior}</p>
                    <input
                        type='number'
                        step={0.05}
                        className={cn(
                            edit ? 'opacity-100' : 'hidden opacity-0',
                            'w-14 border-b border-b-customDarkGray outline-none'
                        )}
                        {...register('pricePerHourForSenior')}
                    />
                    <p>/h</p>
                    <button
                        type='button'
                        className={cn(
                            edit
                                ? 'pointer-events-none opacity-0'
                                : 'pointer-events-auto opacity-100',
                            'ml-2 transition-all duration-300'
                        )}
                        onClick={() => setEdit(true)}
                    >
                        <EditPenSvg />
                    </button>
                </div>
            </div>
            <div className='relative flex items-center gap-1'>
                <label htmlFor='pricePerHourForArchitect'>
                    Price per hour for Architect-level:
                </label>
                <div className='flex'>
                    <p className='mr-0.5'>$</p>
                    <p className={cn(edit ? 'hidden' : 'block')}>
                        {project.pricePerHourForArchitect}
                    </p>
                    <input
                        type='number'
                        step={0.05}
                        className={cn(
                            edit ? 'opacity-100' : 'hidden opacity-0',
                            'w-14 border-b border-b-customDarkGray outline-none'
                        )}
                        {...register('pricePerHourForArchitect')}
                    />
                    <p>/h</p>
                    <button
                        type='button'
                        className={cn(
                            edit
                                ? 'pointer-events-none opacity-0'
                                : 'pointer-events-auto opacity-100',
                            'ml-2 transition-all duration-300'
                        )}
                        onClick={() => setEdit(true)}
                    >
                        <EditPenSvg />
                    </button>
                </div>
            </div>
            <p
                className={cn(
                    project.status === 'inProgress' ? 'text-customBlue' : 'text-customGreen',
                    'font-normal'
                )}
            >
                Status: {project.status === 'inProgress' ? 'In Progress' : 'Completed'}
            </p>
            {errors && edit && (
                <ul className='text-sm text-customRed'>
                    {Object.keys(errors).map((key) => (
                        <li key={key}>{errors[key as keyof FormInputData]?.message}</li>
                    ))}
                </ul>
            )}
            <div
                className={cn(
                    edit ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
                    'mt-2 flex gap-4 transition-all duration-300'
                )}
            >
                <button type='button' className='changePasswordBtn h-10' onClick={onCancel}>
                    Cancel
                </button>
                <button className={cn('primaryBtn h-10')}>Save</button>
            </div>
        </form>
    );
}

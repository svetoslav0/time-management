import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import { HoursResponseData } from '@/components/dashboard/employeeProjects/types';
import cn from '@/util/cn';
import { generateDate, months } from '@/util/generateDate';

type CalendarProps = {
    changeDate: (date: Dayjs) => void;
    selectedDates: {
        startDate: Dayjs | '';
        endDate: Dayjs | '';
    };
    currentDate: Dayjs;
    projectHours: HoursResponseData[];
};

export default function GenerateReportCalendar({
    changeDate,
    selectedDates,
    currentDate,
    projectHours,
}: CalendarProps) {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    dayjs.extend(isBetween);

    const [today, setToday] = useState(
        dayjs.isDayjs(selectedDates.startDate) ? selectedDates.startDate : currentDate
    );

    const { minDate, maxDate } = projectHours.reduce<{
        minDate: Dayjs | null;
        maxDate: Dayjs | null;
    }>(
        (acc, curr) => {
            const currentDate = dayjs(curr.date);
            if (!acc.minDate || currentDate.isBefore(acc.minDate)) {
                acc.minDate = currentDate;
            }
            if (!acc.maxDate || currentDate.isAfter(acc.maxDate)) {
                acc.maxDate = currentDate;
            }
            return acc;
        },
        { minDate: null, maxDate: null }
    );

    return (
        <div className='w-96 text-lg font-semibold'>
            <div className='flex justify-between'>
                <GrFormPrevious
                    className='cursor-pointer'
                    onClick={() => {
                        setToday(today.month(today.month() - 1));
                    }}
                />
                <h1>
                    {months[today.month()]}, {today.year()}
                </h1>
                <GrFormNext
                    className='cursor-pointer'
                    onClick={() => {
                        setToday(today.month(today.month() + 1));
                    }}
                />
            </div>
            <div className='grid  w-full  grid-cols-7 text-gray-500 dark:text-gray-50'>
                {days.map((day, index) => {
                    return (
                        <div key={index} className='grid h-14 place-content-center'>
                            <h1>{day}</h1>
                        </div>
                    );
                })}
            </div>
            <div className='grid w-full  grid-cols-7 overflow-hidden rounded-xl border-2 border-gray-200'>
                {generateDate(today.month(), today.year()).map(
                    ({ date, currentMonth, today }, index) => {
                        const isStartDate =
                            dayjs.isDayjs(selectedDates.startDate) &&
                            selectedDates.startDate.toDate().toDateString() ===
                                date.toDate().toDateString();
                        const isEndDate =
                            dayjs.isDayjs(selectedDates.endDate) &&
                            selectedDates.endDate.toDate().toDateString() ===
                                date.toDate().toDateString();

                        const isBetween =
                            dayjs.isDayjs(selectedDates.startDate) &&
                            dayjs.isDayjs(selectedDates.endDate) &&
                            date.isAfter(selectedDates.startDate) &&
                            date.isBefore(selectedDates.endDate);

                    
                        const isValidDate =
                            (minDate && maxDate && date.isBetween(minDate, maxDate, 'day', '[]')) ||
                            (!minDate && !maxDate); 

                        return (
                            <div
                                key={index}
                                className={cn(
                                    'grid h-14 place-content-center border-2',
                                    currentMonth ? '' : 'text-gray-400'
                                )}
                            >
                                <span
                                    className={cn(
                                        today ? ' text-blue-700' : '',
                                        isStartDate ? 'bg-black text-white' : '',
                                        isEndDate ? 'bg-black text-white' : '',
                                        isBetween ? 'bg-red-500 text-white' : '',
                                        isValidDate
                                            ? 'grid h-10 w-10 cursor-pointer place-content-center rounded-full transition-all hover:bg-black hover:text-white'
                                            : 'cursor-not-allowed text-gray-400'
                                    )}
                                    onClick={() => {
                                        if (isValidDate) {
                                            changeDate(date);
                                        }
                                    }}
                                >
                                    {date.date()}
                                </span>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}

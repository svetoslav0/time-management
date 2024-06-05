import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import cn from '../../util/cn';
import { generateDate, months } from '../../util/generateDate';

type CalendarProps = {
    changeDate: (date: Dayjs) => void;
    selectedDate: Dayjs | string;
    currentDate: Dayjs;
};

export default function Calendar({ changeDate, selectedDate, currentDate }: CalendarProps) {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    // if there is not selected date will be use currentDate
    const [today, setToday] = useState(dayjs.isDayjs(selectedDate) ? selectedDate : currentDate);

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
                        return (
                            <div
                                key={index}
                                className='grid h-14 place-content-center border-2 border-gray-200'
                            >
                                <span
                                    className={cn(
                                        currentMonth ? '' : 'text-gray-400',
                                        today ? ' text-blue-700' : '',
                                        dayjs.isDayjs(selectedDate) &&
                                            selectedDate.toDate().toDateString() ===
                                                date.toDate().toDateString()
                                            ? 'bg-black text-white'
                                            : '',
                                        'grid h-10 w-10 cursor-pointer place-content-center rounded-full transition-all hover:bg-black hover:text-white'
                                    )}
                                    onClick={() => changeDate(date)}
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

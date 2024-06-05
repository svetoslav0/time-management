import dayjs from 'dayjs';

export function generateDate(month = dayjs().month(), year = dayjs().year()) {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
    const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');

    const arrayOfDate = [];

    // Adjust the start of the week to Monday
    const startOfWeekAdjustment = firstDateOfMonth.day() === 0 ? 6 : firstDateOfMonth.day() - 1;

    // generate prefix date
    for (let i = 0; i < startOfWeekAdjustment; i++) {
        arrayOfDate.push({ currentMonth: false, date: firstDateOfMonth.subtract(startOfWeekAdjustment - i, 'day') });
    }

    // generate current date
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            today:
                firstDateOfMonth.date(i).toDate().toDateString() ===
                dayjs().toDate().toDateString(),
        });
    }

    // generate remaining days (42 days in total)
    const remaining = 42 - arrayOfDate.length;

    for (let i = 1; i <= remaining; i++) {
        arrayOfDate.push({ currentMonth: false, date: lastDateOfMonth.add(i, 'day') });
    }

    return arrayOfDate;
}

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

import type { CustomerProps } from './types';


export const CUSTOMERS: CustomerProps[] = [
    {
        id: '100',
        email: 'george@abv.bg',
        firstName: 'George',
        lastName: 'Ivanov',
        companyName: 'GDD',
    },
    {
        id: '102',
        email: 'george',
        firstName: 'Georgi@abv.bg',
        lastName: 'Georgiev',
        companyName: 'GGG',
    },
    {
        id: '103',
        email: 'nik12@abv.bg',
        firstName: 'Nikolay',
        lastName: 'Dimitrov',
        companyName: 'Nik12',
    },
    {
        id: '104',
        email: 'tZhelev@abv.bg',
        firstName: 'Tsvetomir',
        lastName: 'Zhelev',
        companyName: 'TZ',
    },
    {
        id: '105',
        email: 'Grozdan@abv.bg',
        firstName: 'Grozdan',
        lastName: 'Karadzhov',
        companyName: 'GGK',
    },
    {
        id: '106',
        email: 'simo@abv.bg',
        firstName: 'Simeon',
        lastName: 'Asparuhov',
        companyName: 'Asparuhov ltd',
    },
    {
        id: '107',
        email: 'asen@abv.bg',
        firstName: 'Asen',
        lastName: 'Bojanov',
        companyName: 'BA',
    },
];

export const PROJECTS: {
    [key: string]: {
        projectName: string;
        pricePerHour: number;
        employeeIds: string[];
        customerIds: string[];
        startingDate: string;
    };
} = {
    '1': {
        projectName: 'Green Palace',
        pricePerHour: 22,
        employeeIds: ['1', '2', '3'],
        customerIds: ['104'],
        startingDate: '2024-07-17',
    },

    '2': {
        projectName: 'project',
        pricePerHour: 2,
        employeeIds: ['1', '2', '3'],
        customerIds: ['105', '106'],
        startingDate: '2024-11-10',
    },
};

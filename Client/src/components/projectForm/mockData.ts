import type { CustomerProps, EmployeesProps } from './types';

export const EMPLOYEES: EmployeesProps[] = [
    {
        id: '1',
        userName: 'ivan1',
        firstName: 'Ivan',
        lastName: 'Ivanov',
    },
    {
        id: '2',
        userName: 'george',
        firstName: 'Georgi',
        lastName: 'Georgiev',
    },
    {
        id: '3',
        userName: 'nik12',
        firstName: 'Nikolay',
        lastName: 'Dimitrov',
    },
    {
        id: '4',
        userName: 'tZhelev',
        firstName: 'Tsvetomir',
        lastName: 'Zhelev',
    },
    {
        id: '5',
        userName: 'Grozdan',
        firstName: 'Grozdan',
        lastName: 'Karadzhov',
    },
    {
        id: '6',
        userName: 'simo',
        firstName: 'Simeon',
        lastName: 'Asparuhov',
    },
    {
        id: '7',
        userName: 'asen',
        firstName: 'Asen',
        lastName: 'Bojanov',
    },
];

export const CUSTOMERS: CustomerProps[] = [
    {
        id: '100',
        userName: 'george',
        firstName: 'George',
        lastName: 'Ivanov',
        companyName: 'GDD',
    },
    {
        id: '102',
        userName: 'george',
        firstName: 'Georgi',
        lastName: 'Georgiev',
        companyName: 'GGG',
    },
    {
        id: '103',
        userName: 'nik12',
        firstName: 'Nikolay',
        lastName: 'Dimitrov',
        companyName: 'Nik12',
    },
    {
        id: '104',
        userName: 'tZhelev',
        firstName: 'Tsvetomir',
        lastName: 'Zhelev',
        companyName: 'TZ',
    },
    {
        id: '105',
        userName: 'Grozdan',
        firstName: 'Grozdan',
        lastName: 'Karadzhov',
        companyName: 'GGK',
    },
    {
        id: '106',
        userName: 'simo',
        firstName: 'Simeon',
        lastName: 'Asparuhov',
        companyName: 'Asparuhov ltd',
    },
    {
        id: '107',
        userName: 'asen',
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
        customerId: string;
        startingDate: string;
    };
} = {
    '1': {
        projectName: 'Green Palace',
        pricePerHour: 22,
        employeeIds: ['1', '2', '3'],
        customerId: '104',
        startingDate: '2024-07-17',
    },

    '2': {
        projectName: 'project',
        pricePerHour: 2,
        employeeIds: ['1', '2', '3'],
        customerId: '104',
        startingDate: '2024-11-10',
    },
};

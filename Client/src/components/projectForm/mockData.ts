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

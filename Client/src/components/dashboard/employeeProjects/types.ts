export type HoursData = {
    date: string;
    hours: number;
    notes: string;
    projectId: string;
};

export type UpdateHoursData = { _id: string } & HoursData;

export type HoursResponseData = {
    _id: string;
    userId: { _id: string; email: string; firstName: string; lastName: string };
    __v: number;
} & HoursData;

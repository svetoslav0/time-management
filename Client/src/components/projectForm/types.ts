// EmployeesProps and ClientProps are temporary
export type EmployeesProps = Record<'id' | 'email' | 'firstName' | 'lastName', string>;
export type CustomerProps = Record<
    'id' | 'email' | 'firstName' | 'lastName' | 'companyName',
    string
>;

export type ProjectFormDataType = {
    projectName: string;
    pricePerHour: number;
    employeeIds: string[];
    customerIds?: string[];
    startingDate: string;
    inviteEmails?: string[];
};

// EmployeesProps and ClientProps are temporary
export type EmployeesProps = Record<'id' | 'email' | 'firstName' | 'lastName', string>;
export type CustomerProps = Record<
    'id' | 'email' | 'firstName' | 'lastName' | 'companyName',
    string
>;

export type PricesType = {
    pricePerHourForJunior: number ;
    pricePerHourForMid: number ;
    pricePerHourForSenior: number ;
    pricePerHourForArchitect: number ;
};

export type ProjectFormDataType = {
    projectName: string;
    employeeIds: string[];
    customerIds?: string[];
    startingDate: string;
    inviteEmails?: string[];
} & PricesType;

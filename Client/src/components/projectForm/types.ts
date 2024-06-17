// EmployeesProps and ClientProps are temporary 
export type EmployeesProps = Record<'id' | 'email' | 'firstName' | 'lastName', string>;
export type CustomerProps = Record<
    'id' | 'email' | 'firstName' | 'lastName' | 'companyName',
    string
>;

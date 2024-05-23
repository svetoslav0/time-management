export type LoginFormDataType = {
    username: string;
    password: string;
};

export type CreateUserDataType = {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    rePassword?: string;
};
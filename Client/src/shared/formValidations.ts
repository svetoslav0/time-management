import dayjs, { Dayjs } from 'dayjs';
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required!'),
    password: yup.string().required('Password is required!'),
});

export const createUserSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    password: yup
        .string()
        .min(6, 'Password need to be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .min(6, 'Password need to be at least 6 characters')
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
    userRole: yup.string().required('User role is required'),
    experienceLevel: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'employee'
            ? schema.required('Experience is required')
            : schema.notRequired();
    }),
    companyName: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'customer'
            ? schema.required('Company Name is required')
            : schema.notRequired();
    }),
    phoneNumber: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'customer'
            ? schema.required('Phone Number is required')
            : schema.notRequired();
    }),
    address: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'customer'
            ? schema.required('Address is required')
            : schema.notRequired();
    }),
    description: yup.string(),
});
export const createGoogleUserSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    userRole: yup.string().required('User role is required'),
    experienceLevel: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'employee'
            ? schema.required('Experience is required')
            : schema.notRequired();
    }),
    companyName: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'customer'
            ? schema.required('Company Name is required')
            : schema.notRequired();
    }),
    phoneNumber: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'customer'
            ? schema.required('Phone Number is required')
            : schema.notRequired();
    }),
    address: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'customer'
            ? schema.required('Address is required')
            : schema.notRequired();
    }),
    description: yup.string(),
});
export const editUserSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    experienceLevel: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'employee'
            ? schema.required('Experience is required')
            : schema.notRequired();
    }),
    companyName: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'customer'
            ? schema.required('Company Name is required')
            : schema.notRequired();
    }),
    phoneNumber: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'customer'
            ? schema.required('Phone Number is required')
            : schema.notRequired();
    }),
    address: yup.string().when('userRole', ([userRole], schema) => {
        return userRole === 'customer'
            ? schema.required('Address is required')
            : schema.notRequired();
    }),
    description: yup.string(),
});

export const projectFormSchema = yup.object().shape({
    projectName: yup.string().required('Project name is required!'),
    pricePerHourForJunior: yup
        .number()
        .required('Junior price per hour is required!')
        .positive('Junior price must be bigger then 0')
        .typeError('Junior price per hour must be a number'),
    pricePerHourForMid: yup
        .number()
        .required('Mid price per hour is required!')
        .positive('Mid price must be bigger then 0')
        .typeError('Mid price per hour must be a number'),
    pricePerHourForSenior: yup
        .number()
        .required('Senior price per hour is required!')
        .positive('Senior price must be bigger then 0')
        .typeError('Senior price per hour must be a number'),
    pricePerHourForArchitect: yup
        .number()
        .required('Architect price per hour is required!')
        .positive('Architect price must be bigger then 0')
        .typeError('Architect price per hour must be a number'),
    employeeIds: yup
        .array()
        .min(1, 'At least one employee must be selected')
        .of(yup.string().required())
        .required('At least one employee must be selected'),
    customerIds: yup
        .array()
        .of(yup.string().required())
        .test(
            'customer-or-email',
            'At least one customer or email must be selected',
            function (value) {
                const { inviteEmails } = this.parent;
                return (value && value.length > 0) || (inviteEmails && inviteEmails.length > 0);
            }
        ),
    startingDate: yup.string().required('Please select date'),
    inviteEmails: yup
        .array()
        .of(yup.string().email('Must be a valid email').required())
        .test(
            'email-or-customer',
            'At least one email or customer must be added',
            function (value) {
                const { customerIds } = this.parent;
                return (value && value.length > 0) || (customerIds && customerIds.length > 0);
            }
        ),
});

export const resetPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .required('Password is required!')
        .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Please confirm your password'),
});

export const changeNamesSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters long'),
    lastName: yup
        .string()
        .required('Last name is required')
        .min(3, 'Last name must be at least 3 characters long'),
});

export const changePasswordSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required('Old password  is required!')
        .min(6, 'Old password must be at least 6 characters long'),
    newPassword: yup
        .string()
        .required('New password is required!')
        .min(6, 'New password must be at least 6 characters long'),
    confirmNewPassword: yup
        .string()
        .min(6, 'Confirm password must be at least 6 characters long')
        .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
        .required('Confirm password is required!'),
});

export const hoursFormSchema = yup.object().shape({
    date: yup.string().required('Please select date'),
    hours: yup
        .number()
        .typeError('Please add time')
        .min(0.5, 'Time must be more than or equal to 0.5')
        .max(8, 'Time must be less than or equal to 8')
        .required('Please add time')
        .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    notes: yup.string().required('Please add note'),
});

export const generateReportSchema = yup.object().shape({
    name: yup.string().required('Report name is required!'),
    startDate: yup
        .mixed<Dayjs | ''>()
        .nullable()
        .test(
            'is-dayjs',
            'Please select a valid starting date',
            (value) => value === null || dayjs.isDayjs(value)
        )
        .required('Please select starting date'),
    endDate: yup
        .mixed<Dayjs | ''>()
        .nullable()
        .test(
            'is-dayjs',
            'Please select a valid ending date',
            (value) => value === null || dayjs.isDayjs(value)
        )
        .required('Please select ending date'),
});

export const changePricesSchema = yup.object().shape({
    pricePerHourForJunior: yup
        .number()
        .required('Junior price per hour is required and must be a number!')
        .positive('Junior price must be bigger then 0')
        .typeError('Junior price per hour is required and must be a number!'),
    pricePerHourForMid: yup
        .number()
        .required('Mid price per hour is required and must be a number!')
        .positive('Mid price must be bigger then 0')
        .typeError('Mid price per hour is required and must be a number!'),
    pricePerHourForSenior: yup
        .number()
        .required('Senior price per hour is required and must be a number!')
        .positive('Senior price must be bigger then 0')
        .typeError('Senior price per hour is required and must be a number!'),
    pricePerHourForArchitect: yup
        .number()
        .required('Architect price per hour is required and must be a number!')
        .positive('Architect price must be bigger then 0')
        .typeError('Architect price per hour is required and must be a number!'),
});

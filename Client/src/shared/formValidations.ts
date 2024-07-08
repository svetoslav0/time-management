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
    pricePerHour: yup
        .number()
        .required('Price per hour is required!')
        .positive('Price must be bigger then 0')
        .typeError('Price per hour must be a number'),
    employeeIds: yup
        .array()
        .min(1, 'At least one employee must be selected')
        .of(yup.string().required())
        .required('At least one employee must be selected'),
    customerIds: yup
        .array()
        .min(1, 'At least one customer must be selected')
        .of(yup.string().required())
        .required('At least one customer must be selected'),
    startingDate: yup.string().required('Please select date'),
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

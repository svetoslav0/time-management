import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required!'),
    password: yup.string().required('Password is required!'),
});

export const createUserSchema = yup.object().shape({
    username: yup.string().required('Username is required!'),
    firstName: yup.string().required('First name is required!'),
    lastName: yup.string().required('Last name is required!'),
    userRole: yup.string().required('Role is required!'),
    password: yup.string().required('Password is required!'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match!'),
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
    customerId: yup.string().required('Select Customer!'),
    startingDate: yup.string().required('Please select date'),
});

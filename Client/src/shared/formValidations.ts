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

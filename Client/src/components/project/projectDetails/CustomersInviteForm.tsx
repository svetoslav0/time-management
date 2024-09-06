import { FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import useInviteUser from '../hooks/useInviteUser';

import { ProjectResponseDataType } from '@/shared/types';

type CustomersInviteFormProps = {
    setIsInvite: React.Dispatch<React.SetStateAction<boolean>>;
    project: ProjectResponseDataType;
};

export default function CustomersInviteForm({ setIsInvite, project }: CustomersInviteFormProps) {
    const { inviteUser, isInviteSuccess } = useInviteUser({ projectId: project._id });

    const validationSchema = yup.object().shape({
        inviteEmail: yup.string().email('Invalid email address').required('Email is required'),
    });

    useEffect(() => {
        if (isInviteSuccess) {
            setIsInvite(false);
        }
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData.entries());

        const inviteEmail = values.inviteEmail as string;
        const projectId = project._id;

        const validationResult = validationSchema.isValidSync(
            { inviteEmail },
            { abortEarly: true }
        );

        if (validationResult) {
            inviteUser({ inviteEmail, projectId });
        } else {
            toast.error('Please enter a valid email address');
        }
    }
    return (
        <form onSubmit={handleSubmit} className='ml-5'>
            <input
                type='text'
                name='inviteEmail'
                placeholder='type email'
                className='w-60 rounded-md border-[1px] border-customDarkBlue px-3 py-1.5 text-sm font-semibold text-customDarkBlue placeholder:text-customDarkGray'
            />
            <button
                type='submit'
                className='adminProjectBtn ml-5 bg-customDarkBlue text-white transition duration-300 ease-out'
            >
                Send invite
            </button>

            <button
                onClick={() => setIsInvite(false)}
                type='button'
                className='adminProjectBtn ml-5 border-[1px] border-customDarkBlue bg-white text-customDarkBlue transition duration-300 ease-out'
            >
                Cancel
            </button>
        </form>
    );
}

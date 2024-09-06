import { useEffect, useState } from 'react';

import useDeleteInvite from '../hooks/useDeleteInvite';
import CustomersInviteForm from './CustomersInviteForm';

import { queryKeys } from '@/reactQuery/constants';
import { queryClient } from '@/reactQuery/queryClient';
import { InvitesProjectData, ProjectResponseDataType } from '@/shared/types';
import EditPenSvg from '@/UI/design/EditPenSvg';
import PlusSvg from '@/UI/design/PlusSvg';
import XSvg from '@/UI/design/XSvg';
import cn from '@/util/cn';

type InviteUsersCardLayoutProps = {
    project: ProjectResponseDataType;
};

export default function InviteUsersCardLayout({ project }: InviteUsersCardLayoutProps) {
    const [isHover, setIsHover] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isInvite, setIsInvite] = useState(false);

    const [currentInvites, setCurrentInvites] = useState<[] | InvitesProjectData[]>(
        project.invites
    );

    const [deletedInvites, setDeletedInvites] = useState<[] | InvitesProjectData[]>([]);

    const { deleteInviteUser } = useDeleteInvite();

    function removePerson(inviteData: InvitesProjectData) {
        setCurrentInvites(
            (prevInvites) => prevInvites?.filter((invite) => invite._id !== inviteData._id) || []
        );
        setDeletedInvites((prevInvites) => [...prevInvites, inviteData]);
    }

    console.log(deletedInvites);
    useEffect(() => {
        setCurrentInvites(project.invites);
    }, [project]);

    function handleUpdateEmployees() {
        if (deletedInvites) {
            deletedInvites.forEach((invites) => {
                deleteInviteUser(invites);
            });

            queryClient.invalidateQueries({
                queryKey: [queryKeys.projects, project._id],
            });
        }
        setDeletedInvites([]);
        setIsEdit(false);
    }

    return (
        <>
            <div
                className='rounded-2xl shadow-loginFormShadow'
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <div className='mt-11 rounded-t-2xl bg-customDarkBlue shadow-loginFormShadow'>
                    <p className='py-2 pl-6 text-base font-bold text-white'>Invited emails</p>
                </div>
                <div
                    className={cn(
                        isHover || isEdit || isInvite ? 'bg-customVeryLightBlue' : 'bg-while',
                        'relative  min-h-20 flex-row items-center rounded-b-2xl  pr-48 shadow-loginFormShadow transition duration-300 ease-out'
                    )}
                >
                    {currentInvites && (
                        <div className='py-5'>
                            {currentInvites.map((invite) => (
                                <div className='my-4 flex' key={invite._id}>
                                    <>
                                        <div className='ml-6  whitespace-nowrap text-base font-medium '>
                                            <span>{invite.email}</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (isEdit) {
                                                    removePerson(invite);
                                                }
                                            }}
                                            className={cn(
                                                isEdit ? 'opacity-100' : 'cursor-default opacity-0',
                                                'ml-1 mt-1 transition duration-300 ease-out'
                                            )}
                                        >
                                            <XSvg />
                                        </button>
                                    </>
                                </div>
                            ))}
                        </div>
                    )}
                    <div
                        className={cn(
                            isHover && !isEdit ? 'opacity-100' : 'opacity-0',
                            'absolute right-4 top-3 transition duration-300 ease-in-out'
                        )}
                    >
                        {currentInvites.length > 0 && !isInvite && (
                            <button onClick={() => setIsEdit(true)}>
                                <EditPenSvg />
                            </button>
                        )}
                    </div>
                    <div
                        className={cn(
                            isEdit ? 'visible' : 'invisible',
                            'absolute right-4 top-3 space-x-4 transition duration-300 ease-in-out'
                        )}
                    >
                        <button
                            className='adminProjectBtn bg-customBlue text-white'
                            onClick={handleUpdateEmployees}
                        >
                            Save
                        </button>
                        <button
                            className='adminProjectBtn bg-customDarkBlue text-white'
                            onClick={() => {
                                setIsEdit(false);
                                setCurrentInvites(project.invites);
                                setDeletedInvites([]);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className='mb-20 mt-5'>
                {isInvite ? (
                    <CustomersInviteForm project={project} setIsInvite={setIsInvite} />
                ) : (
                    <button
                        onClick={() => setIsInvite(true)}
                        className={cn(
                            isEdit && 'opacity-0',
                            'adminProjectBtn ml-5 border-[1px] border-customDarkBlue bg-white text-customDarkBlue transition duration-300 ease-out'
                        )}
                    >
                        <span className='flex items-center gap-0.5'>
                            <PlusSvg />
                            Invite user
                        </span>
                    </button>
                )}
            </div>
        </>
    );
}

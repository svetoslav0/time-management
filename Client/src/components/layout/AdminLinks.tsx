import ButtonSecondary from '@/UI/formComponents/ButtonSecondary';

type AdminLinksProps = {
    redirectToUsersPanel: () => void;
    redirectToProjectsPanel: () => void;
};

const AdminLinks = ({ redirectToUsersPanel, redirectToProjectsPanel }: AdminLinksProps) => {
    return (
        <>
            <ButtonSecondary
                redirectToUsersPanel={redirectToUsersPanel}
                redirectToProjectsPanel={redirectToProjectsPanel}
            />
        </>
    );
};

export default AdminLinks;

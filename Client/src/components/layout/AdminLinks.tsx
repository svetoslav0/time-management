import ButtonSecondary from '@/UI/formComponents/ButtonSecondary';

type AdminLinksProps = {
    redirectToUsersPanel: () => void;
};

const AdminLinks = ({ redirectToUsersPanel }: AdminLinksProps) => {
    return (
        <>
            <ButtonSecondary redirectToUsersPanel={redirectToUsersPanel} />
        </>
    );
};

export default AdminLinks;

interface ChildrenProps {
    redirectToUsersPanel: () => void;
    redirectToProjectsPanel: () => void;
}

const ButtonSecondary = ({ redirectToUsersPanel, redirectToProjectsPanel }: ChildrenProps) => {
    return (
        <>
            <button
                onClick={redirectToUsersPanel}
                type='button'
                className='mb-2 me-2 w-28 rounded-[10px] border border-[#163851] bg-white px-5 py-1 text-sm font-medium text-[#163851] hover:bg-[#163851] hover:text-white'
            >
                Users
            </button>
            <button
                onClick={redirectToProjectsPanel}
                type='button'
                className='mb-2 me-2 w-28 rounded-[10px] border border-[#163851] bg-white px-5 py-1 text-sm font-medium text-[#163851] hover:bg-[#163851] hover:text-white'
            >
                Projects
            </button>
        </>
    );
};

export default ButtonSecondary;

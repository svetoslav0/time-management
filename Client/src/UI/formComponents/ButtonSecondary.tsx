interface ChildrenProps {
    redirectToUsersPanel: () => void;
}

const ButtonSecondary = ({ redirectToUsersPanel }: ChildrenProps) => {
    return (
        <button
            onClick={redirectToUsersPanel}
            type='button'
            className='mb-2 me-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
        >
            Users
        </button>
    );
};

export default ButtonSecondary;

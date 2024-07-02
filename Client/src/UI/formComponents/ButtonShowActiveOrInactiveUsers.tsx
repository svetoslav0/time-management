interface ChildrenProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonShowActiveOrInactiveUsers = ({ active, setActive }: ChildrenProps) => {
    return (
        <button
            className='self-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
            onClick={() => {
                setActive(!active);
            }}
        >
            {active ? 'Show Inactive users' : 'Show Active users'}
        </button>
    );
};

export default ButtonShowActiveOrInactiveUsers;

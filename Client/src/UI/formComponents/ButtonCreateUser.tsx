import { useNavigate } from 'react-router-dom';

const ButtonCreateUser = () => {
    const navigate = useNavigate();
    return (
        <button
            className='self-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
            onClick={() => {
                navigate('/admin/createUser');
            }}
        >
            Create User
        </button>
    );
};

export default ButtonCreateUser;

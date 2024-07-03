import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChildrenProps {
    children: ReactNode;
    path: string;
}
const ButtonCreateProject = ({ children, path }: ChildrenProps) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => {
                navigate(path);
            }}
            type='button'
            className='rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
            {children}
        </button>
    );
};

export default ButtonCreateProject;

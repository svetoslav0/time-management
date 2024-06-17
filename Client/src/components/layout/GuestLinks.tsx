import { Link } from 'react-router-dom';

import ButtonLogin from '@/UI/formComponents/ButtonLogin';

type GuestLinksProps = {
    handleLogin: () => void;
};

const GuestLinks = ({ handleLogin }: GuestLinksProps) => {
    return (
        <>
            <li>
                <Link
                    className='mx-4 text-xl transition-colors duration-500 hover:text-gray-400'
                    to={'/auth/login'}
                >
                    <ButtonLogin handleLogin={handleLogin}>Login</ButtonLogin>
                </Link>
            </li>
        </>
    );
};

export default GuestLinks;

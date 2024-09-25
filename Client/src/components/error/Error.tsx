import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Error() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, [navigate]);

    return <></>;
}

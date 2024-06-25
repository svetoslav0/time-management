import { User } from '@/shared/types';
import { useNavigate } from 'react-router-dom';

interface SingleTableElementProps {
    data: User;
}
export default function SingleTableElement({ data }: SingleTableElementProps) {
    const navigate = useNavigate();
    return (
        <tr>
            <td className='whitespace-nowrap py-2 font-medium text-gray-900'>{data.email}</td>
            <td className='whitespace-nowrap py-2 text-gray-700'>
                {data.firstName} {data.lastName}
            </td>
            <td className='whitespace-nowrap py-2 text-gray-700'>{data.userRole}</td>
            <td className='whitespace-nowrap py-2 text-gray-700'>{data.description}</td>
            <td className='whitespace-nowrap py-2'>
                <button
                    onClick={() => navigate(`/admin/users/${data._id}`)}
                    className='inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700'
                >
                    Details
                </button>
            </td>
        </tr>
    );
}

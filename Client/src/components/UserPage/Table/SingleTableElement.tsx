import { Project } from '../UserPage';

interface SingleTableElementProps {
    data: Project;
}

export default function SingleTableElement({ data }: SingleTableElementProps) {
    return (
        <tr>
            <td className='whitespace-nowrap py-2 font-medium text-gray-900'>{data.projectName}</td>
            <td className='whitespace-nowrap py-2 text-gray-700'>{data.projectStart}</td>
            <td className='whitespace-nowrap py-2 text-gray-700'>{data.workedHours}</td>
            <td className='whitespace-nowrap py-2 text-gray-700'>${data.salary}</td>
            <td className='whitespace-nowrap py-2'>
                <a
                    href='#'
                    className='inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700'
                >
                    Details
                </a>
            </td>
        </tr>
    );
}

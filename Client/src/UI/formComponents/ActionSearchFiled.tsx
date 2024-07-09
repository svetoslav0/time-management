import { CiSearch } from 'react-icons/ci';

type ActionSearchFiledProps = {
    handleChangeFilter: (data: string) => void;
    value: string;
};
export default function ActionSearchFiled({ value, handleChangeFilter }: ActionSearchFiledProps) {
    return (
        <div className='relative my-5 border-b-2'>
            <input
                type='text'
                id='searchField'
                placeholder='Search...'
                className=' border-gray-300 mx-2 outline-none'
                value={value}
                onChange={(e) => handleChangeFilter(e.currentTarget.value.trim())}
            />
            <div className='absolute top-1 right-1'>
                <CiSearch />
            </div>
        </div>
    );
}

import { useState } from 'react';

import cn from '@/util/cn';

type ActionSearchFiledProps = {
    handleChangeFilter: (data: string) => void;
    value: string;
    placeholder?: string;
};
export default function ActionSearchFiled({
    value,
    handleChangeFilter,
    placeholder = 'Search...',
}: ActionSearchFiledProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            className={cn(
                isFocused ? 'border-customBlue' : 'border-customDarkBlue',
                'relative flex w-[375px] items-center rounded-[10px] border-[1px]  shadow'
            )}
        >
            <svg
                className='my-2.5 ml-3 mr-2'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <g id='mingcute:search-line' clip-path='url(#clip0_86_182)'>
                    <g id='Group'>
                        <path
                            id='Vector'
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M8.74997 1.6665C7.62046 1.6666 6.50735 1.93681 5.50351 2.45458C4.49967 2.97236 3.63421 3.72268 2.97933 4.64297C2.32445 5.56325 1.89914 6.62679 1.73889 7.74487C1.57864 8.86295 1.68809 10.0031 2.05812 11.0703C2.42814 12.1375 3.04801 13.1007 3.866 13.8796C4.68399 14.6585 5.67639 15.2305 6.7604 15.5478C7.8444 15.8652 8.98859 15.9187 10.0975 15.7039C11.2064 15.4892 12.2478 15.0123 13.135 14.3132L16.1783 17.3565C16.3355 17.5083 16.546 17.5923 16.7645 17.5904C16.983 17.5885 17.192 17.5009 17.3465 17.3464C17.501 17.1918 17.5886 16.9828 17.5905 16.7643C17.5924 16.5458 17.5084 16.3353 17.3566 16.1782L14.3133 13.1348C15.1366 12.0904 15.6493 10.8352 15.7925 9.51294C15.9358 8.19071 15.704 6.85485 15.1235 5.65825C14.543 4.46164 13.6374 3.45263 12.5102 2.7467C11.3831 2.04076 10.0799 1.66641 8.74997 1.6665ZM3.3333 8.74984C3.3333 7.31325 3.90398 5.9355 4.91981 4.91968C5.93563 3.90385 7.31338 3.33317 8.74997 3.33317C10.1866 3.33317 11.5643 3.90385 12.5801 4.91968C13.596 5.9355 14.1666 7.31325 14.1666 8.74984C14.1666 10.1864 13.596 11.5642 12.5801 12.58C11.5643 13.5958 10.1866 14.1665 8.74997 14.1665C7.31338 14.1665 5.93563 13.5958 4.91981 12.58C3.90398 11.5642 3.3333 10.1864 3.3333 8.74984Z'
                            fill='#163850'
                            fill-opacity='0.3'
                        />
                    </g>
                </g>
                <defs>
                    <clipPath id='clip0_86_182'>
                        <rect width='20' height='20' fill='white' />
                    </clipPath>
                </defs>
            </svg>

            <input
                type='text'
                id='searchField'
                placeholder={placeholder}
                className='w-full bg-inherit text-sm font-medium text-customDarkBlue outline-none placeholder:text-customDarkBlue placeholder:opacity-30'
                value={value}
                onChange={(e) => {
                    handleChangeFilter(e.currentTarget.value.trim());
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    if (e.currentTarget.value.trim()) {
                        setIsFocused(true);
                    } else {
                        setIsFocused(false);
                    }
                }}
            />
        </div>
    );
}

import { ReactNode } from 'react';

interface ChildrenProps {
    children: ReactNode;
    handleLogout: () => void;
}

const ButtonLogout = ({ children, handleLogout }: ChildrenProps) => {
    const LogoutSvg = () => (
        <svg
            className='pt-1'
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='24'
            viewBox='0 0 26 26'
            fill='none'
        >
            <path
                d='M2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H8C8.28333 0 8.521 0.0960001 8.713 0.288C8.905 0.48 9.00067 0.717333 9 1C8.99933 1.28267 8.90333 1.52033 8.712 1.713C8.52067 1.90567 8.28333 2.00133 8 2H2V16H8C8.28333 16 8.521 16.096 8.713 16.288C8.905 16.48 9.00067 16.7173 9 17C8.99933 17.2827 8.90333 17.5203 8.712 17.713C8.52067 17.9057 8.28333 18.0013 8 18H2ZM14.175 10H7C6.71667 10 6.47933 9.904 6.288 9.712C6.09667 9.52 6.00067 9.28267 6 9C5.99933 8.71733 6.09533 8.48 6.288 8.288C6.48067 8.096 6.718 8 7 8H14.175L12.3 6.125C12.1167 5.94167 12.025 5.71667 12.025 5.45C12.025 5.18333 12.1167 4.95 12.3 4.75C12.4833 4.55 12.7167 4.44567 13 4.437C13.2833 4.42833 13.525 4.52433 13.725 4.725L17.3 8.3C17.5 8.5 17.6 8.73333 17.6 9C17.6 9.26667 17.5 9.5 17.3 9.7L13.725 13.275C13.525 13.475 13.2877 13.571 13.013 13.563C12.7383 13.555 12.5007 13.4507 12.3 13.25C12.1167 13.05 12.0293 12.8127 12.038 12.538C12.0467 12.2633 12.1423 12.034 12.325 11.85L14.175 10Z'
                fill='#008CFF'
            />
        </svg>
    );

    return (
        <button
            onClick={handleLogout}
            type='button'
            className=' mb-1 me-2 flex w-28 justify-center self-center rounded-[8px] bg-white px-5 py-0.5 text-center text-sm font-medium text-[#008CFF] shadow-xl hover:bg-[#DEE5EC] focus:outline-none focus:ring-4'
        >
            <LogoutSvg />
            {children}
        </button>
    );
};

export default ButtonLogout;

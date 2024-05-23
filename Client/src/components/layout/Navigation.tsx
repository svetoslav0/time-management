import { CgSun } from 'react-icons/cg';
import { FaMoon } from 'react-icons/fa6';

type NavigationProps = {
    mode: boolean;
    onChangeDarkMode: () => void;
};

export function Navigation({ mode, onChangeDarkMode }: NavigationProps) {
    return (
        <nav className='m-auto my-4 w-3/4'>
            <ul className='flex justify-end'>
                <li>
                    <button className='h-8 w-8' onClick={onChangeDarkMode}>
                        {mode ? (
                            <FaMoon className='h-full w-full' />
                        ) : (
                            <CgSun className='h-full w-full' />
                        )}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

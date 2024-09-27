import { useState } from 'react';

import { ExperienceLevel } from '@/shared/types';
import ArrowSvg from '@/UI/design/ArrowSvg';
import cn from '@/util/cn';

type ExperienceLevelDropdownProps = {
    expValue: ExperienceLevel;
    isActive: boolean;
};

export function ExperienceLevelDropdown({ expValue, isActive }: ExperienceLevelDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<ExperienceLevel>(expValue);
    const options: ExperienceLevel[] = ['Junior', 'Mid-Level', 'Senior', 'Architect'];

    const handleOptionClick = (option: ExperienceLevel) => {
        setSelectedValue(option);
        setIsOpen(false);
    };

    return (
        <>
            <label htmlFor='experienceLevel' className='font-bold'>
                Experience level:
            </label>
            <div
                className={cn(
                    isActive &&
                        'rounded-lg border border-customBlue border-opacity-30 bg-[#eff1f3] px-2',
                    'relative flex w-36 items-center justify-between transition duration-300'
                )}
            >
                <input
                    type='text'
                    name='experienceLevel'
                    value={selectedValue}
                    className={cn(
                        isActive && 'bg-[#eff1f3]',
                        'w-full font-medium outline-none transition duration-300'
                    )}
                    readOnly
                    onClick={() => {
                        if (isActive) {
                            setIsOpen(!isOpen);
                        }
                    }}
                />
                <button
                    type='button'
                    className={cn(isOpen && 'rotate-180')}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isActive && <ArrowSvg width={20} height={20} />}
                </button>

                <ul
                    className={cn(
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                        'absolute left-0 top-10 w-36 overflow-hidden rounded-xl border border-customBlue border-opacity-30 bg-white transition duration-300 ease-out'
                    )}
                >
                    {options.map((option) => (
                        <li
                            key={option}
                            className='cursor-pointer p-2 hover:bg-gray-100'
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

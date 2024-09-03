import { SvgType } from './types';

export default function XSvg({ width = 12, height = 12, color = '#FF7171' }: SvgType) {
    return (
        <svg
            width={height}
            height={width}
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g id='Group 61'>
                <path
                    id='Line 3'
                    d='M2 2L10 10'
                    stroke={color}
                    strokeWidth='3'
                    strokeLinecap='round'
                />
                <path
                    id='Line 4'
                    d='M10 2L2 10'
                    stroke={color}
                    strokeWidth='3'
                    strokeLinecap='round'
                />
            </g>
        </svg>
    );
}

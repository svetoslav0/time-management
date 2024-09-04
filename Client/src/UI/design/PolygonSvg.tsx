import { SvgType } from './types';

export default function PolygonSvg({ width = 15, height = 12, color = '#A2A2A2' }: SvgType) {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 15 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                id='Polygon 1'
                d='M6.63398 0.499999C7.01888 -0.166668 7.98113 -0.166667 8.36603 0.5L13.9952 10.25C14.3801 10.9167 13.899 11.75 13.1292 11.75H1.87083C1.10103 11.75 0.619909 10.9167 1.00481 10.25L6.63398 0.499999Z'
                fill={color}
            />
        </svg>
    );
}

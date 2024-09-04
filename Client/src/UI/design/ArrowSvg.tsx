import { SvgType } from './types';

export default function ArrowSvg({ width = 28, height = 28, color = '#008CFF' }: SvgType) {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 28 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g id='ri:arrow-drop-down-line'>
                <path
                    id='Vector'
                    d='M16.7817 22.5981C15.2309 24.0989 12.7691 24.0989 11.2183 22.5981L2.41082 14.0748C1.09243 12.7989 1.09268 10.6848 2.41136 9.40924V9.40924C3.66998 8.19179 5.66741 8.19214 6.9256 9.41003L11.218 13.5649C12.7689 15.0662 15.2311 15.0662 16.782 13.5649L21.0744 9.41003C22.3326 8.19214 24.33 8.19179 25.5886 9.40924V9.40924C26.9073 10.6848 26.9076 12.7989 25.5892 14.0748L16.7817 22.5981Z'
                    fill={color}
                />
            </g>
        </svg>
    );
}

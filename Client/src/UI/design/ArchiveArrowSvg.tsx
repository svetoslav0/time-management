import { SvgType } from './types';

export default function ArchiveArrowSvg({ width = 105, height = 148, color = 'white' }: SvgType) {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 105 148'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                id='Arrow 6'
                d='M35.9896 145.01C39.3091 148.33 44.691 148.33 48.0104 145.01L102.104 90.9167C105.424 87.5973 105.424 82.2154 102.104 78.8959C98.7846 75.5765 93.4027 75.5765 90.0833 78.8959L42 126.979L-6.08326 78.8959C-9.40271 75.5765 -14.7846 75.5765 -18.1041 78.8959C-21.4235 82.2154 -21.4235 87.5973 -18.1041 90.9167L35.9896 145.01ZM33.5 3.71547e-07L33.5 139L50.5 139L50.5 -3.71547e-07L33.5 3.71547e-07Z'
                fill={color}
                fillOpacity='0.3'
            />
        </svg>
    );
}

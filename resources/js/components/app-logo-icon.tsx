import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 4a4 4 0 100 8 4 4 0 000-8zM9.5 8a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 14.5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2V20h2v-5.5c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5V20h2v-5.5z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 19h-3v-2h3v-8h-4V7h4c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 19H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h4v2H4v8h3v2z"
            />
        </svg>
    );
}

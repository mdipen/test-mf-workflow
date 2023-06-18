import * as React from 'react';

interface Data {
    linkData?: any;
}

const Link: React.FC<Data> = ({ linkData }) => {
    return (
        <a
            href={linkData.url}
            target="_blank"
            rel="noreferrer"
            className={`primary-outline-btn mb-4`}
        >
            {linkData.data}
        </a>
    );
};
export default Link;

import * as React from 'react';

interface Data {
    downloadBlock: any;
    taskId: string;
}
const Download: React.FC<Data> = ({ downloadBlock }) => {
    return (
        <a
            target="_blank"
            href={downloadBlock && downloadBlock.url}
            rel="noreferrer"
            className={`download-component`}
        >
            {downloadBlock.data}
        </a>
    );
};
export default Download;

import * as React from 'react';
interface Data {
    loaderFirstText?: string;
    loaderSecondText?: string;
    position?: string;
    transparent?: boolean;
}

const WorkflowLoader: React.FC<Data> = ({
    loaderFirstText,
    loaderSecondText,
    transparent,
    position,
}) => {
    return (
        <div
            className={`workflow-loader-wrapper ${position} ${
                transparent ? 'transparent' : ''
            }`}
        >
            <div className="workflow-loader"></div>
            <div className="workflow-loader-text">{loaderFirstText}</div>
            <div className="workflow-loader-text mt-0">{loaderSecondText}</div>
        </div>
    );
};
export default WorkflowLoader;

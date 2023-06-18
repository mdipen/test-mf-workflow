import * as React from 'react';
const Link: any = (props) => {
    return (
        <>
            <link
                onLoad={() => {
                    props.setShowCssLoader(false);
                }}
                onError={() => {
                    props.setShowCssLoader(false);
                }}
                rel="stylesheet"
                type="text/css"
                href={props.externalCssLink}
            />
        </>
    );
};

export default Link;

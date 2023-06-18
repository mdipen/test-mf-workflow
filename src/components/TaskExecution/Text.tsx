import * as React from 'react';

interface Data {
    data?: any;
}

const Text: React.FC<Data> = ({ data }) => {
    const outPutString = (inputString) => {
        if (inputString.length) {
            return inputString.split(`\\n`).map((item, index) => {
                return (
                    <p key={index} style={{ marginBottom: 0 }}>
                        {item.trim()}
                    </p>
                );
            });
        }
        return '';
    };
    return (
        <div className="form-text mb-2" style={{ whiteSpace: 'pre-wrap' }}>
            {outPutString(data.data)}
        </div>
    );
};
export default Text;

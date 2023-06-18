import * as React from 'react';
import ReactPlayer from 'react-player';

interface Data {
    videoData?: any;
}

const Video: React.FC<Data> = ({ videoData }) => {
    const [playing, setPlaying] = React.useState(false);
    return (
        <div className="video-comp-wrapper">
            <div className="react-player-wrap mb-2">
                <ReactPlayer
                    playing={playing}
                    controls={true}
                    onPause={() => {
                        setPlaying(false);
                    }}
                    onPlay={() => {
                        setPlaying(true);
                    }}
                    url={videoData.url}
                    width="100%"
                    height="294px"
                />
            </div>
            <button
                className="primary-btn mb-4"
                onClick={() => {
                    setPlaying(true);
                }}
            >
                {videoData.data}
            </button>
        </div>
    );
};
export default Video;

import * as React from 'react';
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';

interface Data {
    show?: boolean;
    onHide?: () => void;
}

const WelcomeModal: React.FC<Data> = ({ show, onHide }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName="workflow-modal-dialog-wrap"
            contentClassName="workflow-modal-content-wrap"
            // size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="workflow-modal-header-wrap">
                <Modal.Title id="contained-modal-title-vcenter">
                    Welcome Webinar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="modal-des mb-24">
                    Watch the current recorded GoHybridIT program welcome video
                    to review program benefits, GoHybridIT portal navigation and
                    the HybridIT highway.
                </p>
                <p className="modal-des mb-16">
                    Watch the video until the end so we can validate that this
                    step has been completed
                </p>
                <div className="react-player-wrap mb-24">
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                        width="100%"
                        height="294px"
                    />
                </div>
                <button type="button" className="primary-btn btn-large">
                    Play Video
                </button>
            </Modal.Body>
        </Modal>
    );
};
export default WelcomeModal;

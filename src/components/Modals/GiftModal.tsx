import * as React from 'react';
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';

interface Data {
    show?: boolean;
    onHide?: () => void;
}

const GiftModal: React.FC<Data> = ({ show, onHide }) => {
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
                    e-gift
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="gift-svg mb-24 d-flex justify-content-center">
                    <svg
                        width="42"
                        height="30"
                        viewBox="0 0 42 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 0H12V6.255C11.1987 5.97091 10.3333 5.91964 9.504 6.10713C8.67473 6.29462 7.91555 6.71319 7.31437 7.31437C6.71319 7.91555 6.29462 8.67473 6.10713 9.504C5.91964 10.3333 5.97091 11.1987 6.255 12H0V6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0ZM15 17.121L18.438 20.562C18.7197 20.8437 19.1017 21.0019 19.5 21.0019C19.8983 21.0019 20.2803 20.8437 20.562 20.562C20.8437 20.2803 21.0019 19.8983 21.0019 19.5C21.0019 19.1017 20.8437 18.7197 20.562 18.438L17.121 15H42V24C42 25.5913 41.3679 27.1174 40.2426 28.2426C39.1174 29.3679 37.5913 30 36 30H15V17.121ZM9.879 15L6.438 18.438C6.15634 18.7197 5.99811 19.1017 5.99811 19.5C5.99811 19.8983 6.15634 20.2803 6.438 20.562C6.71966 20.8437 7.10167 21.0019 7.5 21.0019C7.89833 21.0019 8.28034 20.8437 8.562 20.562L12 17.121V30H6C4.4087 30 2.88258 29.3679 1.75736 28.2426C0.632141 27.1174 0 25.5913 0 24V15H9.879ZM20.745 12C21.0291 11.1987 21.0804 10.3333 20.8929 9.504C20.7054 8.67473 20.2868 7.91555 19.6856 7.31437C19.0845 6.71319 18.3253 6.29462 17.496 6.10713C16.6667 5.91964 15.8013 5.97091 15 6.255V0H36C37.5913 0 39.1174 0.632141 40.2426 1.75736C41.3679 2.88258 42 4.4087 42 6V12H20.745ZM15 10.5V12H16.5C16.7967 12 17.0867 11.912 17.3334 11.7472C17.58 11.5824 17.7723 11.3481 17.8858 11.074C17.9994 10.7999 18.0291 10.4983 17.9712 10.2074C17.9133 9.91639 17.7704 9.64912 17.5607 9.43934C17.3509 9.22956 17.0836 9.0867 16.7926 9.02882C16.5017 8.97094 16.2001 9.00065 15.926 9.11418C15.6519 9.22771 15.4176 9.41997 15.2528 9.66664C15.088 9.91332 15 10.2033 15 10.5ZM12 10.5V12H10.5C10.2033 12 9.91332 11.912 9.66664 11.7472C9.41997 11.5824 9.22771 11.3481 9.11418 11.074C9.00065 10.7999 8.97094 10.4983 9.02882 10.2074C9.0867 9.91639 9.22956 9.64912 9.43934 9.43934C9.64912 9.22956 9.91639 9.0867 10.2074 9.02882C10.4983 8.97094 10.7999 9.00065 11.074 9.11418C11.3481 9.22771 11.5824 9.41997 11.7472 9.66664C11.912 9.91332 12 10.2033 12 10.5Z"
                            fill="#0172C0"
                        />
                    </svg>
                </div>

                <p className="modal-des text-center mb-16">
                    Earn an instant $25 Amazon e-gift card for taking this break
                    during your Highway journey to learn about HPE Infosight.
                    Watch the 6 minute HPE Infosight 100 Basics video and
                    complete the short quiz.
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
export default GiftModal;

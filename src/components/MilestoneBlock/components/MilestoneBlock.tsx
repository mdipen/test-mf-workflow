import { t } from 'i18next';
import * as React from 'react';
import Carousel from 'react-multi-carousel';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { responsive } from '../../../common/types';
import { getSpecificLengthChar } from '../../../utils/helper';
import { STATUS } from '../../../utils/constants';
import { useQuery } from '../../../common/query.params';
interface Data {
    milestones: Array<any>;
    setCurrentMileStoneId: (m) => void;
    mileStoneIdToStart: string;
    currentMileStoneId: any;
}

const MileStoneBlock: React.FC<Data> = ({
    milestones,
    setCurrentMileStoneId,
    mileStoneIdToStart,
    currentMileStoneId,
}) => {
    let carousel = null;
    const query = useQuery();
    const [milestoneActive, setMilestoneActive] = React.useState(
        query.get('milestoneId') ? query.get('milestoneId') : null,
    );
    React.useEffect(() => {
        if (!milestoneActive) {
            return;
        }
        const index = milestones.findIndex((x) => x._id === milestoneActive);
        let page = index / 4;
        if (page % 1 !== 0) {
            page = Math.floor(page);
        }
        carousel && carousel.goToSlide(page, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const popoverHoverFocus = (milestoneShortDesc, tasks) => {
        return (
            <Popover
                id="popover-trigger-hover-focus"
                className="popover-hover-card"
            >
                <h6>{milestoneShortDesc}</h6>
                {tasks.length && (
                    <>
                        <ul>
                            {tasks
                                .filter((_val, i) => i < 7)
                                .map((task) => {
                                    return (
                                        <li key={task._id}>
                                            {getSpecificLengthChar(
                                                task.shortDescription,
                                                80,
                                            )}
                                        </li>
                                    );
                                })}
                        </ul>
                        <span>{tasks.length > 7 && '...'}</span>
                    </>
                )}
            </Popover>
        );
    };

    const ArrowFix = (arrowProps) => {
        const { carouselState, children, btnClassName, ...restArrowProps } =
            arrowProps;
        return (
            <span className={btnClassName} {...restArrowProps}>
                {children}
            </span>
        );
    };

    const statusClass = (milestone) => {
        if (
            milestone.status !== STATUS.notStarted ||
            milestone._id === mileStoneIdToStart
        ) {
            return milestone.status;
        }
        return '';
    };

    const getMileStoneCTAText = (milestone) => {
        // if (milestone._id === mileStoneIdToStart) {
        //     return t('startTasks');
        // }
        if (
            milestone.status === STATUS.inProgress ||
            milestone.status === STATUS.notStarted
        ) {
            return t('completeNewTasks');
        }
        return `${t('completedTasks')} ${milestone.name}`;
    };

    return (
        <div className="card-slider-wrap">
            <Carousel
                partialVisible={false}
                ref={(el) => (carousel = el)}
                responsive={responsive}
                autoPlay={false}
                shouldResetAutoplay={false}
                containerClass="carousel-workflow-slider"
                itemClass="carousel-workflow-slider-item"
                customLeftArrow={
                    <ArrowFix btnClassName="customLeftArrow">
                        <svg
                            width="37"
                            height="37"
                            viewBox="0 0 37 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M31.184 31.1838C34.5596 27.8081 36.4561 23.2297 36.4561 18.4558C36.4561 13.6819 34.5596 9.10358 31.184 5.72792C27.8083 2.35227 23.23 0.455844 18.4561 0.455844C13.6822 0.455844 9.10379 2.35227 5.72813 5.72792C2.35248 9.10358 0.456055 13.6819 0.456055 18.4558C0.456055 23.2297 2.35248 27.8081 5.72813 31.1838C9.10379 34.5594 13.6822 36.4558 18.4561 36.4558C23.23 36.4558 27.8083 34.5594 31.184 31.1838ZM26.2503 17.331C26.3997 17.3284 26.5481 17.3556 26.6868 17.411C26.8255 17.4663 26.9519 17.5488 27.0584 17.6535C27.165 17.7582 27.2496 17.8831 27.3073 18.0208C27.3651 18.1586 27.3949 18.3065 27.3949 18.4558C27.3949 18.6052 27.3651 18.7531 27.3074 18.8909C27.2496 19.0286 27.165 19.1535 27.0584 19.2582C26.9519 19.3629 26.8255 19.4454 26.6868 19.5007C26.5481 19.5561 26.3997 19.5833 26.2503 19.5807L13.2169 19.5807L17.6208 23.9845C17.8318 24.1955 17.9503 24.4817 17.9503 24.78C17.9503 25.0784 17.8318 25.3645 17.6208 25.5755C17.4098 25.7865 17.1237 25.905 16.8253 25.905C16.5269 25.905 16.2408 25.7865 16.0298 25.5755L9.70561 19.2513C9.49463 19.0404 9.3761 18.7542 9.3761 18.4558C9.3761 18.1575 9.49463 17.8713 9.70561 17.6603L16.0298 11.3362C16.2408 11.1252 16.5269 11.0067 16.8253 11.0067C17.1237 11.0067 17.4098 11.1252 17.6208 11.3362C17.8318 11.5471 17.9503 11.8333 17.9503 12.1317C17.9503 12.43 17.8318 12.7162 17.6208 12.9272L13.2169 17.331L26.2503 17.331Z"
                                fill="#00AB86"
                            />
                        </svg>
                    </ArrowFix>
                }
                customRightArrow={
                    <ArrowFix btnClassName="customRightArrow">
                        <svg
                            width="37"
                            height="37"
                            viewBox="0 0 37 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.67638 31.1838C2.30072 27.8081 0.404297 23.2297 0.404297 18.4558C0.404297 13.6819 2.30072 9.10358 5.67638 5.72792C9.05203 2.35227 13.6304 0.455844 18.4043 0.455844C23.1782 0.455844 27.7566 2.35227 31.1322 5.72792C34.5079 9.10358 36.4043 13.6819 36.4043 18.4558C36.4043 23.2297 34.5079 27.8081 31.1322 31.1838C27.7566 34.5594 23.1782 36.4558 18.4043 36.4558C13.6304 36.4558 9.05203 34.5594 5.67638 31.1838ZM10.61 17.331C10.4607 17.3284 10.3123 17.3556 10.1735 17.411C10.0348 17.4663 9.90848 17.5488 9.80193 17.6535C9.69539 17.7582 9.61077 17.8831 9.553 18.0208C9.49524 18.1586 9.46549 18.3065 9.46549 18.4558C9.46549 18.6052 9.49524 18.7531 9.553 18.8909C9.61077 19.0286 9.69539 19.1535 9.80193 19.2582C9.90848 19.3629 10.0348 19.4454 10.1735 19.5007C10.3123 19.5561 10.4607 19.5833 10.61 19.5807L23.6434 19.5807L19.2396 23.9845C19.0286 24.1955 18.9101 24.4817 18.9101 24.78C18.9101 25.0784 19.0286 25.3645 19.2396 25.5755C19.4505 25.7865 19.7367 25.905 20.0351 25.905C20.3334 25.905 20.6196 25.7865 20.8306 25.5755L27.1547 19.2513C27.3657 19.0404 27.4842 18.7542 27.4842 18.4558C27.4842 18.1575 27.3657 17.8713 27.1547 17.6603L20.8306 11.3362C20.6196 11.1252 20.3334 11.0067 20.0351 11.0067C19.7367 11.0067 19.4505 11.1252 19.2396 11.3362C19.0286 11.5471 18.9101 11.8333 18.9101 12.1317C18.9101 12.43 19.0286 12.7162 19.2396 12.9272L23.6434 17.331L10.61 17.331Z"
                                fill="#00AB86"
                            />
                        </svg>
                    </ArrowFix>
                }
            >
                {milestones &&
                    milestones.length &&
                    milestones.map((milestone) => {
                        const totalTasks =
                            milestone.tasks && milestone.tasks.length;
                        let completedTasks = 0;
                        if (milestone.tasks && milestone.tasks.length) {
                            milestone.tasks.forEach((task) => {
                                if (task.status === STATUS.completed) {
                                    completedTasks++;
                                }
                            });
                        }
                        return (
                            <OverlayTrigger
                                trigger={['hover', 'focus']}
                                rootClose
                                placement="auto"
                                key={milestone._id}
                                overlay={popoverHoverFocus(
                                    `${milestone.name} ${t('taskList')}`,
                                    milestone.tasks,
                                )}
                            >
                                <div
                                    className={`wf-milestone-block ${
                                        currentMileStoneId === milestone._id
                                            ? 'wf-active'
                                            : ''
                                    } ${
                                        milestone._id === mileStoneIdToStart &&
                                        !currentMileStoneId
                                            ? 'wf-active'
                                            : ''
                                    }`}
                                    key={milestone._id}
                                    onClick={() => {
                                        setMilestoneActive(milestone._id);
                                        setCurrentMileStoneId(milestone._id);
                                    }}
                                >
                                    <div className="wf-milestone-block-wrap">
                                        <div className="wf-milestone-block-name">
                                            {milestone.name}
                                        </div>
                                        {statusClass(milestone) && (
                                            <div
                                                className={`wf-milestone-block-status ${statusClass(
                                                    milestone,
                                                )}`}
                                            >
                                                {statusClass(milestone) ===
                                                STATUS.notStarted
                                                    ? t('startTask')
                                                    : t(statusClass(milestone))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="wf-milestone-block-info">
                                        <span className="wf-milestone-block-title">
                                            <span className="wf-milestone-block-title-ellipse">
                                                {milestone.shortDescription}
                                            </span>
                                        </span>
                                        <span className="wf-milestone-block-count">
                                            {`${completedTasks}/${totalTasks}`}
                                        </span>
                                        <span className="wf-milestone-block-description">
                                            {t('taskCompleted')}
                                        </span>
                                    </div>
                                    {milestone.externalLink && (
                                        <a
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            href={milestone.externalLink.url}
                                        >
                                            {milestone.externalLink.name}
                                        </a>
                                    )}
                                    <button
                                        type="button"
                                        className="wf-milestone-block-button"
                                    >
                                        {getMileStoneCTAText(milestone)}
                                    </button>
                                </div>
                            </OverlayTrigger>
                        );
                    })}
            </Carousel>
        </div>
    );
};
export default MileStoneBlock;

import { t } from 'i18next';
import * as React from 'react';
import { useSelector } from 'react-redux';

import TaskExecutionModal from '../../TaskExecution/TaskExecutionModal';
import { BUILDING_BLOCK, constants, STATUS } from '../../../utils/constants';
import { isDependentTaskComplete } from '../../../common/validation';
import HtmlReactParser from 'html-react-parser';

interface TaskData {
    name: string;
    shortDescription: string;
    status: string;
    _id: string;
    content: any[];
    rewardsDetails: RewardsDetails;
    isTaskCompletedbyCurrentUser: boolean;
    isTaskRewardsType: boolean;
}

interface Data {
    task: TaskData;
    taskToStart: boolean;
    isDependentMilestoneComplete: boolean;
}
interface RewardsDetails {
    rewardPoints: number;
    isComplete: boolean;
    rewardedToUserId: number;
}

const Task: React.FC<Data> = ({
    task,
    taskToStart,
    isDependentMilestoneComplete,
}) => {
    const buttonList = [];
    const isTaskCompleted = task.status === STATUS.completed;
    // TODO need to add validation to check the task completd by which user
    const isTaskCompletedbyCurrentUser =
        task.isTaskCompletedbyCurrentUser ?? false;
    let taskRewardsPointButtonText;

    const isTaskHasRewadsPoint = task.isTaskRewardsType ?? false;

    if (isTaskHasRewadsPoint) {
        taskRewardsPointButtonText =
            ' ' + task.rewardsDetails.rewardPoints + t('points');
    }

    const getTaskButtons = () => {
        task.content.forEach((c) => {
            switch (c.type) {
                case BUILDING_BLOCK.LINK:
                case BUILDING_BLOCK.VIDEO:
                case BUILDING_BLOCK.DOWNLOAD:
                    buttonList.push(c.data);
                    return;
                case BUILDING_BLOCK.FORM:
                    buttonList.push(c.data.submitText);
                    return;
                case BUILDING_BLOCK.UPLOAD:
                    buttonList.push(c.data.uploadText);
                    return;
            }
        });
    };
    getTaskButtons();

    const [showModal, setShowModal] = React.useState(false);

    const workflow = useSelector((state: any) => {
        return state.workflow.data && state.workflow.data.data;
    });

    const statusClass = () => {
        if (
            !isDependentTaskComplete(task, workflow) ||
            !isDependentMilestoneComplete
        ) {
            return 'disabled';
        }
        if (task.status !== STATUS.notStarted || taskToStart) {
            return task.status;
        }
        return '';
    };

    const getActionLabels = () => {
        let counter = 0;
        let extraLabels = 0;
        const actionLabeles = [];

        if (isTaskHasRewadsPoint) {
            counter++;

            const rewardButton = () => {
                const iconString = isTaskCompleted
                    ? constants.rightMarkIcon
                    : constants.starMarkIcon;
                const cssClssNameForIcon = isTaskCompletedbyCurrentUser
                    ? 'wf-task-completed-by-current-user-btn'
                    : isTaskCompleted
                    ? 'wf-task-completed-by-other-user-btn '
                    : 'wf-task-not-completed-btn';

                return (
                    <button
                        key={counter}
                        type="button"
                        className={cssClssNameForIcon}
                    >
                        {HtmlReactParser(iconString)}
                        {taskRewardsPointButtonText}
                    </button>
                );
            };
            actionLabeles.push(rewardButton());
        }

        buttonList.forEach((button) => {
            counter++;
            if (counter > constants.maxActionLabelsOnTaskCard) {
                extraLabels++;
                return;
            }
            actionLabeles.push(
                <button
                    key={counter}
                    type="button"
                    className="wf-leg-list-card-btn"
                >
                    {button}
                </button>,
            );
        });
        if (extraLabels > 0) {
            actionLabeles.push(
                <button
                    key="extraLabels"
                    type="button"
                    className="wf-leg-list-card-btn wf-leg-list-card-extra-labels-btn"
                >
                    +{extraLabels}
                </button>,
            );
        }
        return actionLabeles;
    };
    return (
        <>
            <div
                className={`wf-leg-list-card ${statusClass()} ${
                    taskToStart && isDependentMilestoneComplete ? 'active' : ''
                }`}
                onClick={() => {
                    setShowModal(true);
                }}
            >
                <div className="wf-leg-list-card-title">
                    {task.shortDescription}
                </div>
                <div className="wf-leg-list-card-action">
                    {getActionLabels()}
                    <span
                        className={`wf-leg-list-card-status ${statusClass()}`}
                    >
                        {task.status === STATUS.notStarted
                            ? t('startTask')
                            : t(task.status)}
                    </span>
                </div>
            </div>
            {showModal && (
                <TaskExecutionModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    taskId={task._id}
                />
            )}
        </>
    );
};

export default Task;

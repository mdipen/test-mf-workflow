import * as React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';

import Task from '../../Tasks/component/Task';
import { IMileStone } from '../../../common/interface';
import { STATUS } from '../../../utils/constants';

interface Data {
    mileStone: IMileStone;
    isDependentMilestoneComplete: boolean;
    isLastMilestone: boolean;
    navigateToCTALink: any;
}

const Milestone: React.FC<Data> = ({
    mileStone,
    isDependentMilestoneComplete,
    isLastMilestone,
    navigateToCTALink,
}) => {
    const { t } = useTranslation();
    let taskIdToStart = '';
    let hasInProgressTask = false;
    mileStone.tasks.forEach((task) => {
        if (task.status === STATUS.inProgress) {
            hasInProgressTask = true;
        }
    });
    if (!hasInProgressTask) {
        for (const task of mileStone.tasks) {
            if (task.status === STATUS.notStarted) {
                taskIdToStart = task._id;
                break;
            }
        }
    }
    let unlockMilestoneMessage = t('pleaseCompleteMilestoneToUnlockDependent');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unlockMilestoneMessage = unlockMilestoneMessage.replace(
        '{0}',
        mileStone.name,
    );
    return (
        <div className="wf-leg-card-wrap">
            {!isDependentMilestoneComplete && (
                <div className="wf-unlock-label">
                    {t('pleaseCompleteDependentMilestone')}
                </div>
            )}
            <div className="wf-leg-card">
                <div className="wf-leg-card-heading">
                    {`${t('completeTheseTasksFor')} ${mileStone.name}`}
                </div>
                <div className="wf-leg-card-progress-wrap">
                    <div className="wf-leg-card-progress-info">
                        <span className="wf-leg-card-progress-info-label">
                            {t('progress')}
                        </span>
                        <span className="wf-leg-card-progress-info-count">
                            {mileStone.currentProgress}%
                        </span>
                    </div>
                    <ProgressBar
                        className="wf-leg-card-progress-bar"
                        now={mileStone.currentProgress}
                    />
                </div>
                <div className="wf-leg-list-card-wrap">
                    <Scrollbars style={{ height: `calc(100% - 70px)` }}>
                        {mileStone.tasks &&
                            mileStone.tasks.map((task) => (
                                <Task
                                    task={task}
                                    key={task._id}
                                    taskToStart={task._id === taskIdToStart}
                                    isDependentMilestoneComplete={
                                        isDependentMilestoneComplete
                                    }
                                />
                            ))}
                        {mileStone.milestoneCTA &&
                            mileStone.milestoneCTA.text &&
                            mileStone.status === STATUS.completed && (
                                <div
                                    className={
                                        isLastMilestone
                                            ? 'wf-leg-list-cta-card wf-leg-list-last-cta-card'
                                            : 'wf-leg-list-cta-card'
                                    }
                                    onClick={() => navigateToCTALink(mileStone)}
                                >
                                    <span className="wf-leg-list-cta-image"></span>
                                    {mileStone.milestoneCTA.text}
                                </div>
                            )}
                    </Scrollbars>
                </div>
            </div>
        </div>
    );
};
export default Milestone;

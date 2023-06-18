import { STATUS } from '../utils/constants';

export const isDependentTaskComplete: any = (task, workflow): boolean => {
    if (task.dependentTasks && workflow && workflow.milestones) {
        const mile = workflow.milestones.find(
            (item: any) => item._id === task.milestones,
        );
        if (mile && mile.tasks) {
            const mileTask = mile.tasks.find(
                (ele: any) => ele._id === task.dependentTasks,
            );
            return mileTask && mileTask.status === STATUS.completed;
        }
    }
    return true;
};

export const isDependentMilestoneComplete: any = (
    ms: any,
    workflow: any,
): boolean => {
    if (ms.dependentMilestones && workflow && workflow.milestones) {
        const mile = workflow.milestones.find(
            (item: any) => item._id === ms.dependentMilestones,
        );
        return mile && mile.status === STATUS.completed;
    }
    return true;
};

export const isLastWMilestone: any = (ms: any, workflow: any): boolean => {
    if (ms.sequence && workflow && workflow.milestones) {
        const lastMilestoneSequence = Math.max(
            ...workflow.milestones.map((m) => m.sequence),
        );
        return ms.sequence === lastMilestoneSequence;
    }
    return false;
};

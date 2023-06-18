import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { Toaster } from '../../utils/helper';
import { useParams } from 'react-router';
import { BUILDING_BLOCK, STATUS } from '../../utils/constants';
import Download from './Download';
import Form from './Form';
import Link from './Link';
import Text from './Text';
import Video from './Video';
import {
    clearTaskAction,
    getTaskAction,
    updateTaskAction,
} from '../Tasks/action/task.actions';
import {
    removeCompletedTask,
    updateTaskCompleteAction,
} from '../Tasks/action/updateTaskComplete.actions';
import {
    getWorkflowAction,
    updateWorkflowTask,
} from '../Workflow/action/getWorkflow.actions';
import { clearTaskBlock } from '../Tasks/action/updateTaskBlock.actions';
import WorkflowLoader from '../Loader/WorkflowLoader';
import Upload from './Upload';

interface Data {
    show?: boolean;
    onHide?: () => void;
    taskId?: string;
}

const TaskExecutionModal: React.FC<Data> = ({ show, onHide, taskId }) => {
    const params: any = useParams();
    const { id } = params;

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTaskAction(taskId));
        return () => {
            dispatch(clearTaskAction());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const task = useSelector((state: any) => {
        return state.task && state.task.data && state.task.data.data;
    });

    const workflow = useSelector((state: any) => {
        return state.workflow.data && state.workflow.data.data;
    });

    const taskBlockState = useSelector((state: any) => state.taskBlock);

    const taskBlock =
        taskBlockState && taskBlockState.data && taskBlockState.data.data;

    const taskContentType = taskBlockState && taskBlockState.contentType;

    React.useEffect(() => {
        if (taskBlock && taskBlock._id) {
            if (taskContentType === BUILDING_BLOCK.FORM) {
                Toaster.success(t('dataSubmittedSuccessfully'));
            }
            if (taskContentType === BUILDING_BLOCK.UPLOAD) {
                Toaster.success(t('fileUploadedSuccessfully'));
            }
            dispatch(updateTaskAction(taskBlock));
            // dispatch action to update the task in the main workflow data present in the store.
            dispatch(updateWorkflowTask(taskBlock));
            dispatch(clearTaskBlock());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskBlock]);

    const taskCompleted = useSelector((state: any) => {
        return state.taskComplete;
    });

    React.useEffect(() => {
        if (taskCompleted && taskCompleted.data && taskCompleted.data.data) {
            onHide();
            Toaster.success(taskCompleted.data.data.completionMessage);
            dispatch(removeCompletedTask());
            dispatch(getWorkflowAction(workflow && workflow._id));
            dispatch(clearTaskAction());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskCompleted]);

    const isDoneDisabled = () => {
        if (taskCompleted && taskCompleted.loading) {
            return true;
        }
        if (task && task.status === STATUS.completed) {
            return true;
        }
        if (task && task.content) {
            const filteredContents = task.content.filter(
                (item: any) =>
                    item.type === BUILDING_BLOCK.UPLOAD ||
                    item.type === BUILDING_BLOCK.FORM,
            );
            if (filteredContents === 0) {
                return false;
            }

            const filteredCount = filteredContents.length;
            let completedCount = 0;
            for (let i = 0; i < filteredCount; i++) {
                completedCount += filteredContents[i].isCompleted ? 1 : 0;
            }
            return filteredCount !== completedCount;
        }
        return false;
    };

    const isTaskCompleted = task && task.status === STATUS.completed;

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                dialogClassName="workflow-modal-dialog-wrap"
                contentClassName="workflow-modal-content-wrap"
                // size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {taskBlockState.loading && (
                    <WorkflowLoader transparent={true} />
                )}
                {task && (
                    <>
                        <Modal.Header
                            closeButton
                            className="workflow-modal-header-wrap"
                        >
                            <Modal.Title id="contained-modal-title-vcenter">
                                {task.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="task-desciption mb-4">
                                {task.description}
                            </div>
                            {task.content &&
                                task.content.map((item, index) => {
                                    switch (item.type) {
                                        case BUILDING_BLOCK.FORM:
                                            return (
                                                <Form
                                                    key={`block-${index}`}
                                                    formData={item}
                                                    taskId={task._id}
                                                    isTaskCompleted={
                                                        isTaskCompleted
                                                    }
                                                />
                                            );

                                        case BUILDING_BLOCK.TEXT:
                                            return (
                                                <Text
                                                    key={`block-${index}`}
                                                    data={item}
                                                />
                                            );

                                        case BUILDING_BLOCK.VIDEO:
                                            return (
                                                <Video
                                                    key={`block-${index}`}
                                                    videoData={item}
                                                />
                                            );

                                        case BUILDING_BLOCK.LINK:
                                            return (
                                                <Link
                                                    key={`block-${index}`}
                                                    linkData={item}
                                                />
                                            );

                                        case BUILDING_BLOCK.DOWNLOAD:
                                            return (
                                                <Download
                                                    key={`block-${index}`}
                                                    downloadBlock={item}
                                                    taskId={task._id}
                                                />
                                            );

                                        case BUILDING_BLOCK.UPLOAD:
                                            return (
                                                <Upload
                                                    key={`block-${index}`}
                                                    uploadData={item}
                                                    taskId={task._id}
                                                    isTaskCompleted={
                                                        isTaskCompleted
                                                    }
                                                />
                                            );

                                        default:
                                            return null;
                                    }
                                })}
                            <div className="mark-complete-btn-wrap">
                                <button
                                    className="mark-complete-btn"
                                    onClick={() =>
                                        dispatch(
                                            updateTaskCompleteAction(taskId, {
                                                workflowId: id,
                                            }),
                                        )
                                    }
                                    disabled={isDoneDisabled()}
                                >
                                    {isTaskCompleted
                                        ? t('completed')
                                        : t('markComplete')}
                                </button>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    );
};
export default TaskExecutionModal;

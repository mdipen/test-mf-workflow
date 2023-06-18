import { HttpMethod } from '../../../common/resources';
import { IActionGenerator } from '../../../common/interface';
import { URLS } from '../../../common/urls';
import { CALL_API } from '../../../middlewares/api';
import { getBase } from '../../../services/api';

export const GET_TASK_REQUEST = 'GET_TASK_REQUEST';
export const GET_TASK_SUCCESS = 'GET_TASK_SUCCESS';
export const GET_TASK_FAILURE = 'GET_TASK_FAILURE';

export const UPDATE_TASK = 'UPDATE_TASK';
export const CLEAR_TASK = 'CLEAR_TASK';

export const getTask = (id: string): IActionGenerator => {
    let taskUrl = getBase() + URLS.GET_TASK_URL;
    taskUrl = taskUrl.replace('{id}', id);
    return {
        [CALL_API]: {
            types: [GET_TASK_REQUEST, GET_TASK_SUCCESS, GET_TASK_FAILURE],
            url: taskUrl,
            method: HttpMethod.GET,
        },
        actionData: {
            errorMessage: 'Fetch Task Details Failed',
        },
    };
};

export const updateTaskAction: any = (updatedTask) => {
    return { type: UPDATE_TASK, response: { task: updatedTask } };
};

export const clearTaskAction: any = () => {
    return { type: CLEAR_TASK, response: {} };
};

export const getTaskAction = (id: string): IActionGenerator => {
    return getTask(id);
};

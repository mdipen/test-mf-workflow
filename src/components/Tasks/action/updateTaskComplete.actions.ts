import { HttpMethod } from '../../../common/resources';
import { IPostActionGenerator } from '../../../common/interface';
import { URLS } from '../../../common/urls';
import { CALL_API } from '../../../middlewares/api';
import { getBase } from '../../../services/api';

export const POST_TASK_COMPLETE_REQUEST = 'POST_TASK_COMPLETE_REQUEST';
export const POST_TASK_COMPLETE_SUCCESS = 'POST_TASK_COMPLETE_SUCCESS';
export const POST_TASK_COMPLETE_FAILURE = 'POST_TASK_COMPLETE_FAILURE';

export const REMOVE_COMPLETED_TASK = 'REMOVE_COMPLETED_TASK';

export const updateTaskComplete: any = (
    id: string,
    data: any,
): IPostActionGenerator => {
    let taskCompleteUrl = getBase() + URLS.GET_TASK_COMPLETE_URL;
    taskCompleteUrl = taskCompleteUrl.replace('{id}', id);
    return {
        [CALL_API]: {
            types: [
                POST_TASK_COMPLETE_REQUEST,
                POST_TASK_COMPLETE_SUCCESS,
                POST_TASK_COMPLETE_FAILURE,
            ],
            url: taskCompleteUrl,
            data: data,
            isFile: false,
            method: HttpMethod.POST,
        },
        actionData: {
            errorMessage: 'Fetch Task Details Failed',
        },
    };
};

export const removeCompletedTask: any = () => {
    return { type: REMOVE_COMPLETED_TASK };
};

export const updateTaskCompleteAction: any = (
    id: string,
    data: any,
): IPostActionGenerator => {
    return updateTaskComplete(id, data);
};

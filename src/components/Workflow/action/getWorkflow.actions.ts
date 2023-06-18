import { HttpMethod } from '../../../common/resources';
import { IActionGenerator } from '../../../common/interface';
import { URLS } from '../../../common/urls';
import { CALL_API } from '../../../middlewares/api';
import { getBase } from '../../../services/api';

export const GET_WORKFLOW_REQUEST = 'GET_WORKFLOW_REQUEST';
export const GET_WORKFLOW_SUCCESS = 'GET_WORKFLOW_SUCCESS';
export const GET_WORKFLOW_FAILURE = 'GET_WORKFLOW_FAILURE';

export const UPDATE_WORKFLOW_TASK = 'UPDATE_WORKFLOW_TASK';

export const getWorkflow = (id: string): IActionGenerator => {
    let getWorkflowUrl = getBase() + URLS.GET_WORKFLOW_URL;
    getWorkflowUrl = getWorkflowUrl.replace('{id}', id);
    return {
        [CALL_API]: {
            types: [
                GET_WORKFLOW_REQUEST,
                GET_WORKFLOW_SUCCESS,
                GET_WORKFLOW_FAILURE,
            ],
            url: getWorkflowUrl,
            method: HttpMethod.GET,
        },
        actionData: {
            errorMessage: 'Fetch WorkflowList Failed',
        },
    };
};

export const getWorkflowAction = (id: string): IActionGenerator => {
    return getWorkflow(id);
};

export const updateWorkflowTask: any = (task: any) => {
    return { type: UPDATE_WORKFLOW_TASK, response: task };
};

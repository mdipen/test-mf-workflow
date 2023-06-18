import { IPostActionGenerator, IUploadData } from '../../../common/interface';
import { HttpMethod } from '../../../common/resources';
import { URLS } from '../../../common/urls';
import { CALL_API } from '../../../middlewares/api';
import { getBase } from '../../../services/api';

export const PUT_TASKBLOCk_SUBMIT_REQUEST = 'PUT_TASKBLOCk_SUBMIT_REQUEST';
export const PUT_TASKBLOCk_SUBMIT_SUCCESS = 'PUT_TASKBLOCk_SUBMIT_SUCCESS';
export const PUT_TASKBLOCk_SUBMIT_FAILURE = 'PUT_TASKBLOCk_SUBMIT_FAILURE';

export const POST_TASKBLOCk_UPLOAD_REQUEST = 'POST_TASKBLOCk_UPLOAD_REQUEST';
export const POST_TASKBLOCk_UPLOAD_SUCCESS = 'POST_TASKBLOCk_UPLOAD_SUCCESS';
export const POST_TASKBLOCk_UPLOAD_FAILURE = 'POST_TASKBLOCk_UPLOAD_FAILURE';

export const CLEAR_TASK_BLOCK = 'CLEAR_TASK_BLOCK';

interface IClearTaskAction {
    type: string;
    response: Record<string, unknown>;
}
export const submitTaskBlock: any = (data: any): IPostActionGenerator => {
    let submitUrl = getBase() + URLS.POST_TASKBLOCK_SUBMIT_URL;
    submitUrl = submitUrl.replace('{id}', data && data._id ? data._id : 'null');
    return {
        [CALL_API]: {
            types: [
                PUT_TASKBLOCk_SUBMIT_REQUEST,
                PUT_TASKBLOCk_SUBMIT_SUCCESS,
                PUT_TASKBLOCk_SUBMIT_FAILURE,
            ],
            url: submitUrl,
            data: data,
            isFile: false,
            method: HttpMethod.POST,
        },
        actionData: {
            errorMessage: 'TaskBlock Submit Failed',
        },
    };
};

export const submitTaskBlockAction: any = (data): IPostActionGenerator => {
    return submitTaskBlock(data);
};

export const uploadTaskBlockAction = (
    taskId: string,
    data: IUploadData,
): IPostActionGenerator => {
    let uploadUrl = getBase() + URLS.POST_TASKBLOCK_UPLOAD_URL;
    uploadUrl = uploadUrl.replace('{id}', taskId);
    return {
        [CALL_API]: {
            types: [
                POST_TASKBLOCk_UPLOAD_REQUEST,
                POST_TASKBLOCk_UPLOAD_SUCCESS,
                POST_TASKBLOCk_UPLOAD_FAILURE,
            ],
            url: uploadUrl,
            data: data,
            isFile: true,
            method: HttpMethod.POST,
        },
        actionData: {
            errorMessage: 'TaskBlock Upload Failed',
        },
    };
};

export const clearTaskBlock = (): IClearTaskAction => {
    return { type: CLEAR_TASK_BLOCK, response: {} };
};

import { IReducerAction } from '../../../common/interface';
import { reducerType } from '../../../common/types';
import { BUILDING_BLOCK } from '../../../utils/constants';
import {
    PUT_TASKBLOCk_SUBMIT_REQUEST,
    PUT_TASKBLOCk_SUBMIT_SUCCESS,
    PUT_TASKBLOCk_SUBMIT_FAILURE,
    POST_TASKBLOCk_UPLOAD_REQUEST,
    POST_TASKBLOCk_UPLOAD_SUCCESS,
    POST_TASKBLOCk_UPLOAD_FAILURE,
    CLEAR_TASK_BLOCK,
} from '../action/updateTaskBlock.actions';

const updateTaskBlockReducer: reducerType = (state, action: IReducerAction) => {
    if (state === undefined) {
        state = {};
    }
    switch (action.type) {
        case PUT_TASKBLOCk_SUBMIT_REQUEST:
        case POST_TASKBLOCk_UPLOAD_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                data: {},
            });

        case PUT_TASKBLOCk_SUBMIT_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.response.data,
                contentType: BUILDING_BLOCK.FORM,
            });
        case PUT_TASKBLOCk_SUBMIT_FAILURE:
        case POST_TASKBLOCk_UPLOAD_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorDetails: {
                    errorMessage: action.error.errorMessage,
                    errorStatusCode: action.error.errorStatusCode,
                },
            });

        case POST_TASKBLOCk_UPLOAD_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.response.data,
                contentType: BUILDING_BLOCK.UPLOAD,
            });

        case CLEAR_TASK_BLOCK:
            return Object.assign({}, state, {
                loading: false,
                data: {},
            });
    }
    return state;
};

export default updateTaskBlockReducer;

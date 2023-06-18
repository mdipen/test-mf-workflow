import {
    POST_TASK_COMPLETE_SUCCESS,
    POST_TASK_COMPLETE_REQUEST,
    POST_TASK_COMPLETE_FAILURE,
    REMOVE_COMPLETED_TASK,
} from '../action/updateTaskComplete.actions';
import { getReducerType } from '../../../common/types';
import { IReducerAction } from '../../../common/interface';

const updateTaskCompleteReducer: getReducerType = (
    state,
    action: IReducerAction,
) => {
    if (state === undefined) {
        state = {};
    }
    switch (action.type) {
        case POST_TASK_COMPLETE_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                data: false,
            });

        case POST_TASK_COMPLETE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.response.data,
            });

        case POST_TASK_COMPLETE_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorDetails: {
                    errorMessage: action.error.errorMessage,
                    errorStatusCode: action.error.errorStatusCode,
                },
            });

        case REMOVE_COMPLETED_TASK:
            return Object.assign({}, state, {
                loading: false,
                data: {},
            });
    }
    return state;
};

export default updateTaskCompleteReducer;

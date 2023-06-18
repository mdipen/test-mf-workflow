import {
    GET_TASK_SUCCESS,
    GET_TASK_REQUEST,
    GET_TASK_FAILURE,
    UPDATE_TASK,
    CLEAR_TASK,
} from '../action/task.actions';
import { getReducerType } from '../../../common/types';
import { IReducerAction } from '../../../common/interface';

const getTaskReducer: getReducerType = (state, action: IReducerAction) => {
    if (state === undefined) {
        state = {};
    }
    switch (action.type) {
        case GET_TASK_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                data: {},
            });

        case GET_TASK_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.response.data,
            });
        case GET_TASK_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorDetails: {
                    errorMessage: action.error.errorMessage,
                    errorStatusCode: action.error.errorStatusCode,
                },
            });

        case UPDATE_TASK:
            const tempState = { ...state };
            tempState.data.data = action.response.task;
            return Object.assign({}, state, {
                ...tempState,
            });

        case CLEAR_TASK:
            return Object.assign({}, state, {
                loading: false,
                data: { data: {} },
            });
    }
    return state;
};

export default getTaskReducer;

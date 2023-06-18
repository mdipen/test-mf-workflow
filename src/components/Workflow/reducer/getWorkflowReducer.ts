import {
    GET_WORKFLOW_SUCCESS,
    GET_WORKFLOW_REQUEST,
    GET_WORKFLOW_FAILURE,
    UPDATE_WORKFLOW_TASK,
} from '../action/getWorkflow.actions';
import { getReducerType } from '../../../common/types';
import { IReducerAction } from '../../../common/interface';
import { STATUS } from '../../../utils/constants';

const getWorkflowReducer: getReducerType = (state, action: IReducerAction) => {
    if (state === undefined) {
        state = {};
    }
    switch (action.type) {
        case GET_WORKFLOW_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                data: state.data || {},
            });

        case GET_WORKFLOW_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.response.data,
            });
        case GET_WORKFLOW_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorDetails: {
                    errorMessage: action.error.errorMessage,
                    errorStatusCode: action.error.errorStatusCode,
                },
            });
        case UPDATE_WORKFLOW_TASK:
            const tempWorkflow = JSON.parse(JSON.stringify(state.data));
            tempWorkflow.data.milestones = tempWorkflow.data.milestones.map(
                (milestone) => {
                    if (milestone._id === action.response.milestones) {
                        milestone.tasks = milestone.tasks.map((task) => {
                            if (task._id === action.response._id) {
                                task = action.response;
                                if (milestone.status !== STATUS.inProgress) {
                                    milestone.status = STATUS.inProgress;
                                }
                            }
                            return task;
                        });
                    }
                    return milestone;
                },
            );
            return Object.assign({}, state, {
                loading: false,
                data: { ...tempWorkflow },
            });
    }
    return state;
};

export default getWorkflowReducer;

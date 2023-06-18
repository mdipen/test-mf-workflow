import { combineReducers } from 'redux';

import updateTaskCompleteReducer from '../components/Tasks/reducer/updateTaskCompleteReducer';
import getTaskReducer from '../components/Tasks/reducer/getTaskReducer';
import updateTaskBlockReducer from '../components/Tasks/reducer/updateTaskBlockReducer';
import getWorkflowReducer from '../components/Workflow/reducer/getWorkflowReducer';

export const reducerObject = {
    workflow: getWorkflowReducer,
    taskBlock: updateTaskBlockReducer,
    task: getTaskReducer,
    taskComplete: updateTaskCompleteReducer,
};

const rootReducer = combineReducers(reducerObject);

export default rootReducer;

import * as api from '../services/api';
import { Middleware, Store } from 'redux';
import { HttpStatus } from '../utils/constants';
export const CALL_API = 'Call API';
// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
//
const apiMiddleware: Middleware =
    (store: Store<any>) =>
    (next: any): any =>
    (action: any): any => {
        let callAPI = action[CALL_API];
        if (typeof callAPI === 'undefined') {
            return next(action);
        }
        callAPI = api.setHeaders(callAPI);
        let { url } = callAPI;
        const { types } = callAPI;
        if (typeof url === 'function') {
            url = url(store.getState());
        }

        if (typeof url !== 'string') {
            throw new Error('Specify a string endpoint URL.');
        }

        if (!Array.isArray(types) || types.length !== 3) {
            throw new Error('Expected an array of three action types.');
        }
        if (!types.every((type) => typeof type === 'string')) {
            throw new Error('Expected action types to be strings.');
        }
        function actionWith(data) {
            const finalAction = Object.assign({}, action, data);
            delete finalAction[CALL_API];
            return finalAction;
        }
        const [requestType, successType, failureType] = types;
        next(actionWith({ type: requestType }));
        if (callAPI.isFile) {
            const formData = new FormData();
            formData.append('data', JSON.stringify(callAPI.data.data));
            callAPI.data.file.forEach((el) => {
                formData.append('file', el);
            });
            callAPI.data = formData;
            callAPI.headers['Content-Type'] = 'multipart/form-data';
        }
        return api
            .callAPI(callAPI)
            .then((response) => {
                next(
                    actionWith({
                        response,
                        type: successType,
                        params: action.params,
                    }),
                );
            })
            .catch((error) => {
                handleError(error, next, actionWith, failureType, action);
            });
    };

const handleError = (error, next, actionWith, failureType, action) => {
    const errorStatusCode =
        (error && error.response && error.response.status) ||
        (error &&
            error.response &&
            error.response.data &&
            error.response.data.statusCode);
    if (
        errorStatusCode === HttpStatus.BAD_REQUEST ||
        errorStatusCode === HttpStatus.UNAUTHORIZED ||
        errorStatusCode === HttpStatus.FORBIDDEN ||
        errorStatusCode === HttpStatus.NOT_FOUND ||
        errorStatusCode === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
        const message =
            error.response.data.message || error.response.data.errMessage;
        next(
            actionWith({
                type: failureType,
                error: {
                    errorMessage: message || 'Failed To Perform Action',
                    errorStatusCode: errorStatusCode,
                },
                params: action.params,
            }),
        );
    } else {
        next(
            actionWith({
                type: failureType,
                error: {
                    errorMessage: 'Failed To Perform Action',
                    errorStatusCode:
                        errorStatusCode || HttpStatus.INTERNAL_SERVER_ERROR,
                },
                params: action.params,
            }),
        );
    }
};

export default apiMiddleware;

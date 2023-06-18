import { CALL_API } from '../middlewares/api';
import { STATUS } from '../utils/constants';
export interface IActionGenerator {
    [CALL_API]: {
        types: string[];
        url: string;
        method: string;
    };
    actionData: {
        errorMessage: string;
    };
}

export interface IPostActionGenerator {
    [CALL_API]: {
        types: string[];
        url: string;
        data: any;
        isFile: boolean;
        method: string;
    };
    actionData: {
        errorMessage: string;
    };
}

export interface IAction {
    type: string;
    action: any;
}

export interface ApiConfigInterface {
    protocol: string;
    host: string;
}

export interface IReducerAction {
    type: string;
    response: any;
    error?: any;
}

export interface IGetReducerAction {
    type: string;
    response: any;
}

export interface IMileStone {
    _id?: string;
    name?: string;
    shortDescription?: string;
    description?: string;
    progress?: number;
    tasks?: Array<any>;
    currentProgress?: number;
    milestoneCTA?: IMilestoneCTA;
    status: STATUS;
}

export interface IMilestoneCTA {
    link: string;
    text: string;
}

export interface IUploadData {
    file: any;
    data: {
        accountId: number;
        programIds: number[];
        sequence: number;
        type: string;
    };
}

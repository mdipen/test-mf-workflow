import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { ApiConfigInterface } from '../common/interface';

import { apiConfig } from '../config/apiConfig';

export const getBase: () => string = (
    config: ApiConfigInterface = apiConfig,
) => {
    return config.protocol + '://' + config.host;
};

export const callAPI: any = (requestConfig): Promise<AxiosResponse<any>> => {
    return axios(requestConfig);
};

export const setHeaders: any = (requestConfig) => {
    requestConfig['headers'] = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    const apiToken = Cookies.get('api_token') || localStorage.api_token;
    if (apiToken) {
        requestConfig['headers']['Authorization'] = 'Bearer ' + apiToken;
    }
    axios.defaults.headers.common['Authorization'] =
        requestConfig['headers']['Authorization'];
    return requestConfig;
};

import { IGetReducerAction, IReducerAction } from './interface';

export type reducerType = (
    state: any,
    action: IReducerAction,
) => {
    state: any;
};

export type getReducerType = (
    state: any,
    action: IGetReducerAction,
) => {
    state: any;
};

export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

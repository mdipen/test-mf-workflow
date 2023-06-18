import {
    SUCCESS_ICON,
    ERROR_ICON,
    WARNING_ICON,
    INFO_ICON,
} from '../assets/images/all-svg';
import { toast } from 'react-toastify';
import HtmlReactParser from 'html-react-parser';

export const getSpecificLengthChar: any = (longString, num) => {
    if (longString.length > num) {
        return longString.substr(0, num) + '...';
    }
    return longString;
};

export class Toaster {
    public static success: any = (str) => {
        toast.success(str, {
            icon: HtmlReactParser(SUCCESS_ICON),
        });
    };
    public static error: any = (str) => {
        toast.error(str, {
            icon: HtmlReactParser(ERROR_ICON),
        });
    };
    public static warning: any = (str) => {
        toast.warning(str, {
            icon: HtmlReactParser(WARNING_ICON),
        });
    };
    public static info: any = (str) => {
        toast.info(str, {
            icon: HtmlReactParser(INFO_ICON),
        });
    };
}

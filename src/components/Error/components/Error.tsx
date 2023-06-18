import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { constants, HttpStatus } from '../../../utils/constants';
import '../../../assets/style/workflow.scss';

interface Data {
    errorObject: { errorMessage: string; errorStatusCode: number };
    workflowId: string;
}

interface ErrorDetails {
    errorHeading: string;
    errorMessage: string;
    errorCode: number;
    showLoginButton: boolean;
    showTryAgainButton: boolean;
    showHomeButton: boolean;
}

const Error: React.FC<Data> = ({ errorObject, workflowId }) => {
    const logoutUrl = Cookies.get('logOutUrl') || constants.logOutUrl;
    const homeUrl = Cookies.get(`${workflowId}_exitUrl`) || null;

    const { t } = useTranslation();

    const getImageUrl: any = (key) => {
        switch (key) {
            case HttpStatus.BAD_REQUEST:
                return (
                    <img
                        alt="interlinkages"
                        src={require('../../../assets/images/error/error-400.svg')}
                    />
                );
            case HttpStatus.UNAUTHORIZED:
                return (
                    <img
                        alt="interlinkages"
                        src={require('../../../assets/images/error/error-401.svg')}
                    />
                );
            case HttpStatus.FORBIDDEN:
                return (
                    <img
                        alt="interlinkages"
                        src={require('../../../assets/images/error/error-403.svg')}
                    />
                );
            case HttpStatus.NOT_FOUND:
                return (
                    <img
                        alt="interlinkages"
                        src={require('../../../assets/images/error/error-404.svg')}
                    />
                );
            case HttpStatus.INTERNAL_SERVER_ERROR:
                return (
                    <img
                        alt="interlinkages"
                        src={require('../../../assets/images/error/error-500.svg')}
                    />
                );
            default:
                return (
                    <img
                        alt="interlinkages"
                        src={require('../../../assets/images/error/error-common.svg')}
                    />
                );
        }
    };

    const errorDetails: ErrorDetails = {
        errorHeading: t('ErrorLabelDefault'),
        errorMessage: t('ErrorMessageDefault'),
        errorCode: errorObject.errorStatusCode,
        showLoginButton: false,
        showTryAgainButton: true,
        showHomeButton: false,
    };

    switch (errorDetails.errorCode) {
        case HttpStatus.BAD_REQUEST:
            errorDetails.errorHeading = t('ErrorLabel400');
            errorDetails.errorMessage = t('ErrorMessage400');
            errorDetails.errorCode = errorObject.errorStatusCode;
            if (homeUrl) {
                errorDetails.showHomeButton = true;
            }
            break;
        case HttpStatus.NOT_FOUND:
            errorDetails.errorHeading = t('ErrorLabel404');
            errorDetails.errorMessage = t('ErrorMessage404');
            errorDetails.errorCode = errorObject.errorStatusCode;
            errorDetails.showTryAgainButton = false;
            if (homeUrl) {
                errorDetails.showHomeButton = true;
            }
            break;
        case HttpStatus.UNAUTHORIZED:
            errorDetails.errorHeading = t('ErrorLabel401');
            errorDetails.errorMessage = t('ErrorMessage401');
            errorDetails.errorCode = HttpStatus.UNAUTHORIZED;
            errorDetails.showLoginButton = true;
            errorDetails.showTryAgainButton = false;
            break;

        case HttpStatus.FORBIDDEN:
            errorDetails.errorHeading = t('ErrorLabel403');
            errorDetails.errorMessage = t('ErrorMessage403');
            errorDetails.errorCode = HttpStatus.FORBIDDEN;
            if (homeUrl) {
                errorDetails.showHomeButton = true;
            }
            break;

        case HttpStatus.INTERNAL_SERVER_ERROR:
            errorDetails.errorHeading = t('ErrorLabel500');
            errorDetails.errorMessage = t('ErrorMessage500');
            errorDetails.errorCode = HttpStatus.INTERNAL_SERVER_ERROR;
            if (homeUrl) {
                errorDetails.showHomeButton = true;
            }
            break;
    }
    return (
        <div className="error-screen-wrapper">
            {getImageUrl(errorDetails.errorCode)}
            <label className="error-code">{errorDetails.errorCode}</label>
            <label className="error-heading">{errorDetails.errorHeading}</label>
            <p className="error-desc">{errorDetails.errorMessage}</p>
            <div>
                {errorDetails.showTryAgainButton && (
                    <button
                        type="button"
                        className="primary-outline-btn me-3"
                        onClick={() => window.location.reload()}
                    >
                        {t('errorTryAgain')}
                    </button>
                )}
                {errorDetails.showLoginButton && (
                    <button
                        type="button"
                        className="primary-btn"
                        onClick={() => (window.location.href = logoutUrl)}
                    >
                        {t('errorLogin')}
                    </button>
                )}
                {errorDetails.showHomeButton && (
                    <button
                        type="button"
                        className="primary-btn"
                        onClick={() => (window.location.href = homeUrl)}
                    >
                        {t('homeButton')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Error;

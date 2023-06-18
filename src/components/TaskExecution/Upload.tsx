import * as React from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useDropzone, FileRejection, ErrorCode } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Toaster } from '../../utils/helper';
import { constants } from '../../utils/constants';
import { uploadTaskBlockAction } from '../Tasks/action/updateTaskBlock.actions';

interface Data {
    uploadData?: any;
    taskId: string;
    isTaskCompleted: boolean;
}
const Upload: React.FC<Data> = ({ uploadData, taskId, isTaskCompleted }) => {
    const [file, setFile] = React.useState(null);
    const [isFileSelected, setIsFileSelected] = React.useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onDrop = (acceptedFiles, fileRejection: FileRejection[]) => {
        if (fileRejection.length === 0) {
            setFile(acceptedFiles[0]);
            setIsFileSelected(true);
        } else {
            Toaster.error(fileUploadError(fileRejection));
        }
    };

    const fileUploadError = (fileRejection: FileRejection[]) => {
        if (fileRejection.length > constants.uploadFileLimit) {
            return t('uploadSingleFile');
        }

        if (
            fileRejection.length &&
            fileRejection[0].errors[0] &&
            fileRejection[0].errors[0].code === ErrorCode.FileInvalidType
        ) {
            let inValidFileTypeErrorMessage = t('uploadValidFileType');
            inValidFileTypeErrorMessage = inValidFileTypeErrorMessage.replace(
                '{0}',
                constants.allowedFiles,
            );
            return inValidFileTypeErrorMessage;
        }

        if (
            fileRejection.length &&
            fileRejection[0].errors[0] &&
            fileRejection[0].errors[0].code === ErrorCode.FileTooLarge
        ) {
            let fileTooLargeErrorMessage = t('fileTooLarge');
            fileTooLargeErrorMessage = fileTooLargeErrorMessage.replace(
                '{0}',
                (constants.maxFileSize / 1024 / 1024).toString(),
            );
            return fileTooLargeErrorMessage;
        }
    };
    const { getRootProps, getInputProps, open } = useDropzone({
        accept: constants.allowedFiles,
        maxFiles: constants.uploadFileLimit,
        noClick: true,
        maxSize: constants.maxFileSize, // in bytes
        onDrop,
        disabled: isTaskCompleted,
    });

    const data: any = {
        file: [file],
        data: {
            accountId: Cookies.get('accountId')
                ? parseInt(Cookies.get('accountId'))
                : 0,
            programIds: Cookies.get('PROGRAMID')
                ? [parseInt(Cookies.get('PROGRAMID'))]
                : [0],
            sequence: uploadData.sequence,
            type: uploadData.type,
        },
    };

    const taskUploadFile = () => {
        if (!file) {
            Toaster.error(t('pleaseSelectAFile'));
            return;
        }
        dispatch(uploadTaskBlockAction(taskId, data));
        setIsFileSelected(false);
    };

    let fileName =
        uploadData.data &&
        uploadData.data.file &&
        uploadData.data.file.filename;
    fileName = file ? file.name : fileName;

    return (
        <form>
            <div
                {...getRootProps({
                    className: `workflow-dropzone ${
                        isTaskCompleted && 'disabled'
                    }`,
                })}
            >
                <input {...getInputProps()} />
                <p>{t('dragAndDrop')}</p>
                <p>{t('or')}</p>
                <button
                    type="button"
                    className="file-dialog-btn"
                    onClick={open}
                >
                    <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.25 2.5C4.05109 2.5 3.86032 2.57902 3.71967 2.71967C3.57902 2.86032 3.5 3.05109 3.5 3.25C3.5 3.44891 3.57902 3.63968 3.71967 3.78033C3.86032 3.92098 4.05109 4 4.25 4H12.75C12.9489 4 13.1397 3.92098 13.2803 3.78033C13.421 3.63968 13.5 3.44891 13.5 3.25C13.5 3.05109 13.421 2.86032 13.2803 2.71967C13.1397 2.57902 12.9489 2.5 12.75 2.5H4.25ZM9.03 5.22C8.88937 5.07955 8.69875 5.00066 8.5 5.00066C8.30125 5.00066 8.11063 5.07955 7.97 5.22L4.72 8.47C4.58752 8.61217 4.5154 8.80022 4.51883 8.99452C4.52225 9.18882 4.60097 9.37421 4.73838 9.51162C4.87579 9.64903 5.06118 9.72775 5.25548 9.73118C5.44978 9.7346 5.63783 9.66248 5.78 9.53L7.75 7.56V13.75C7.75 13.9489 7.82902 14.1397 7.96967 14.2803C8.11032 14.421 8.30109 14.5 8.5 14.5C8.69891 14.5 8.88968 14.421 9.03033 14.2803C9.17098 14.1397 9.25 13.9489 9.25 13.75V7.56L11.22 9.53C11.2887 9.60369 11.3715 9.66279 11.4635 9.70378C11.5555 9.74477 11.6548 9.76682 11.7555 9.76859C11.8562 9.77037 11.9562 9.75184 12.0496 9.71412C12.143 9.6764 12.2278 9.62026 12.299 9.54904C12.3703 9.47782 12.4264 9.39299 12.4641 9.2996C12.5018 9.20621 12.5204 9.10618 12.5186 9.00548C12.5168 8.90478 12.4948 8.80546 12.4538 8.71346C12.4128 8.62146 12.3537 8.53866 12.28 8.47L9.03 5.22V5.22Z"
                            fill="white"
                        />
                    </svg>
                    {t('openFileDialogue')}
                </button>
            </div>
            {fileName && (
                <div className="dropzone-file-name-wrap">
                    <span className="dropzone-file-name">{fileName}</span>
                    {isFileSelected && (
                        <button
                            type="button"
                            className="dropzone-file-remove"
                            onClick={() => {
                                setFile(null);
                                setIsFileSelected(false);
                            }}
                        >
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 0C4.0111 0 3.0444 0.293245 2.22215 0.842652C1.3999 1.39206 0.759043 2.17295 0.380605 3.08658C0.0021664 4.00021 -0.0968502 5.00555 0.0960758 5.97545C0.289002 6.94536 0.765206 7.83627 1.46447 8.53553C2.16373 9.23479 3.05465 9.711 4.02455 9.90392C4.99445 10.0969 5.99979 9.99783 6.91342 9.6194C7.82705 9.24096 8.60794 8.6001 9.15735 7.77785C9.70676 6.9556 10 5.98891 10 5C10 3.67392 9.47322 2.40215 8.53553 1.46447C7.59785 0.526784 6.32608 0 5 0ZM7.5 6.90625C7.58288 6.98913 7.62944 7.10154 7.62944 7.21875C7.62944 7.33596 7.58288 7.44837 7.5 7.53125C7.41712 7.61413 7.30471 7.66069 7.1875 7.66069C7.07029 7.66069 6.95788 7.61413 6.875 7.53125L5 5.65625L3.125 7.5375C3.08396 7.57854 3.03524 7.61109 2.98163 7.6333C2.92801 7.65551 2.87054 7.66694 2.8125 7.66694C2.75447 7.66694 2.697 7.65551 2.64338 7.6333C2.58976 7.61109 2.54104 7.57854 2.5 7.5375C2.45896 7.49646 2.42641 7.44774 2.4042 7.39412C2.38199 7.3405 2.37056 7.28304 2.37056 7.225C2.37056 7.16696 2.38199 7.10949 2.4042 7.05587C2.42641 7.00226 2.45896 6.95354 2.5 6.9125L4.375 5.025L2.44688 3.08125C2.364 2.99837 2.31744 2.88596 2.31744 2.76875C2.31744 2.65154 2.364 2.53913 2.44688 2.45625C2.52976 2.37337 2.64217 2.32681 2.75938 2.32681C2.87659 2.32681 2.989 2.37337 3.07188 2.45625L5 4.40625L6.92813 2.47812C6.96916 2.43709 7.01788 2.40453 7.0715 2.38232C7.12512 2.36011 7.18259 2.34868 7.24063 2.34868C7.29866 2.34868 7.35613 2.36011 7.40975 2.38232C7.46337 2.40453 7.51209 2.43709 7.55313 2.47812C7.59416 2.51916 7.62672 2.56788 7.64893 2.6215C7.67114 2.67512 7.68257 2.73259 7.68257 2.79062C7.68257 2.84866 7.67114 2.90613 7.64893 2.95975C7.62672 3.01337 7.59416 3.06209 7.55313 3.10312L5.625 5.025L7.5 6.90625Z"
                                    fill="#0773BB"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            )}
            <button
                type="button"
                className="upload-submit"
                disabled={isTaskCompleted}
                onClick={() => {
                    taskUploadFile();
                }}
            >
                {uploadData.data && uploadData.data.uploadText}
            </button>
        </form>
    );
};

export default Upload;

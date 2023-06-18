export const constants = {
    skip: 0,
    limit: 10,
    emailRegex:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    logOutUrl: '/sw/swchannel/OfficeManager/intranet/exitintranet.cfm',
    maxFileSize: 26214400, // in bytes
    uploadFileLimit: 1,
    maxActionLabelsOnTaskCard: 2,
    allowedFiles: '.png, .jpeg, .docx, .xlsx, .pdf, .zip, .svg, .jpg',
    starMarkIcon: `<span class="star-mark-icon"><svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 6.69976L6.68243 7.92746C7.08211 8.15245 7.57118 7.81985 7.46601 7.3992L6.88753 5.09054L8.81754 3.53513C9.16988 3.25144 8.98056 2.71341 8.51778 2.67917L5.97775 2.47863L4.98382 0.297142C4.80501 -0.0990473 4.19498 -0.0990473 4.01618 0.297142L3.02225 2.47374L0.482217 2.67428C0.0194355 2.70852 -0.169884 3.24655 0.182461 3.53024L2.11247 5.08565L1.53399 7.39431C1.42882 7.81496 1.91789 8.14756 2.31757 7.92257L4.5 6.69976Z" fill="black" /></svg></span>`,
    rightMarkIcon: `<span class="right-mark-icon"><svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4.2L3.66667 7L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`,
};

export enum HttpStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum BUILDING_BLOCK {
    TEXT = 'text',
    VIDEO = 'video',
    LINK = 'link',
    UPLOAD = 'upload',
    DOWNLOAD = 'download',
    FORM = 'form',
}

export enum FormFieldTypes {
    NUMBER = 'number',
    NUMERIC = 'numeric',
    EMAIL = 'email',
}

export enum STATUS {
    notStarted = 'notStarted',
    inProgress = 'inProgress',
    completed = 'completed',
    published = 'published',
}

export enum VIEWSTATUS {
    startTask = 'Start Task',
    inProgress = 'In Progress',
}

export const TASK_JSON = {
    name: 'Welcome Webinar',
    description:
        'Watch the current recorded GoHybridIT program welcome video to review program benefits, GoHybridIT portal navigation and the HybridIT highway.',
    content: [
        {
            type: 'link',
            data: '',
            label: 'Click Here',
            url: 'https://www.google.com/',
            sequence: 0,
            isCompleted: false,
            validationRequired: true,
            display: 'block',
        },

        {
            type: 'text',
            data: 'Watch the video until the end so we can validate that this step has been completed',
            style: {},
            sequence: 0,
            isCompleted: true,
            validationRequired: false,
            weightage: 0,
            display: 'block',
        },
        {
            type: 'infographics',
            data: '',
            sequence: 0,
            isCompleted: true,
            validationRequired: false,
            weightage: 0,
            display: 'block',
        },
        {
            type: 'video',
            label: 'Play Video',
            url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
            videoType: '',
            sequence: 0,
            isCompleted: false,
            validationRequired: false,
            display: 'block',
        },

        {
            type: 'form',
            data: {
                submitText: 'Submit',
                submitAction: 'workflow\\updateTask',
                fields: [
                    {
                        name: 'FirstName',
                        label: 'First Name',
                        value: '',
                        type: 'text',
                        placholder: 'Please enter first name',
                        validationRules: {
                            required: true,
                            type: 'string', // string, number or email
                            min: 2, // in case of string, min string length| in case of number min num value
                            max: 10, // in case of string, max string length| in case of number max num value
                        },
                    },
                    {
                        name: 'LastName',
                        label: 'Last Name',
                        value: '',
                        type: 'text',
                        placholder: 'Please enter last name',
                        validationRules: {
                            required: true,
                            type: 'string', // string, number or email
                            min: 2, // in case of string, min string length| in case of number min num value
                            max: 10, // in case of string, max string length| in case of number max num value
                        },
                    },
                    {
                        name: 'Age',
                        label: 'Age',
                        value: '',
                        type: 'number',
                        placholder: 'Please enter age',
                        validationRules: {
                            required: true,
                            type: 'string', // string, number or email
                            min: 2, // in case of string, min string length| in case of number min num value
                            max: 10, // in case of string, max string length| in case of number max num value
                        },
                    },
                    {
                        name: 'Email',
                        label: 'Email',
                        value: '',
                        type: 'text',
                        placholder: 'Please enter email address',
                        validationRules: {
                            required: true,
                            type: 'string', // string, number or email
                            min: 2, // in case of string, min string length| in case of number min num value
                            max: 10, // in case of string, max string length| in case of number max num value
                        },
                    },
                ],
                sequence: 0,
                isCompleted: false,
                validationRequired: true,
                display: 'block',
            },
            sequence: 0,
            isCompleted: false,
            validationRequired: true,
            display: 'block',
        },
        {
            type: 'upload',
            url: '',
            validationRules: 'required',
            sequence: 0,
            isCompleted: false,
            validationRequired: true,
            display: 'block',
        },
        {
            type: 'download',
            data: '',
            url: '',
            sequence: 0,
            isCompleted: false,
            validationRequired: true,
            display: 'block',
        },
        {
            type: 'quickTask',
            data: '',
            sequence: 0,
            isCompleted: false,
            validationRequired: false,
            display: 'block',
        },

        {
            type: 'autoEmail',
            data: { to: '', from: '', content: '' },
            sequence: 0,
            isCompleted: false,
            validationRequired: true,
            display: 'block',
        },
        {
            type: 'editEmail',
            data: { to: '', from: '', content: '' },
            sequence: 0,
            isCompleted: false,
            validationRequired: true,
            display: 'block',
        },
    ],
};

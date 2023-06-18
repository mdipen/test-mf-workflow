import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { submitTaskBlockAction } from '../Tasks/action/updateTaskBlock.actions';
import FormField from './FormField';

interface Data {
    formData?: any;
    taskId: string;
    isTaskCompleted: boolean;
}

const Form: React.FC<Data> = ({ formData, taskId, isTaskCompleted }) => {
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data: any) => {
        const finalData = {
            data: data,
            sequence: formData.sequence,
            type: formData.type,
            _id: taskId,
        };
        dispatch(submitTaskBlockAction(finalData));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div>
                {formData.data.fields.map((item, index) => {
                    return (
                        <FormField
                            key={`form_data_${index}`}
                            fieldData={item}
                            register={register}
                            errors={errors}
                        />
                    );
                })}
            </div>

            <input
                type="submit"
                className="primary-btn btn-large"
                value={formData.data && formData.data.submitText}
                disabled={isTaskCompleted}
            />
        </form>
    );
};
export default Form;

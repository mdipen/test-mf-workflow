import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { constants, FormFieldTypes } from '../../utils/constants';

interface Data {
    fieldData?: any;
    register: any;
    errors: any;
}

const FormField: React.FC<Data> = ({ fieldData, register, errors }) => {
    const [itemValue, setItemValue] = React.useState(fieldData.value);
    const { t } = useTranslation();

    let validationRule: any = {};
    if (
        fieldData.type === FormFieldTypes.NUMBER ||
        fieldData.type === FormFieldTypes.NUMERIC
    ) {
        validationRule = {
            min: fieldData.validationRules.min,
            max: fieldData.validationRules.max,
        };
    } else {
        validationRule = {
            minLength: fieldData.validationRules.min,
            maxLength: fieldData.validationRules.max,
        };
        if (fieldData.validationRules.type === FormFieldTypes.EMAIL) {
            validationRule.pattern = constants.emailRegex;
        }
    }
    const minCharacterLengthError = t('minCharacterLength').replace(
        '{0}',
        fieldData.validationRules.min,
    );
    const maxCharacterLengthError = t('maxCharacterLength').replace(
        '{0}',
        fieldData.validationRules.max,
    );
    const minValueError = t('minValue').replace(
        '{0}',
        fieldData.validationRules.min,
    );
    const maxValueError = t('maxValue').replace(
        '{0}',
        fieldData.validationRules.max,
    );
    return (
        <div className="form-field-wrap">
            <label className="form-input-label mb-2">
                {fieldData.label || fieldData.name}
                <span className="val-ast">
                    {fieldData.validationRules &&
                        fieldData.validationRules.required &&
                        '*'}
                </span>
            </label>
            <div className="form-input-wrap mb-3">
                <input
                    className="form-input"
                    type={
                        fieldData.type === FormFieldTypes.NUMERIC
                            ? FormFieldTypes.NUMBER
                            : fieldData.type
                    }
                    {...register(fieldData.name, {
                        required:
                            fieldData.validationRules &&
                            fieldData.validationRules.required,
                        ...validationRule,
                    })}
                    value={itemValue}
                    onChange={(e) => {
                        setItemValue(e.target.value.trimLeft());
                    }}
                />
                {errors[fieldData.name]?.type === 'required' && (
                    <span className="form-error-msg">{`${
                        fieldData.label || fieldData.name
                    } ${t('isRequired')}`}</span>
                )}
                {errors[fieldData.name]?.type === 'minLength' && (
                    <span className="form-error-msg">
                        {minCharacterLengthError}
                    </span>
                )}
                {errors[fieldData.name]?.type === 'maxLength' && (
                    <span className="form-error-msg">
                        {maxCharacterLengthError}
                    </span>
                )}
                {errors[fieldData.name]?.type === 'min' && (
                    <span className="form-error-msg">{minValueError}</span>
                )}
                {errors[fieldData.name]?.type === 'max' && (
                    <span className="form-error-msg">{maxValueError}</span>
                )}
                {errors[fieldData.name]?.type === 'pattern' && (
                    <span className="form-error-msg">
                        {t('pleaseProvideValidEmail')}
                    </span>
                )}
            </div>
        </div>
    );
};

export default FormField;

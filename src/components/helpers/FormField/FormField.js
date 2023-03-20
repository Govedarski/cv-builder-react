import {camelCaseTextToNormalText, capitalize} from '../../../utils/helper_functions.js';
import {StyledCheckInput} from '../StyledCheckInput/StyledCheckInput.js';
import styles from './FormField.module.css'
import {DateInput} from '../DateInput/DateInput.js';
export function FormField(fieldData) {
    let field = ""
    switch (fieldData.type) {
        case "date":
            field = (
                <DateInput
                ref={fieldData._ref}
                type={fieldData.type}
                placeholder={fieldData.placeholder || capitalize(camelCaseTextToNormalText(fieldData.name))}
                _id={fieldData.name}
                name={fieldData.name}
                value={fieldData.value}
                onChange={fieldData.onChange}
                onBlur={fieldData.onBlur}
            />
            )
            break
        default:
            field = (
                <input
                    ref={fieldData._ref}
                    type={fieldData.type}
                    placeholder={fieldData.placeholder || capitalize(camelCaseTextToNormalText(fieldData.name))}
                    id={fieldData.name}
                    name={fieldData.name}
                    value={fieldData.value}
                    onChange={fieldData.onChange}
                    onBlur={fieldData.onBlur}
                    title={fieldData.fieldTitle}
                />
            )
            break
    }
    return (
        <div className={styles.container}>
            {fieldData.label !==null &&
            <label
                htmlFor={`${fieldData.name}`}
                title={fieldData.labelTitle}>
                {fieldData.label || capitalize(camelCaseTextToNormalText(fieldData.name)) + ":"}
            </label>}
            {fieldData.withCheckBox &&
                <StyledCheckInput
                    checkBoxData={fieldData.checkBoxData}
                />}
            {field}
        </div>
    );
}
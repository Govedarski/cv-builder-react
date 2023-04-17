import {camelCaseTextToNormalText, capitalize} from '../../../utils/helper_functions.js';
import {StyledCheckInput} from '../custom_inputs/StyledCheckInput/StyledCheckInput.js';
import styles from './FormField.module.css';
import {DateInput} from '../custom_inputs/DateInput/DateInput.js';
import {PhoneNumberInput} from '../custom_inputs/PhoneNumberInput/PhoneNumberInput.js';

export function FormField(fieldData) {
    console.log(fieldData.fieldStyle)

    let field = '';
    switch (fieldData.type) {
        case 'date':
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
                    title={fieldData.fieldTitle}
                />
            );
            break;
        case 'phoneNumber':
            field = (
                <PhoneNumberInput
                    ref={fieldData._ref}
                    prefix={fieldData.prefix}
                    length={fieldData.length}
                    type={"text"}
                    placeholder={fieldData.placeholder || capitalize(camelCaseTextToNormalText(fieldData.name))}
                    id={fieldData.name}
                    name={fieldData.name}
                    value={fieldData.value}
                    onChange={fieldData.onChange}
                    onBlur={fieldData.onBlur}
                    title={fieldData.fieldTitle}
                />
            );
            break;
        case 'textarea':
            field = (
                <textarea
                    ref={fieldData._ref}
                    placeholder={fieldData.placeholder || capitalize(camelCaseTextToNormalText(fieldData.name))}
                    id={fieldData.name}
                    name={fieldData.name}
                    value={fieldData.value}
                    onChange={fieldData.onChange}
                    onBlur={fieldData.onBlur}
                    title={fieldData.fieldTitle}
                    style={fieldData.style}
                    cols={fieldData.cols}
                    rows={fieldData.rows}
                />
            )
            break
        case 'select':
            field = (
                <select
                    ref={fieldData._ref}
                    id={fieldData.name}
                    name={fieldData.name}
                    value={fieldData.value}
                    onChange={fieldData.onChange}
                    onBlur={fieldData.onBlur}
                    title={fieldData.fieldTitle}
                    style={fieldData.fieldStyle}
                >
                    {fieldData.options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
            break;
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
                    onDoubleClick={fieldData.onDoubleClick}
                    onBlur={fieldData.onBlur}
                    title={fieldData.fieldTitle}
                    style={fieldData.style}
                />
            );
            break;
    }
    return (
        <div
            className={fieldData.styles || styles.container}
            style={fieldData.style}
        >
            {fieldData.label !== null &&
                <label
                    htmlFor={`${fieldData.name}`}
                    title={fieldData.labelTitle}>
                    {fieldData.label || capitalize(camelCaseTextToNormalText(fieldData.name)) + ':'}
                </label>}
            {fieldData.withCheckBox &&
                <StyledCheckInput
                    checkBoxData={fieldData.checkBoxData}
                />}
            {field}
        </div>
    );
}
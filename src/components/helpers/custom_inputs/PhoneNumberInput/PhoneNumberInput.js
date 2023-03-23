import {camelCaseTextToNormalText, capitalize} from '../../../../utils/helper_functions.js';
import {useState} from 'react';

export function PhoneNumberInput(data) {
    const prefixNoSpace = data.prefix.replaceAll(' ', '');
    const initialValue = data.value ? format(data.value) : data.prefix;
    const [number, setNumber] = useState(initialValue);

    function onChangeWrapper(e) {
        let value = e.target.value;
        value = value.replaceAll(data.prefix, '').replaceAll(' ', '');

        if (value.length > data.length || !e.target.value.startsWith(data.prefix) || isNaN(value)) {
            return;
        }
        setNumber(e.target.value);

        if (!data.onChange) {
            return;
        }

        e.target = {...e.target};
        e.target.value = data.prefix.replace(' ', '') + value;
        e.target.name = data.name;
        data.onChange(e);
    }

    function onBlurWrapper(e) {
        let value = format(e.target.value)

        setNumber(value);

        if (!data.onBlur) {
            return;
        }
        e.target = {...e.target};
        e.target.value = data.prefix.replace(' ', '') + value;
        e.target.name = data.name;
        data.onBlur(e);

    }

    function format(value) {
        value = value.replaceAll(' ', '').replaceAll(prefixNoSpace, '');

        let result = data.prefix;
        for (let i = 0; i < value.length; i += 2) {
            result += value.substring(i, i + 2) + ' ';
        }
        return result.trim();
    }

    return (
        <input
            ref={data._ref}
            placeholder={data.placeholder || capitalize(camelCaseTextToNormalText(data.name))}
            id={data.name}
            name={data.name}
            value={number}
            onChange={onChangeWrapper}
            onBlur={onBlurWrapper}
            title={data.fieldTitle}
        />
    );
}
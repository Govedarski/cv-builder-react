import {camelCaseTextToNormalText, capitalize} from '../../../utils/helper_functions.js';
import {useState} from 'react';

export function PhoneNumberField(data) {
    const [number, setNumber] = useState(data.prefix);

    function onChangeWrapper(e) {
        let value = e.target.value;
        value = value.replaceAll(data.prefix, '').replaceAll(' ', '');

        if (value.length > data.length || !e.target.value.startsWith(data.prefix) || isNaN(value)) {
            return;
        }
        setNumber(e.target.value);

        if (!data.onChange){
            return
        }
        e.target = {...e.target}
        e.target.value = value
        data.onChange(e)
    }

    function onBlurWrapper(e) {

        let value = e.target.value;
        value = value.replaceAll(data.prefix, '').replaceAll(' ', '');

        e.target.value = data.prefix;
        for (let i = 0; i < value.length; i += 2) {
            e.target.value += value.substring(i, i + 2) + ' ';
        }

        setNumber(e.target.value.trim());

        if (!data.onBlur){
            return
        }
        e.target = {...e.target}
        e.target.value = value
        data.onBlur(e)

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
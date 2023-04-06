import DatePicker from 'react-datepicker';
import {MyCalendarContainer} from './MyCalendarContainer/MyCalendarContainer.js';
import 'react-datepicker/dist/react-datepicker.css';
import {stringToDate} from '../../../../utils/helper_functions.js';

export function DateInput(data) {
    const dateFormat = 'dd/MM/yyyy';

    const initialDate = data.value && typeof data.value === 'string'
        ? stringToDate(data.value, dateFormat)
        : data.value;

    function changeHandlerWrapper(date) {
        const target = {
            name: data.name,
            value: date
        };
        data.onChange({target});
    }

    return (
        <DatePicker
            ref={data._ref}
            type={data.type}
            _id={data.name}
            name={data.name}
            onBlur={data.onBlur}
            calendarContainer={MyCalendarContainer}
            placeholderText={data.placeholder}
            selected={initialDate}
            dateFormat={dateFormat}
            onChange={changeHandlerWrapper}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
        />
    );
}




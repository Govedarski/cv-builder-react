import DatePicker from 'react-datepicker';
import {MyCalendarContainer} from './MyCalendarContainer/MyCalendarContainer.js';
import 'react-datepicker/dist/react-datepicker.css';

export function DateInput(data) {
    const dateFormat = 'dd/MM/yyyy';
    //
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
            selected={data.value}
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




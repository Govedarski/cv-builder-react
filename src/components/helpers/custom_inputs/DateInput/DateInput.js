import DatePicker from 'react-datepicker';
import {MyCalendarContainer} from './MyCalendarContainer/MyCalendarContainer.js';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from 'react';
import {formatDate} from '../../../../utils/helper_functions.js';

export function DateInput(data) {
    const [date, setData] = useState('');
    const dateFormat = 'dd/MM/yyyy';

    function changeHandlerWrapper(date) {
        setData(date);
        const target = {
            name: data.name,
            value: formatDate(date, 'dd/MM/yyyy')
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
            selected={date}
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



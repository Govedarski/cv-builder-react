import {useState} from 'react';
import DatePicker from 'react-datepicker';
import {MyCalendarContainer} from './MyCalendarContainer/MyCalendarContainer.js';
import "react-datepicker/dist/react-datepicker.css"

export function DateInput({fieldData}) {
    const [startDate, setStartDate] = useState("");


    return (
        <DatePicker
            calendarContainer={MyCalendarContainer}
            selected={startDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setStartDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
        />
    );
}




import {CalendarContainer} from 'react-datepicker';
import styles from "./MyCalendarContainer.module.css"
import "react-datepicker/dist/react-datepicker.css"
export function MyCalendarContainer({className, children}) {
    return (
        <div className={styles.container}>
            <CalendarContainer className={className}>
                <div>{children}</div>
            </CalendarContainer>
        </div>
    );
}
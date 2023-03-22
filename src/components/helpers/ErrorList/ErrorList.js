import {capitalize} from '../../../utils/helper_functions.js';
import styles from './ErrorList.module.css'
export function ErrorList({errorData}) {
    const errors = Object.values(errorData)

    return (
        errors.length > 0 &&
        <ul className={styles.errorsList}>
            {errors.map(x => x.map(errorData => {
                        return (
                            errorData.show && errorData.error &&
                            <li key={errorData.error}>
                                {capitalize(errorData.error)}
                            </li>
                        );
                    }
                )
            )}
        </ul>
    );
}
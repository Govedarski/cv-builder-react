import styles from './Arrow.module.css';

export function Arrow({onClick, directionClass, colorClass}) {

    return (
        <div
            className={styles.container + " " + directionClass + " " + colorClass}
            onClick={onClick}>

            <div className={styles.round}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    );
}
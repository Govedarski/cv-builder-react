import styles from './CloseButton.module.css';

export function CloseButton({className, title, onClick}) {
    return (
        <div
            className={styles.close + " " + className}
            title={title}
            onClick={onClick}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <svg viewBox="0 0 36 36" className={styles.circle}>
            </svg>
        </div>
    );
}
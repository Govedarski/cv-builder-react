import styles from "./LoadingSpiner.module.css"
export function LoadingSpinner() {
    return (
        <div className={styles.noFreezeSpinner}>
            <div className={styles.noFreezeSpinnerInner}>
                <div>
                    <i className="material-icons">
                        account_circle
                    </i>
                    <i className="material-icons">
                        home
                    </i>
                    <i className="material-icons">
                        work
                    </i>
                    <div>
                    </div>
                </div>
            </div>
            <div className={styles.loadingText}>loading...</div>
        </div>
    );
}
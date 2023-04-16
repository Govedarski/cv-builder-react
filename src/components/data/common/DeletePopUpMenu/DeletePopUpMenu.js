import styles from './DeletePopUpMenu.module.css';
export function DeletePopupMenu({onDelete, onCancel}) {
    return (
        <div className={styles.deletePopupMenu}>
            <h2 className={styles.heading}>Delete Item</h2>
            <p className={styles.paragraph}>Are you sure you want to delete this item?</p>
            <div className={styles.buttonsContainer}>
                <button className={styles.deleteButton} onClick={onDelete}>Delete</button>
                <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}


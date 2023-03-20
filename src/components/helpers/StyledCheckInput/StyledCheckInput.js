import styles from './StyleCheckInput.module.css';

export function StyledCheckInput({checkBoxData}) {
    return (
        <div
            className={styles.container}
            style={{
                right: `${checkBoxData?.positionX}px`,
                top: `${checkBoxData?.positionY}px`
            }}>
            <input type="checkbox" id={checkBoxData?.id}/>

            <label htmlFor={checkBoxData?.id} className={styles.checkbox} style={{
                width: `${checkBoxData?.size}px`,
                height: `${checkBoxData?.size}px`,
            }}>
                <div className={styles.checkboxInner}>
                    <div className={styles.greenBall}
                         style={{
                             width: `${checkBoxData?.size / 2}px`,
                             height: `${checkBoxData?.size / 2}px`
                         }}
                    ></div>
                </div>
            </label>
            <div className={styles.checkboxText}
                 style={{
                     fontSize: `${checkBoxData?.size}px`,
                 }}
            >
                <span>{checkBoxData?.constantText}</span>
                <div className={styles.checkboxTextOptions}>
                    <span className={styles.off}>{checkBoxData?.textOff}</span>
                    <span className={styles.on}>{checkBoxData?.textOn}</span>
                </div>
                <span style={{opacity: 0}}>hidden</span>
            </div>
        </div>
    );
}
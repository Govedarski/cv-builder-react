import styles from "../../../DetailsTemplate/DetailsTemplate.module.css";

import React from "react";

export function SectionReferences({referencesData}) {
    return (
        <section id={"references"} className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>References</h2>
            <ul className={styles.sectionInfoList}>
                {referencesData?.map(reference => (
                    <li key={reference?.id} className={styles.sectionInfo}>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Name: </span>
                            {reference?.name}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Company: </span>
                            {reference?.company}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Position: </span>
                            {reference?.position}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Contacts: </span>
                            {reference?.contacts}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
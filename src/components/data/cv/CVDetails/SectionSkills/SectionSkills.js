import styles from "../../../DetailsTemplate/DetailsTemplate.module.css";

import React from "react";

export function SectionSkills({cvData}) {
    return (
        <section id={"skills"} className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>Skills</h2>
            <ul className={styles.sectionInfoList}>
                <li className={styles.sectionInfoItem}>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Professional skills: </span>
                        {cvData?.professional_skills?.join(", ")}
                    </p>
                </li>

                <li className={styles.sectionInfoItem}>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Languages: </span>
                        {[...cvData?.standard_languages || [], ...cvData?.other_languages || []].join(", ")}
                    </p>
                </li>

                <li className={styles.sectionInfoItem}>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Soft skills: </span>
                        {cvData?.soft_skills?.join(", ")}
                    </p>
                </li>
            </ul>
        </section>
    )
}
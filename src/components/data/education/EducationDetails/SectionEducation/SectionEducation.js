import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";
import React from "react";

export function SectionEducation({data}){

    return (
        <section id={"education"} className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>Education</h2>
            <ul className={styles.sectionInfoList}>
                {data?.map(education => (
                    <li key={education.id} className={styles.sectionInfo}>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Institution: </span>
                            {education.institution}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Education Level: </span>
                            {education.educationLevel}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Start Date: </span>
                            {education.startDate}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>End Date: </span>
                            {education.endDate}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Fields of Study: </span>
                            {education.fieldsOfStudy?.join(", ")}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Qualification: </span>
                            {education.qualification}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
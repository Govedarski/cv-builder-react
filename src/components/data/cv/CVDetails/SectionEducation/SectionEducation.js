import styles from "../../../DetailsTemplate/DetailsTemplate.module.css";
import React from "react";

export function SectionEducation({educationData}){
    return (
        <section id={"education"} className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>Education</h2>
            <ul className={styles.sectionInfoList}>
                {educationData?.map(education => (
                    <li key={education.id} className={styles.sectionInfo}>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Institution: </span>
                            {education.institution}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Education Level: </span>
                            {education.education_level}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Start Date: </span>
                            {education.start_date}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>End Date: </span>
                            {education.end_date}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Fields of Study: </span>
                            {education.fields_of_study.join(", ")}
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
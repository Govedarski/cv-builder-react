import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";

import React from "react";

export function SectionWorkExp({workExpData}) {
    return (
        <section id={"work-experience"} className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>Work Experience</h2>
            <ul className={styles.sectionInfoList}>
                {workExpData?.map(workExp => (
                    <li key={workExp.id} className={styles.sectionInfo}>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Period: </span>
                            {workExp.startDate} - {workExp.endDate}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Company: </span>
                            {workExp.companyName}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Job Title: </span>
                            {workExp.jobTitle}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Field of Work: </span>
                            {workExp.fieldOfWork}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Employment Type: </span>
                            {workExp.employmentType}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Description: </span>
                            {workExp.description}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
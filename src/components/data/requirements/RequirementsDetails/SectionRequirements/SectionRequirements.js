import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";

import React from "react";

export function SectionRequirements({data}) {
    const minSalary = data?.salaryMinRange || "unspecified";
    const maxSalary = data?.salaryMaxRange || "unspecified";
    return(
        <section id={"requirements"} className={styles.sectionContainer}>

            <h2 className={styles.sectionInfoTitle}>Requirements</h2>
            <div className={styles.sectionInfo}>

                {(minSalary || maxSalary) &&
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Salary range: </span>
                        form {minSalary} to {maxSalary} BGN
                    </p>
                }
                <p className={styles.sectionInfoItem}>
                    <span className={styles.infoLabel}>Employment type: </span>
                    {data?.employmentType}
                </p>
            </div>
        </section>
    )
}
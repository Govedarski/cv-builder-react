import styles from "../../../DetailsTemplate/DetailsTemplate.module.css";

import React from "react";

export function SectionRequirements({requirementsData}) {
    const minSalary = requirementsData?.salary_min_range || "unspecified";
    const maxSalary = requirementsData?.salary_max_range || "unspecified";
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
                    {requirementsData?.employment_type}
                </p>
            </div>
        </section>
    )
}
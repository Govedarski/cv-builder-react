import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";
import React from "react";

export function SectionCertificates({certificatesData, handleImageClick}) {
    return (
        <section id = {"certificates"} className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>Certificates</h2>
            <ul className={styles.sectionInfoList}>
                {certificatesData?.map(certificate => (
                    <li key={certificate.id} className={styles.sectionInfo}>
                        <div className={styles.sectionImageContainer}>
                            <img className={styles.sectionImage}
                                 src={certificate.image_file_url}
                                 onClick={handleImageClick}
                                 alt="Profile Picture"/>
                        </div>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Name: </span>
                            {certificate.name}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Description: </span>
                            {certificate.description}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Date: </span>
                            {certificate.date}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
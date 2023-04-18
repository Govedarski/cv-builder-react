import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";

import React from "react";

export function SectionPersonalInformation({data, title, onDoubleClick}) {


    return (
        <section
            key={"personal-information"}
            onDoubleClick={onDoubleClick}
            id={"personal-information"}
            className={styles.sectionContainer}
            title={title}
        >
            <h2 className={styles.sectionInfoTitle}>Personal Information</h2>
            <div className={styles.sectionInfoContainer}>
                {data?.profile?.profilePictureFileUrl &&
                    <div className={styles.sectionImageContainer}>
                        <img className={styles.sectionImage} src={data?.profile?.profilePictureFileUrl}
                             alt="Profile Picture"/>
                    </div>
                }
                <div className={styles.sectionInfo}>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Name: </span>
                        {data?.profile?.firstName} {data?.profile?.lastName}
                    </p>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Date of Birth: </span>
                        {data?.profile?.dateOfBirth}
                    </p>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Phone Number: </span>
                        {data?.profile?.phoneNumber}
                    </p>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Email: </span>
                        {data?.email}
                    </p>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>City: </span>
                        {data?.profile?.city}
                    </p>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Address: </span>
                        {data?.profile?.address}
                    </p>
                </div>
            </div>
        </section>
    )
}
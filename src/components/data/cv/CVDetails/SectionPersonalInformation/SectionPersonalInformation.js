import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";

import React, {useContext} from "react";
import {UserContext} from "../../../../../context/UserContext";

export function SectionPersonalInformation({title, onDoubleClick}) {
    const {profileData} = useContext(UserContext);
    const {userData} = useContext(UserContext);

    return (
        <section
            onDoubleClick={onDoubleClick}
            id={"personal-information"}
            className={styles.sectionContainer}
            title={title}
        >
            <h2 className={styles.sectionInfoTitle}>Personal Information</h2>
            <div className={styles.sectionInfoContainer}>
                <div className={styles.sectionImageContainer}>
                    <img className={styles.sectionImage} src={profileData.profilePictureFileUrl}
                         alt="Profile Picture"/>
                </div>
                <div className={styles.sectionInfo}>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Name: </span>
                        {profileData.firstName} {profileData.lastName}
                    </p>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Date of Birth: </span>
                        {profileData.dateOfBirth}
                    </p>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Phone Number: </span>
                        {profileData.phoneNumber}
                    </p>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Email: </span>
                        {userData.user.email}
                    </p>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>City: </span>
                        {profileData.city}
                    </p>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Address: </span>
                        {profileData.address}
                    </p>
                </div>
            </div>
        </section>
    )
}
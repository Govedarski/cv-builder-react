import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";
import React, {useState} from "react";
import {CloseButton} from "../../../../helpers/CloseButton/CloseButton";

export function SectionCertificates({data}) {
    const [selectedImage, setSelectedImage] = useState(null);
    function handleImageClick(e) {
        setSelectedImage(e.target.src);
    }

    return (
        <section id={"certificates"} className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>Certificates</h2>
            <ul className={styles.sectionInfoList}>
                {data?.map(certificate => (
                    <li key={certificate.id} className={styles.sectionInfo}>
                        {certificate.imageFileUrl &&
                            <div className={styles.sectionImageContainer}>
                                <img className={styles.sectionImage}
                                     src={certificate.imageFileUrl}
                                     onClick={handleImageClick}
                                     alt="Profile Picture"/>
                            </div>
                        }
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
            {selectedImage && (
                <div className={styles.imagePopup}>
                    <img src={selectedImage} alt="Certificate"/>
                    <CloseButton
                        className={styles.closeButton}
                        onClick={() => setSelectedImage(null)}
                    />
                </div>
            )}
        </section>
    )
}
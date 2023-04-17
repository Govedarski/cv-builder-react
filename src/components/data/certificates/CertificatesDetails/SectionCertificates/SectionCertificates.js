import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";
import React, {useContext, useEffect, useState} from "react";
import {CloseButton} from "../../../../helpers/CloseButton/CloseButton";
import {LoadingContext} from "../../../../../context/LoadingContext";
import {UserContext} from "../../../../../context/UserContext";
import * as educationService from "../../../../../services/dataServices/educationService/educationService";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../../utils/helper_functions";
import * as certificatesService from "../../../../../services/dataServices/certificatesService/certificatesService";

export function SectionCertificates({                                    addPopUp,
                                        addBtn,
                                        add,
                                        state,
                                        data,
                                        setData}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const {setIsLoading} = useContext(LoadingContext);
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    data = data?.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))

    function handleImageClick(e) {
        setSelectedImage(e.target.src);
    }
    useEffect(() => {
        if (addPopUp) {
            setIsLoading(true);
            certificatesService.getList(userId)
                .then((response) => {
                    response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                    setData(prevState => {
                        const newState = {...prevState}
                        newState.certificate = response
                        return newState
                    });
                    setIsLoading(false);
                }).catch((error) => {
                setIsLoading(false);
            })
        }
    }, [])

    if (addPopUp) {
        data = data?.filter(x => state.certificateIds?.includes(x.id))
        data = data?.sort((a, b) => {
            const indexA = state.certificateIds?.indexOf(a.id);
            const indexB = state.certificateIds?.indexOf(b.id);
            return indexA - indexB;
        });
    }

    return (
        <section
            key={'certificates'}
            id={"certificates"}
            className={styles.sectionContainer}>
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
                {!add && addBtn}

            </ul>
            {add && addPopUp}

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
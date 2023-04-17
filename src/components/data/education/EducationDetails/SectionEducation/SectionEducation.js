import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";
import React, {useContext, useEffect} from "react";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../../utils/helper_functions";
import {LoadingContext} from "../../../../../context/LoadingContext";
import {UserContext} from "../../../../../context/UserContext";
import * as educationService from "../../../../../services/dataServices/educationService/educationService";

export function SectionEducation({
                                     addPopUp,
                                     addBtn,
                                     add,
                                     state,
                                     data,
                                     setData
                                 }) {
    const {setIsLoading} = useContext(LoadingContext);
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;

    useEffect(() => {
        if (addPopUp) {
            setIsLoading(true);
            educationService.getList(userId)
                .then((response) => {
                    response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                    setData(prevState => {
                        const newState = {...prevState}
                        newState.education = response
                        return newState
                    });
                    setIsLoading(false);
                }).catch((error) => {
                setIsLoading(false);
            })
        }
    }, [])

    if (addPopUp) {
        data = data?.filter(x => state.educationIds?.includes(x.id))
        data = data?.sort((a, b) => {
            const indexA = state.educationIds?.indexOf(a.id);
            const indexB = state.educationIds?.indexOf(b.id);
            return indexA - indexB;
        });
    }

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
                {!add && addBtn}

            </ul>
            {add && addPopUp}

        </section>
    )
}
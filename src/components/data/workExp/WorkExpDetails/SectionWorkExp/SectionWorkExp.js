import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";

import React, {useContext, useEffect} from "react";
import * as workExpService from "../../../../../services/dataServices/workExpService/workExpService";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../../utils/helper_functions";
import {LoadingContext} from "../../../../../context/LoadingContext";
import {UserContext} from "../../../../../context/UserContext";

export function SectionWorkExp({
                                   workExpData,
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
            workExpService.getList(userId)
                .then((response) => {
                    response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                    setData(prevState => {
                        const newState = {...prevState}
                        newState.workExp = response
                        return newState
                    });
                    setIsLoading(false);
                }).catch((error) => {
                setIsLoading(false);
            })
        }
    }, [])

    const filteredList = data?.filter(x => state.workExpIds?.includes(x.id))
    const sortedList = filteredList?.sort((a, b) => {
        const indexA = state.workExpIds?.indexOf(a.id);
        const indexB = state.workExpIds?.indexOf(b.id);
        return indexA - indexB;
    });
    const dataToShow = workExpData || sortedList

    return (
        <section id={"work-experience"} className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>Work Experience</h2>
            <ul className={styles.sectionInfoList}>
                {dataToShow?.map(workExp => (
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
                {!add && addBtn}
            </ul>

            {add && addPopUp}
        </section>
    )
}
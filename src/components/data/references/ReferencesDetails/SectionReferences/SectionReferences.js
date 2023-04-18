import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";

import React, {useContext, useEffect} from "react";
import {LoadingContext} from "../../../../../context/LoadingContext";
import {UserContext} from "../../../../../context/UserContext";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../../utils/helper_functions";
import * as referencesService from "../../../../../services/dataServices/referencesService/referencesService";

export function SectionReferences({
                                      itemData,
                                      addPopUp,
                                      addBtn,
                                      add,
                                      state,
                                      data,
                                      setData
                                  }) {
    const {setIsLoading} = useContext(LoadingContext);
    const userContext = useContext(UserContext);
    const userId = userContext?.userData?.id;


    useEffect(() => {
        if (addPopUp) {
            setIsLoading(true);
            referencesService.getList(userId)
                .then((response) => {
                    response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                    setData(prevState => {
                        const newState = {...prevState}
                        newState.reference = response
                        return newState
                    });
                    setIsLoading(false);
                }).catch((error) => {
                setIsLoading(false);
            })
        }
    }, [])

    const filteredList = data?.filter(x => state.referenceIds?.includes(x.id))
    const sortedList = filteredList?.sort((a, b) => {
        const indexA = state.referenceIds?.indexOf(a.id);
        const indexB = state.referenceIds?.indexOf(b.id);
        return indexA - indexB;
    });
    const dataToShow = itemData || sortedList

    return (
        <section
            key={'references'}
            id={"references"}
            className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>References</h2>
            <ul className={styles.sectionInfoList}>
                {dataToShow?.map(reference => (
                    <li key={reference?.id} className={styles.sectionInfo}>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Name: </span>
                            {reference?.name}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Company: </span>
                            {reference?.company}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Position: </span>
                            {reference?.position}
                        </p>
                        <p className={styles.sectionInfoItem}>
                            <span className={styles.infoLabel}>Contacts: </span>
                            {reference?.contacts}
                        </p>
                    </li>
                ))}
                {!add && addBtn}

            </ul>
            {add && addPopUp}

        </section>
    )
}
import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";

import React, {useContext, useEffect} from "react";
import {LoadingContext} from "../../../../../context/LoadingContext";
import {UserContext} from "../../../../../context/UserContext";
import * as educationService from "../../../../../services/dataServices/educationService/educationService";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../../utils/helper_functions";
import * as requirementsService from "../../../../../services/dataServices/requirementsService/requirementsService";

export function SectionRequirements({
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
            requirementsService.getList(userId)
                .then((response) => {
                    response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                    setData(prevState => {
                        const newState = {...prevState}
                        newState.requirements = response
                        return newState
                    });
                    setIsLoading(false);
                }).catch((error) => {
                setIsLoading(false);
            })
        }
    }, [])

    if (addPopUp && Array.isArray(data)){
        data = data?.filter(x => state.requirementsId === x.id)[0]
    }
    const minSalary = data?.salaryMinRange || "unspecified";
    const maxSalary = data?.salaryMaxRange || "unspecified";
    return (
        <section
            key={"requirements"}
            id={"requirements"}
            className={styles.sectionContainer}>
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
                {!add && addBtn}
            </div>
            {add && addPopUp}

        </section>
    )
}
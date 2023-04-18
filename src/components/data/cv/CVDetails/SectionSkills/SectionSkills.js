import styles from "../../../common/DetailsTemplate/DetailsTemplate.module.css";

import React from "react";
import {FormField} from "../../../../helpers/FormField/FormField";

export function SectionSkills({cvData, modify, state, setState}) {
    const professionalSkillsRef = React.useRef();
    const softSkillsRef = React.useRef();
    const languagesRef = React.useRef();

    function onClickHandler(e) {
        e.preventDefault()
        switch (e.target.id) {
            case "professionalSkills":
                if(professionalSkillsRef?.current?.value?.length > 64){
                    professionalSkillsRef.current.value = ""
                    alert("Professional skill name is too long. Max length is 64 characters.")
                    return;
                }
                setState(prevState => {
                    const newState = {...prevState}
                    newState.professionalSkills.push(professionalSkillsRef.current.value)
                    professionalSkillsRef.current.value = ""
                    return newState;
                })
                break;
            case "softSkills":
                if(softSkillsRef?.current?.value?.length > 64){
                    alert("Soft skill name is too long. Max length is 64 characters.")
                    return;
                }
                setState(prevState => {
                    const newState = {...prevState}
                    newState.softSkills.push(softSkillsRef.current.value)
                    softSkillsRef.current.value = ""
                    return newState;
                })
                break;
            case "languages":
                if(languagesRef?.current?.value?.length > 64){
                    alert("Language name is too long. Max length is 64 characters.")
                    return;
                }
                setState(prevState => {
                    const newState = {...prevState}
                    newState.otherLanguages.push(languagesRef.current.value)
                    languagesRef.current.value = ""
                    return newState;

                })
                break;
            default:
                break;
        }
    }

    const dataToShow = state || cvData;

    return (
        <section
            key={"skills"}
            id={"skills"}
            className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>Skills</h2>
            <ul className={styles.sectionInfoList}>
                <li className={styles.sectionInfoItem}>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Professional skills: </span>
                        {dataToShow?.professionalSkills?.join(", ")}
                    </p>
                    {modify &&
                        <>
                            <FormField
                                _ref={professionalSkillsRef}
                                name={"professionalSkills"}
                                type={"text"}
                                label={null}
                            />
                            <button
                                id={"professionalSkills"}
                                className={styles.Btn}
                                onClick={onClickHandler}
                            >
                                Add
                            </button>
                        </>
                    }
                </li>

                <li className={styles.sectionInfoItem}>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Languages: </span>
                        {[...dataToShow?.standardLanguages || [], ...dataToShow?.otherLanguages || []].join(", ")}
                    </p>
                    {modify &&
                        <>
                        <FormField
                            _ref={languagesRef}
                            name={"languages"}
                            type={"text"}
                            label={null}
                        />
                        <button
                            id={"languages"}
                            className={styles.Btn}
                            onClick={onClickHandler}
                        >
                            Add
                        </button>
                        </>
                    }
                </li>

                <li className={styles.sectionInfoItem}>
                    <p className={styles.sectionInfoItem}>
                        <span className={styles.infoLabel}>Soft skills: </span>
                        {dataToShow?.softSkills?.join(", ")}
                    </p>
                    {modify &&
                        <>
                        <FormField
                            _ref={softSkillsRef}
                            name={"softSkills"}
                            type={"text"}
                            label={null}
                        />
                        <button
                            id={"softSkills"}
                            className={styles.Btn}
                            onClick={onClickHandler}
                        >
                            Add
                        </button>
                        </>
                    }
                </li>
            </ul>
        </section>
    )
}
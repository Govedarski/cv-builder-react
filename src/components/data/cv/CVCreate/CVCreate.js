import React, {useContext, useEffect} from 'react';
import {useLocation, useNavigate, useParams,} from 'react-router-dom';
import {UserContext} from "../../../../context/UserContext";
import {LoadingContext} from "../../../../context/LoadingContext";
import {SectionWorkExp} from "../../workExp/WorkExpDetails/SectionWorkExp/SectionWorkExp";
import {SectionEducation} from "../../education/EducationDetails/SectionEducation/SectionEducation";
import {SectionReferences} from "../../references/ReferencesDetails/SectionReferences/SectionReferences";
import {SectionCertificates} from "../../certificates/CertificatesDetails/SectionCertificates/SectionCertificates";
import {SectionRequirements} from "../../requirements/RequirementsDetails/SectionRequirements/SectionRequirements";
import styles from "../../common/DetailsTemplate/DetailsTemplate.module.css";
import createStyles from "./CVCreate.module.css";
import {SectionPersonalInformation} from "../CVDetails/SectionPersonalInformation/SectionPersonalInformation";
import {SectionSkills} from "../CVDetails/SectionSkills/SectionSkills";
import {AsideMenu} from "../../../helpers/AsideMenu/AsideMenu";
import {useScroller} from "../../../../hooks/useScroller";
import {asideLinks} from "../../../../constants/asideLinks";
import {routes} from "../../../../constants/routes";
import {FormField} from "../../../helpers/FormField/FormField";
import {AddPopUp} from "../../common/AddPopUp/AddPopUp";
import {WorkExpItem} from "../../workExp/WorkExpList/WorkExpItem/WorkExpItem";
import {EducationItem} from "../../education/EducationList/EducationItem/EducationItem";
import {ReferencesItem} from "../../references/ReferencesList/ReferencesItem/ReferencesItem";
import {RequirementsItem} from "../../requirements/RequirementsList/RequirementsItem/RequirementsItem";
import {CertificatesItem} from "../../certificates/CertificatesList/CertificatesItems/CertificatesItem";


export function CVCreate() {
    const location = useLocation();
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const {cvId} = useParams();
    const [cvData, setDataCV] = React.useState({});
    const {cv} = location.state || {};
    const {setIsLoading} = useContext(LoadingContext);
    const navigate = useNavigate();
    const [effectFunc, resetFunc] = useScroller()
    useEffect(effectFunc, [location.hash])
    resetFunc()
    const [add, setAdd] = React.useState({
        workExp: false,
        education: false,
        reference: false,
        certificate: false,
        requirements: false
    });
    const [data, setData] = React.useState({
        workExp: [],
        education: [],
        reference: [],
        certificate: [],
        requirements: []
    });


    const [state, setState] = React.useState(cv || {
        name: "",
        hobbies: "",
        summary: "",
        standardLanguages: [],
        otherLanguages: [],
        referenceIds: [],
        professionalSkills: [],
        softSkills: [],
        educationIds: [],
        workExpIds: [],
        certificateIds: [],
        requirementsId: ""
    })

    function changeHandler(event) {
        setState(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            })
        )
    }

    function EditProfile() {
        navigate(routes.PROFILE_OWN, {state: {state: state}})
    }

    function onSubmit(e) {
        e.preventDefault()
        console.log(state)
    }

    function mark(e, section) {
        setState(prevState => {
            const newState = {...prevState};
            const id = Number(e.target.id);
            if (!newState[section +"Ids"]?.includes(id)) {
                newState[section +"Ids"].push(id);
            } else {
                newState[section +"Ids"] = newState[section +"Ids"]?.filter(x => x !== id);
            }
            return newState;
        })
    }

    function open(section) {
        navigate('#popUp')
        setAdd({
            workExp: false,
            education: false,
            reference: false,
            certificate: false,
            requirements: false,
            [section]: true
        })
    }

    function createAddBtn(section) {
        return (
            <button
                onClick={() => open(section)}
                className={styles.addBtn}
            >
                Add
            </button>
        )
    }

    function createAddPopUp(data, state, section) {
        let item = null;
        switch (section) {
            case "workExp":
                item = WorkExpItem;
                break
            case "education":
                item = EducationItem;
                break
            case "reference":
                item = ReferencesItem;
                break
            case "certificate":
                item = CertificatesItem;
                break
            case "requirements":
                item = RequirementsItem;
                break
            default:
                break
        }
        return (
            <AddPopUp
                section={section}
                data={data}
                setAdd={setAdd}
                mark={mark}
                marked={state}
                item={item}
            />
        )
    }



    return (
        <>
            <AsideMenu links={asideLinks}/>
            <form
                onSubmit={onSubmit}>

                <div className={styles.cvDetailsContainer + " " + createStyles.container}>
                    <section className={styles.title}>
                        <h1>CV Details</h1>
                        <h2>CV {cvData.id} {cvData.title}</h2>
                    </section>
                    <SectionPersonalInformation
                        onDoubleClick={EditProfile}
                        title={"Double click to Edit"}
                    />
                    <section id={"summary"} className={styles.sectionContainer}>
                        <h2 className={styles.sectionInfoTitle}>Summary</h2>
                        <FormField
                            name={"summary"}
                            value={state.summary}
                            onChange={changeHandler}
                            type={"textarea"}
                        />
                    </section>

                    <SectionWorkExp
                        workExpData={cvData?.work_exps}
                        addPopUp={createAddPopUp(data.workExp, state.workExpIds, "workExp")}
                        addBtn={createAddBtn("workExp")}
                        add={add.workExp}
                        state={state}
                        data={data.workExp}
                        setData={setData}
                    />

                    <SectionEducation
                        addPopUp={createAddPopUp(data.education, state.educationIds, "education")}
                        addBtn={createAddBtn("education")}
                        add={add.education}
                        state={state}
                        data={data.education}
                        setData={setData}
                    />
                    <SectionSkills cvData={cvData}/>
                    <SectionReferences
                        addPopUp={createAddPopUp(data.reference, state.referenceIds, "reference")}
                        addBtn={createAddBtn("reference")}
                        add={add.reference}
                        state={state}
                        data={data.reference}
                        setData={setData}
                    />
                    <SectionCertificates
                        addPopUp={createAddPopUp(data.certificate, state.certificateIds, "certificate")}
                        addBtn={createAddBtn("certificate")}
                        add={add.certificate}
                        state={state}
                        data={data.certificate}
                        setData={setData}
                    />
                    <section id={"hobbies"} className={styles.sectionContainer}>
                        <h2 className={styles.sectionInfoTitle}>Hobbies</h2>
                        <p className={styles.sectionInfoContainer}>{cvData.hobbies}</p>
                    </section>
                    ,
                    <SectionRequirements requirementsData={cvData?.requirements}/>
                </div>
                <button>Submit</button>
            </form>

        </>
    )
}

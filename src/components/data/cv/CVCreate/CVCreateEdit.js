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
import * as cvService from "../../../../services/dataServices/cvService/cvService";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import {publicStatusColors} from "../../../../constants/publicStatusColors";
import {useErrorManager} from '../../../../hooks/useErrorManager.js';
import {validationManager} from '../../../../utils/validation/validatonManager.js';
import {ValidateMaxLength} from '../../../../utils/validation/validators/validators.js';
import {ErrorList} from '../../../helpers/ErrorList/ErrorList.js';


export function CVCreateEdit({isEdit}) {
    const location = useLocation();
    const userContext = useContext(UserContext);
    const {profileData, userData} = useContext(UserContext);
    const userId = userContext.userData.id;
    const {cvId} = useParams();
    const [cvData, setDataCV] = React.useState({});
    const {cv} = location.state || {};
    const {setIsLoading} = useContext(LoadingContext);
    const navigate = useNavigate();
    const [effectFunc, resetFunc] = useScroller()
    useEffect(effectFunc, [location.hash])
    resetFunc()
    const errorManager = useErrorManager({});
    const [add, setAdd] = React.useState({
        workExp: false,
        education: false,
        reference: false,
        certificate: false,
        requirements: false,
    });
    const [data, setData] = React.useState({
        workExp: [],
        education: [],
        reference: [],
        certificate: [],
        requirements: [],
        professionalSkills: "",
        softSkills: "",
        standardLanguages: "",
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
        requirementsId: "",
        publicStatus:"Private"
    })

    useEffect(() => {
        if (!isEdit) {
            return
        }
        if (!cv) {
            setIsLoading(true);
            cvService.getCV(userId, cvId)
                .then((response) => {
                    response = changeObjectKeysNaming(response, snakeCaseToCamelCase)
                    response.workExps = response.workExps.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                    setState(response);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error)
                });
        } else {
            setState(cv);
        }
    }, []);


    function changeHandler(event) {
        setState(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            })
        )
    }

    function EditProfile() {
        navigate(routes.PROFILE_OWN, {
            state: {
                state: state,
                previousUrl: location.pathname
            }
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        validationManager.validate(
            [new ValidateMaxLength(1000)],
            "description",
            data.description,
            errorManager
        )
        validationManager.validate(
            [new ValidateMaxLength(1000)],
            "summary",
            data.summary,
            errorManager
        )
        errorManager.showAllErrors();
        if (errorManager.hasError()) {
            return;
        }
        setIsLoading(true)
        const service = isEdit
            ? cvService.updateCV.bind(null, userId, cvId, state)
            : cvService.createCV.bind(null, userId, state);
        service().then(res => {
            setIsLoading(false)
            navigate(
                routes.CV_DETAILS.replace(":cvId", res.id),
                {state: {cv: res}}
            )
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }

    function mark(e, section) {
        if (section === "requirements") {
            setState(prevState => ({
                ...prevState,
                requirementsId: Number(e.target.id)
            }))
            return;
        }

        setState(prevState => {
            const newState = {...prevState};
            const id = Number(e.target.id);
            if (!newState[section + "Ids"]?.includes(id)) {
                newState[section + "Ids"].push(id);
            } else {
                newState[section + "Ids"] = newState[section + "Ids"]?.filter(x => x !== id);
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
                className={styles.Btn}
            >
                Modify
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
                        <h1>{isEdit ? "Edit" : "Create"} CV</h1>
                        <h2>CV {cvData.id} {cvData.title}</h2>
                        <FormField
                            name={"publicStatus"}
                            value={state?.publicStatus}
                            onChange={changeHandler}
                            type={"select"}
                            label={null}
                            options={['Public','Protected', 'Private']}
                            fieldTitle={"Public is visible to all\nProtected is visible to all logged in users\nPrivate is visible only to you"}
                            fieldStyle={{backgroundColor: publicStatusColors[state?.publicStatus]}}
                        />

                    </section>
                    <SectionPersonalInformation
                        onDoubleClick={EditProfile}
                        data={state?.profile
                            ? state
                            : {profile:profileData,
                            email:userData.user.email}
                    }
                        title={"Double click to Edit"}
                    />
                    <section id={"summary"} className={styles.sectionContainer}>
                        <h2 className={styles.sectionInfoTitle}>Summary</h2>
                        <FormField
                            name={"summary"}
                            value={state?.summary}
                            onChange={changeHandler}
                            type={"textarea"}
                            label={null}
                        />
                    </section>

                    <SectionWorkExp
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
                    <SectionSkills
                        createPopUp={createAddPopUp}
                        createBtn={createAddBtn}
                        modify={true}
                        state={state}
                        setState={setState}
                    />
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
                        <FormField
                            name={"hobbies"}
                            value={state.hobbies}
                            onChange={changeHandler}
                            type={"textarea"}
                            label={null}
                        />
                    </section>
                    <SectionRequirements
                        addPopUp={createAddPopUp(data.requirements, state.requirementsId, "requirements")}
                        addBtn={createAddBtn("requirements")}
                        add={add.requirements}
                        state={state}
                        data={data.requirements}
                        setData={setData}
                    />
                    <button className={styles.Btn}>Submit</button>
                    <ErrorList errorData={errorManager.errorData}/>
                </div>
            </form>

        </>
    )
}

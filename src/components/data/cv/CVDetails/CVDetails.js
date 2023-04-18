import React, {useContext, useEffect} from 'react';
import {useLocation, useParams,} from 'react-router-dom';
import {UserContext} from "../../../../context/UserContext";
import * as cvService from "../../../../services/dataServices/cvService/cvService";
import {LoadingContext} from "../../../../context/LoadingContext";
import {SectionPersonalInformation} from "./SectionPersonalInformation/SectionPersonalInformation";
import {SectionWorkExp} from "../../workExp/WorkExpDetails/SectionWorkExp/SectionWorkExp";
import {SectionEducation} from "../../education/EducationDetails/SectionEducation/SectionEducation";
import {SectionSkills} from "./SectionSkills/SectionSkills";
import {SectionReferences} from "../../references/ReferencesDetails/SectionReferences/SectionReferences";
import {SectionCertificates} from "../../certificates/CertificatesDetails/SectionCertificates/SectionCertificates";
import {SectionRequirements} from "../../requirements/RequirementsDetails/SectionRequirements/SectionRequirements";
import {changeObjectKeysNaming, createAsideLink, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import Scroll from 'react-scroll';
import {DetailsTemplate} from "../../common/DetailsTemplate/DetailsTemplate";
import styles from "../../common/DetailsTemplate/DetailsTemplate.module.css";
import {publicStatusColors} from "../../../../constants/publicStatusColors";


export function CVDetails() {
    const location = useLocation();
    const userContext = useContext(UserContext);
    const userId = userContext.userData?.id;
    const {cvId} = useParams();
    const [cvData, setDataCV] = React.useState({});
    let {cv} = location.state || {};
    cv = changeObjectKeysNaming(cv, snakeCaseToCamelCase)

    const {setIsLoading} = useContext(LoadingContext);
    const scroller = Scroll.scroller;

    useEffect(() => {
            const sectionId = location.hash.slice(1);
            if (!sectionId) {
                return;
            }

            scroller.scrollTo(sectionId, {
                duration: 500,
                smooth: true,
                offset: -116
            });
        }, [location.hash]
    )
    window.history.replaceState('', document.title, window.location.pathname)


    const asideLinks = [
        createAsideLink("Personal Information", "#personal-information"),
        createAsideLink("Summary", "#summary"),
        createAsideLink("Work Experience", "#work-experience"),
        createAsideLink("Education", "#education"),
        createAsideLink("Skills", "#skills"),
        createAsideLink("References", "#references"),
        createAsideLink("Certificates", "#certificates"),
        createAsideLink("Hobbies", "#hobbies"),
        createAsideLink("Requirements", "#requirements"),
    ]
    console.log(cv)
    useEffect(() => {
        if (!cv) {
            setIsLoading(true)
            const service = !userContext.userData?.cvIds?.includes(Number(cvId))
                ? cvService.getPublicCV.bind(null, cvId)
                : cvService.getCV.bind(null, userId, cvId);


            service()
                .then((response) => {
                    console.log(response)

                    response = changeObjectKeysNaming(response, snakeCaseToCamelCase)
                    setDataCV(response);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false);
                });
        } else {
            setDataCV(cv);
        }
    }, []);


    const sections = (
        <>
            <section
                key={"header"}
                className={styles.title}
            >
                <h1>CV Details</h1>
                <h2>CV {cvData?.id} {cvData?.title}</h2>
                <h3 style={{color: publicStatusColors[cvData?.publicStatus]}}>
                    ({cvData?.publicStatus})
                </h3>
            </section>
            ,
            <SectionPersonalInformation
                data={cvData}
            />,
            <section
                key={"summary"}
                id={"summary"}
                className={styles.sectionContainer}
            >
                <h2 className={styles.sectionInfoTitle}>Summary</h2>
                <p className={styles.sectionInfoContainer}>{cvData?.summary}</p>
            </section>,
            <SectionWorkExp workExpData={cvData?.workExps}/>,
            <SectionEducation data={cvData?.education}/>,
            <SectionSkills cvData={cvData}/>,
            <SectionReferences itemData={cvData?.references}/>,
            <SectionCertificates data={cvData?.certificates}/>,
            <section
                key={"hobbies"}
                id={"hobbies"}
                className={styles.sectionContainer}>
                <h2 className={styles.sectionInfoTitle}>Hobbies</h2>
                <p className={styles.sectionInfoContainer}>{cvData?.hobbies}</p>
            </section>,
            <SectionRequirements data={cvData?.requirements}/>
        </>
    )

    return <DetailsTemplate
        sections={sections}
        asideLinks={asideLinks}
        hideAsideLinks={!userId || userId !== cvData?.ownerId}
        deleteService={cvService.deleteCV.bind(null, userId, cvId)}
    />
}

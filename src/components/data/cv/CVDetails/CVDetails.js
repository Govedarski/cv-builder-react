import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useParams,} from 'react-router-dom';
import {UserContext} from "../../../../context/UserContext";
import * as cvService from "../../../../services/dataServices/cvService/cvService";
import {LoadingContext} from "../../../../context/LoadingContext";
import {SectionPersonalInformation} from "./SectionPersonalInformation/SectionPersonalInformation";
import {SectionWorkExp} from "../../workExp/WorkExpDetails/SectionWorkExp/SectionWorkExp";
import {SectionEducation} from "./SectionEducation/SectionEducation";
import {SectionSkills} from "./SectionSkills/SectionSkills";
import {SectionReferences} from "./SectionReferences/SectionReferences";
import {SectionCertificates} from "./SectionCertificates/SectionCertificates";
import {SectionRequirements} from "./SectionRequirements/SectionRequirements";
import {createAsideLink} from "../../../../utils/helper_functions";
import Scroll from 'react-scroll';
import {DetailsTemplate} from "../../DetailsTemplate/DetailsTemplate";
import styles from "../../DetailsTemplate/DetailsTemplate.module.css";


export function CVDetails() {
    const location = useLocation();
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const {cvId} = useParams();
    const [cvData, setDataCV] = React.useState({});
    const {cv} = location.state || {};
    const {setIsLoading} = useContext(LoadingContext);
    const [selectedImage, setSelectedImage] = useState(null);
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

    function handleImageClick(e) {
        setSelectedImage(e.target.src);
    }

    const asideLinks = [
        createAsideLink("Edit", `/cv/${cvId}/edit`),
        createAsideLink("Delete", `/cv/${cvId}/delete`),
        createAsideLink("Back", "back"),
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

    useEffect(() => {
        if (!cv) {
            setIsLoading(true);
            cvService.getCV(userId, cvId)
                .then((response) => {
                    setDataCV(response);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        } else {
            setDataCV(cv);
        }
    }, []);

    const sections = [
        <section  className={styles.title}>
            <h1>CV Details</h1>
            <h2>CV {cvData.id} {cvData.title}</h2>
        </section>,
        <SectionPersonalInformation/>,
        <section id={"summary"} className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>Summary</h2>
            <p className={styles.sectionInfoContainer}>{cvData.summary}</p>
        </section>,
        <SectionWorkExp workExpData={cvData?.work_exps}/>,
        <SectionEducation educationData={cvData?.education}/>,
        <SectionSkills cvData={cvData}/>,
        <SectionReferences referencesData={cvData?.references}/>,
        <SectionCertificates
            certificatesData={cvData?.certificates}
            handleImageClick={handleImageClick}/>,
        <section id={"hobbies"} className={styles.sectionContainer}>
            <h2 className={styles.sectionInfoTitle}>Hobbies</h2>
            <p className={styles.sectionInfoContainer}>{cvData.hobbies}</p>
        </section>,
        <SectionRequirements requirementsData={cvData?.requirements}/>
    ]

    return <DetailsTemplate
        sections={sections}
        asideLinks={asideLinks}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}/>
}
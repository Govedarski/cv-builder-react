import {AsideMenu} from "../../helpers/AsideMenu/AsideMenu";
import {CloseButton} from "../../helpers/CloseButton/CloseButton";
import styles from './DetailsTemplate.module.css'
import {createAsideLink} from "../../../utils/helper_functions";
import {useLocation} from "react-router-dom";

export function DetailsTemplate({sections, asideLinks, selectedImage, setSelectedImage}) {
    const location = useLocation();
    const allAsideLinks = [
        createAsideLink("List", location.pathname.split("/").slice(0, -1).join("/")),
        createAsideLink("Edit", location.pathname + "/edit"),
        createAsideLink("Delete", location.pathname + "/delete"),
        createAsideLink("Back", "back"),
        ...asideLinks || []
    ]

    return (
        <>
            <AsideMenu links={allAsideLinks}/>
            <div className={styles.cvDetailsContainer}>
                {sections}
                {selectedImage && (
                    <div className={styles.imagePopup}>
                        <img src={selectedImage} alt="Certificate"/>
                        <CloseButton
                            className={styles.closeButton}
                            onClick={() => setSelectedImage(null)}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

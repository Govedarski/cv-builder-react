import {AsideMenu} from "../../helpers/AsideMenu/AsideMenu";
import {CloseButton} from "../../helpers/CloseButton/CloseButton";
import styles from './DetailsTemplate.module.css'

export function DetailsTemplate({sections, asideLinks, selectedImage, setSelectedImage}) {
    return (
        <>
            <AsideMenu links={asideLinks}/>
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

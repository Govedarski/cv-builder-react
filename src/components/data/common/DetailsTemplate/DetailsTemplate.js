import {AsideMenu} from "../../../helpers/AsideMenu/AsideMenu";
import {CloseButton} from "../../../helpers/CloseButton/CloseButton";
import styles from './DetailsTemplate.module.css'
import {createAsideLink} from "../../../../utils/helper_functions";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {DeletePopupMenu} from "../DeletePopUpMenu/DeletePopUpMenu";
import {LoadingContext} from "../../../../context/LoadingContext";

export function DetailsTemplate({sections, deleteService, asideLinks}) {
    const location = useLocation();
    const listLink = location.pathname.split("/").slice(0, -1).join("/")
    const {setIsLoading} = useContext(LoadingContext);
    const navigate = useNavigate()
    const [showDelete, setShowDelete] = useState(false);

    function showDeleteMenu(e) {
        e.preventDefault()
        setShowDelete(true);
    }

    function hideDeleteMenu() {
        setShowDelete(false);
    }

    function deleteItem() {
        setIsLoading(true);
        deleteService().then(() => {
                navigate(listLink)
                setIsLoading(false);
            }
        ).catch((error) => {
            console.log(error)
            setIsLoading(false);
        })
    }

    const allAsideLinks = [
        createAsideLink("List", location.pathname.split("/").slice(0, -1).join("/")),
        createAsideLink("Edit", location.pathname + "/edit"),
        createAsideLink("Delete", showDeleteMenu),
        createAsideLink("Back", "back"),
        ...asideLinks || []
    ]

    return (
        <>
            <AsideMenu links={allAsideLinks}/>
            <div className={styles.cvDetailsContainer}>
                {sections}
                {showDelete && <DeletePopupMenu onDelete={deleteItem} onCancel={hideDeleteMenu}/>}
            </div>
        </>
    );
}

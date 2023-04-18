import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../utils/helper_functions";
import placeholder from "./pngtree-user-avatar-placeholder-png-image_3918418.jpg"
import styles from './CvItem.module.css'
import {useNavigate} from "react-router-dom";
export function CvItem({data}) {
    data = changeObjectKeysNaming(data, snakeCaseToCamelCase)
    const navigate = useNavigate();
    function onClickHandler() {
        navigate(`/cv/${data.id}`, {state: {cv: data}})
    }
    return (
        <div
            className={styles.container}
            onClick={onClickHandler}
        >
            <img alt={"No photo provided"} src={data.profile.profilePictureFileUrl || placeholder}/>
            <div>
            <h3>Name: {data.first_name} {data.last_name}</h3>
            <p>{data.email}</p>
            </div>
        </div>
    )
}
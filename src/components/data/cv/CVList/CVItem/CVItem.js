import {useNavigate} from "react-router-dom";

export function CVItem({cv}) {
    const navigate = useNavigate();
    function onClickHandler(e) {
        navigate(`/cv/${cv.id}`, {state: {cv}})
    }

    return (
        <li onClick={onClickHandler}>
            CV {cv.id} {cv.name}
        </li>
    )
}
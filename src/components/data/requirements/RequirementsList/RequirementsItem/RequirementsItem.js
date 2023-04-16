import {useNavigate} from "react-router-dom";

export function RequirementsItem({data}) {
    const navigate = useNavigate();
    function onClickHandler(e) {
        navigate(`/requirements/${data.id}`, {state: {stateData: data}})
    }

    return (
        <li onClick={onClickHandler}>
            {data.name}
        </li>
    )
}
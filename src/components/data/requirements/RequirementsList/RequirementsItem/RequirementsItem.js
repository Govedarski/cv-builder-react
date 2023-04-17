import {useNavigate} from "react-router-dom";

export function RequirementsItem({data, onClick, className}) {
    const navigate = useNavigate();

    function onClickHandler(e) {
        navigate(`/requirements/${data.id}`, {state: {stateData: data}})
    }

    return (
        <li
            id={data.id}
            onClick={onClick || onClickHandler}
            className={className}
        >
            {data.name}
        </li>
    )
}
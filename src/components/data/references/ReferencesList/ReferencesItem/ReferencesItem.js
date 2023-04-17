import {useNavigate} from "react-router-dom";

export function ReferencesItem({data, onClick, className}) {
    const navigate = useNavigate();
    function onClickHandler(e) {
        navigate(`/references/${data.id}`, {state: {stateData: data}})
    }

    return (
        <li
            id={data.id}
            onClick={onClick || onClickHandler}
            className={className}
        >
            {data.name} - {data.company} ({data.position})
        </li>
    )
}
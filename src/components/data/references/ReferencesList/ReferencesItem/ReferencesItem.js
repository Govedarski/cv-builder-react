import {useNavigate} from "react-router-dom";

export function ReferencesItem({data}) {
    const navigate = useNavigate();
    function onClickHandler(e) {
        navigate(`/references/${data.id}`, {state: {stateData: data}})
    }

    return (
        <li onClick={onClickHandler}>
            {data.name} - {data.company} ({data.position})
        </li>
    )
}
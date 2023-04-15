import {useNavigate} from "react-router-dom";

export function EducationItem({data}) {
    const navigate = useNavigate();
    function onClickHandler(e) {
        navigate(`/education/${data.id}`, {state: {stateData: data}})
    }

    return (
        <li onClick={onClickHandler}>
            {data.institution} - {data.education_level} ({data.startDate} - {data.endDate})
        </li>
    )
}
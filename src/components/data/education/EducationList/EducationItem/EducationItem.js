import {useNavigate} from "react-router-dom";

export function EducationItem({data, onClick, className}) {
    const navigate = useNavigate();
    function onClickHandler(e) {
        navigate(`/education/${data.id}`, {state: {stateData: data}})
    }
    return (
        <li
            id={data.id}
            onClick={onClick || onClickHandler}
            className={className}
        >
            {data.institution} - {data.education_level} ({data.startDate} - {data.endDate})
        </li>
    )
}
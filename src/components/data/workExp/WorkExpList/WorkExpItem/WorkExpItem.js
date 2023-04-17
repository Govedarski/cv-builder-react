import {useNavigate} from "react-router-dom";

export function WorkExpItem({data, onClick, className}) {
    const navigate = useNavigate();
    function onClickHandler(e) {
        navigate(`/work-experience/${data.id}`, {state: {stateData: data}})
    }

    return (
        <li
            id={data.id}
            onClick={onClick || onClickHandler}
            className={className}
        >
            {data.companyName} - {data.jobTitle} ({data.startDate} - {data.endDate})
        </li>
    )
}
import {useNavigate} from "react-router-dom";

export function WorkExpItem({data}) {
    const navigate = useNavigate();
    console.log(data)
    function onClickHandler(e) {
        navigate(`/work-experience/${data.id}`, {state: {stateData: data}})
    }

    return (
        <li onClick={onClickHandler}>
            {data.companyName} - {data.jobTitle} ({data.startDate} - {data.endDate})
        </li>
    )
}
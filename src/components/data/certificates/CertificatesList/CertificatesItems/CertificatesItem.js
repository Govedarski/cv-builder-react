import {useNavigate} from "react-router-dom";

export function CertificatesItem({data, onClick, className}) {
    const navigate = useNavigate();
    function onClickHandler(e) {
        navigate(`/certificates/${data.id}`, {state: {stateData: data}})
    }

    return (
        <li
            id={data.id}
            onClick={onClick || onClickHandler}
            className={className}
        >
            {data.name} ({data.date})
        </li>
    )
}
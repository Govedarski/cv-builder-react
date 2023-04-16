import {useNavigate} from "react-router-dom";

export function CertificatesItem({data}) {
    const navigate = useNavigate();
    function onClickHandler(e) {
        navigate(`/certificates/${data.id}`, {state: {stateData: data}})
    }

    return (
        <li onClick={onClickHandler}>
            {data.name} ({data.date})
        </li>
    )
}
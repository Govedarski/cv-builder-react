import {ListTemplate} from '../../common/ListTemplate/ListTemplate.js';
import {UserContext} from "../../../../context/UserContext";
import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "../../../../context/LoadingContext";
import {routes} from "../../../../constants/routes";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import * as certificatesService from "../../../../services/dataServices/certificatesService/certificatesService";
import {CertificatesItem} from "./CertificatesItems/CertificatesItem";

export function CertificatesList() {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const [data, setData] = useState([]);
    const {setIsLoading} = useContext(LoadingContext);

    useEffect(() => {
        setIsLoading(true);
        certificatesService.getList(userId)
            .then((response) => {
                response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                setData(response.map(x => <CertificatesItem key={x.id} data={x}/>));
                setIsLoading(false);
            }).catch((error) => {
            setIsLoading(false);
        })
    }, [])

    return (
        <ListTemplate
            title={'Certificates List'}
            data={data}
            createLink={routes.CERTIFICATES_CREATE}
        />
    );
}


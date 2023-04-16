import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useParams,} from 'react-router-dom';
import {UserContext} from "../../../../context/UserContext";
import {LoadingContext} from "../../../../context/LoadingContext";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import {DetailsTemplate} from "../../common/DetailsTemplate/DetailsTemplate";
import * as certificatesService from "../../../../services/dataServices/certificatesService/certificatesService";
import {SectionCertificates} from "./SectionCertificates/SectionCertificates";


export function CertificatesDetails() {
    const location = useLocation();
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const {itemId} = useParams();
    const [data, setData] = React.useState(null);
    const {stateData} = location.state || {};
    const {setIsLoading} = useContext(LoadingContext);




    useEffect(() => {
        if (!stateData) {
            setIsLoading(true);
            certificatesService.getItem(userId, itemId)
                .then((response) => {
                    response = changeObjectKeysNaming(response, snakeCaseToCamelCase)
                    setData(response);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        } else {
            setData(stateData);
        }
    }, []);

    let sections= []
    if (data) {
        sections = [
            <SectionCertificates key={"certificates"}
                                 data={[data]}
            />,
        ]
    }

    return <DetailsTemplate
        sections={sections}
        deleteService={certificatesService.deleteItem.bind(null, userId, itemId)}
    />
}

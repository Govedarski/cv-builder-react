import React, {useContext, useEffect} from 'react';
import {useLocation, useParams,} from 'react-router-dom';
import {UserContext} from "../../../../context/UserContext";
import {LoadingContext} from "../../../../context/LoadingContext";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import {DetailsTemplate} from "../../common/DetailsTemplate/DetailsTemplate";
import * as requirementsService from "../../../../services/dataServices/requirementsService/requirementsService";
import {SectionRequirements} from "./SectionRequirements/SectionRequirements";


export function RequirementsDetails() {
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
            requirementsService.getItem(userId, itemId)
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
            <SectionRequirements key={"requirements"} data={data}/>,
        ]
    }

    return <DetailsTemplate
        sections={sections}
        deleteService={requirementsService.deleteItem.bind(null, userId, itemId)}
    />
}

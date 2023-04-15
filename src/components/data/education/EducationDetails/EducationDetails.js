import React, {useContext, useEffect} from 'react';
import {useLocation, useParams,} from 'react-router-dom';
import {UserContext} from "../../../../context/UserContext";
import {LoadingContext} from "../../../../context/LoadingContext";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import {DetailsTemplate} from "../../DetailsTemplate/DetailsTemplate";
import * as educationService from "../../../../services/dataServices/educationService/educationService";
import {SectionEducation} from "./SectionEducation/SectionEducation";


export function EducationDetails() {
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
            educationService.getItem(userId, itemId)
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
            <SectionEducation key={"education"} data={[data]}/>,
        ]
    }

    return <DetailsTemplate
        sections={sections}
        deleteService={educationService.deleteItem.bind(null, userId, itemId)}
    />
}

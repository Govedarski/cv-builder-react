import React, {useContext, useEffect} from 'react';
import {useLocation, useParams,} from 'react-router-dom';
import {UserContext} from "../../../../context/UserContext";
import {LoadingContext} from "../../../../context/LoadingContext";
import {SectionWorkExp} from "../../workExp/WorkExpDetails/SectionWorkExp/SectionWorkExp";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import {DetailsTemplate} from "../../common/DetailsTemplate/DetailsTemplate";
import * as workExpService from "../../../../services/dataServices/workExpService/workExpService";
import * as referencesService from "../../../../services/dataServices/referencesService/referencesService";
import {SectionReferences} from "./SectionReferences/SectionReferences";


export function ReferencesDetails() {
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
            referencesService.getItem(userId, itemId)
                .then((response) => {
                    response = changeObjectKeysNaming(response, snakeCaseToCamelCase)
                    setData(response);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false);
                });
        } else {
            setData(stateData);
        }
    }, []);
    console.log(data)

    let sections= []
    if (data) {
        sections = [
            <SectionReferences key={"references"} itemData={[data]}/>,
        ]
    }

    return <DetailsTemplate
        sections={sections}
        deleteService={referencesService.deleteItem.bind(null, userId, itemId)}
    />
}

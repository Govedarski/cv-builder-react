import React, {useContext, useEffect} from 'react';
import {useLocation, useParams,} from 'react-router-dom';
import {UserContext} from "../../../../context/UserContext";
import {LoadingContext} from "../../../../context/LoadingContext";
import {SectionWorkExp} from "../../workExp/WorkExpDetails/SectionWorkExp/SectionWorkExp";
import {changeObjectKeysNaming, createAsideLink, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import {DetailsTemplate} from "../../DetailsTemplate/DetailsTemplate";
import * as workExpService from "../../../../services/dataServices/workExpService/workExpService";


export function WorkExpDetails() {
    const location = useLocation();
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const {workExpId} = useParams();
    const [data, setData] = React.useState(null);
    const {stateData} = location.state || {};
    const {setIsLoading} = useContext(LoadingContext);


    const asideLinks = [
        createAsideLink("Edit", location.pathname + "/edit"),
        createAsideLink("Delete", location.pathname + "/delete"),
        createAsideLink("Back", "back"),
    ]

    useEffect(() => {
        if (!stateData) {
            setIsLoading(true);
            workExpService.getWorkExp(userId, workExpId)
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
            <SectionWorkExp key={"work-exp"} workExpData={[data]}/>,
        ]
    }

    return <DetailsTemplate
        sections={sections}
        asideLinks={asideLinks}
    />
}

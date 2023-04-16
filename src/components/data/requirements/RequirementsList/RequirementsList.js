import {ListTemplate} from '../../common/ListTemplate/ListTemplate.js';
import {UserContext} from "../../../../context/UserContext";
import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "../../../../context/LoadingContext";
import {routes} from "../../../../constants/routes";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import * as requirementsService from "../../../../services/dataServices/requirementsService/requirementsService";
import {RequirementsItem} from "./RequirementsItem/RequirementsItem";

export function RequirementsList() {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const [data, setData] = useState([]);
    const {setIsLoading} = useContext(LoadingContext);

    useEffect(() => {
        setIsLoading(true);
        requirementsService.getList(userId)
            .then((response) => {
                response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                setData(response.map(x => <RequirementsItem key={x.id} data={x}/>));
                setIsLoading(false);
            }).catch((error) => {
            setIsLoading(false);
        })
    }, [])

    return (
        <ListTemplate
            title={'Requirements List'}
            data={data}
            createLink={routes.REQUIREMENTS_CREATE}
        />
    );
}


import {ListTemplate} from '../../common/ListTemplate/ListTemplate.js';
import {UserContext} from "../../../../context/UserContext";
import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "../../../../context/LoadingContext";
import {routes} from "../../../../constants/routes";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import * as referencesService from "../../../../services/dataServices/referencesService/referencesService";
import {ReferencesItem} from "./ReferencesItem/ReferencesItem";

export function ReferencesList() {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const [data, setData] = useState([]);
    const {setIsLoading} = useContext(LoadingContext);

    useEffect(() => {
        setIsLoading(true);
        referencesService.getList(userId)
            .then((response) => {
                response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                setData(response.map(x => <ReferencesItem key={x.id} data={x}/>));
                setIsLoading(false);
            }).catch((error) => {
            setIsLoading(false);
        })
    }, [])

    return (
        <ListTemplate
            title={'References List'}
            data={data}
            createLink = {routes.REFERENCES_CREATE}
        />
    );
}


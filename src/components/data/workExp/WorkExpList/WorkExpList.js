import {ListTemplate} from '../../common/ListTemplate/ListTemplate.js';
import {UserContext} from "../../../../context/UserContext";
import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "../../../../context/LoadingContext";
import {routes} from "../../../../constants/routes";
import * as workExpService from "../../../../services/dataServices/workExpService/workExpService";
import {
    changeObjectKeysNaming,
    snakeCaseToCamelCase
} from "../../../../utils/helper_functions";
import {WorkExpItem} from "./WorkExpItem/WorkExpItem";

export function WorkExpList() {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const [data, setData] = useState([]);
    const {setIsLoading} = useContext(LoadingContext);

    useEffect(() => {
        setIsLoading(true);
        workExpService.getList(userId)
            .then((response) => {
                response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                setData(response.map(x => <WorkExpItem key={x.id} data={x}/>));
                setIsLoading(false);
            }).catch((error) => {
            setIsLoading(false);
        })
    }, [])

    return (
        <ListTemplate
            title={'Work Experience List'}
            data={data}
            createLink = {routes.WORK_EXP_CREATE}
        />
    );
}


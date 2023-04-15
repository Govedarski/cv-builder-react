import {ListTemplate} from '../../ListTemplate/ListTemplate.js';
import {UserContext} from "../../../../context/UserContext";
import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "../../../../context/LoadingContext";
import {routes} from "../../../../constants/routes";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import * as educationService from "../../../../services/dataServices/educationService/educationService";
import {EducationItem} from "./EducationItem/EducationItem";

export function EducationList() {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const [data, setData] = useState([]);
    const {setIsLoading} = useContext(LoadingContext);

    useEffect(() => {
        setIsLoading(true);
        educationService.getList(userId)
            .then((response) => {
                response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                setData(response.map(x => <EducationItem key={x.id} data={x}/>));
                setIsLoading(false);
            }).catch((error) => {
            setIsLoading(false);
        })
    }, [])

    return (
        <ListTemplate
            title={'Education List'}
            data={data}
            createLink={routes.EDUCATION_CREATE}
        />
    );
}


import {ListTemplate} from '../../common/ListTemplate/ListTemplate.js';
import {UserContext} from "../../../../context/UserContext";
import {useContext, useEffect, useState} from "react";
import * as cvService from "../../../../services/dataServices/cvService/cvService";
import {LoadingContext} from "../../../../context/LoadingContext";
import {routes} from "../../../../constants/routes";
import {CVItem} from "./CVItem/CVItem";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../../utils/helper_functions";

export function CVList() {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const [cvs, setCvs] = useState([]);
    const {setIsLoading} = useContext(LoadingContext);


    useEffect(() => {
        setIsLoading(true);
        cvService.getCVs(userId)
            .then((response) => {
                response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                setCvs(response.map(x => <CVItem key={x.id} cv={x}/>));
                setIsLoading(false);
            }).catch((error) => {
            console.log(error)
            setIsLoading(false);
        })
    }, [])

    return (
        <ListTemplate
            title={'CV List'}
            data={cvs}
            createLink={routes.CV_CREATE}
        />
    );
}


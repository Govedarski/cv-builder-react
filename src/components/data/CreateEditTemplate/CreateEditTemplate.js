import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "../../../context/LoadingContext";
import {UserContext} from "../../../context/UserContext";
import {useErrorManager} from "../../../hooks/useErrorManager";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {validationManager} from "../../../utils/validation/validatonManager";
import {ValidateMaxLength, ValidateMinLength} from "../../../utils/validation/validators/validators";
import {changeObjectKeysNaming, dateToString, snakeCaseToCamelCase} from "../../../utils/helper_functions";
import * as workExpService from "../../../services/dataServices/workExpService/workExpService";
import styles from "../workExp/WorkExpCreate/WorkExpCreate.module.css";
import {FormField} from "../../helpers/FormField/FormField";
import {employmentTypes} from "../../../constants/employmentTypes";
import {ErrorList} from "../../helpers/ErrorList/ErrorList";

export function CreateEditTemplate({
                                       actionService,
                                       getService,
                                       state,
                                       itemId,
                                       errorManager,
                                       validationFunc,
                                       dataModifier,
                                       destinationLink,
                                       formFields
                                   }) {
    const location = useLocation();
    const {setIsLoading} = useContext(LoadingContext);
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;

    const [data, setData] = state
    const {stateData} = location.state || {};

    useEffect(() => {
        if (getService && !stateData) {
            setIsLoading(true);
            getService(userId, itemId)
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

    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault()
        validationFunc()
        errorManager.showAllErrors();
        if (errorManager.hasError()) {
            return;
        }
        setIsLoading(true)
        let finalData = dataModifier({...data})
        actionService(userId, finalData).then(
            (res) => {
                res = changeObjectKeysNaming(res, snakeCaseToCamelCase)
                setIsLoading(false)
                navigate(destinationLink + res.id, {state: {stateData: res}})

            }
        ).catch(
            (err) => {
                console.log(err)
                setIsLoading(false)
            }
        )
    }

    return (
        <div className={styles.container}>
            <h1>Work Experience Create</h1>
            <form
                className={styles.formContainer}
                onSubmit={submitHandler}
            >
                {formFields}
                <button className={"submitBtn"}>Submit</button>
                <ErrorList errorData={errorManager.errorData}/>
            </form>
        </div>
    );

}

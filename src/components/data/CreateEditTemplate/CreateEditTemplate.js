import {useContext, useEffect} from "react";
import {LoadingContext} from "../../../context/LoadingContext";
import {useLocation, useNavigate} from "react-router-dom";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../../utils/helper_functions";
import styles from './CreateEditTemplate.module.css'
import {ErrorList} from "../../helpers/ErrorList/ErrorList";

export function CreateEditTemplate({    title,
                                       actionService,
                                       getService,
                                       state,
                                       errorManager,
                                       validationFunc,
                                       dataModifier,
                                       editDataModifier,
                                       destinationLink,
                                       formFields
                                   }) {
    const location = useLocation();
    const {setIsLoading} = useContext(LoadingContext);



    const [data, setData] = state
    const {stateData} = location.state || {};

    useEffect(() => {
        if (!getService){
            return
        }
        if (!stateData) {
            setIsLoading(true);
            getService()
                .then((response) => {
                    response = changeObjectKeysNaming(response, snakeCaseToCamelCase)
                    response = editDataModifier(response)
                    setData(response);
                    console.log(response)
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error)
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
        let finalData = dataModifier(data)
        actionService(finalData).then(
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
            <h1>{title}</h1>
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

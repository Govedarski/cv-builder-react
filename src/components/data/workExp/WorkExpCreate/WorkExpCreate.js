import {FormField} from "../../../helpers/FormField/FormField";
import styles from './WorkExpCreate.module.css';
import {useContext, useState} from "react";
import {employmentTypes} from "../../../../constants/employmentTypes";
import {useErrorManager} from "../../../../hooks/useErrorManager";
import {validationManager} from "../../../../utils/validation/validatonManager";
import {ValidateMaxLength, ValidateMinLength} from "../../../../utils/validation/validators/validators";
import {ErrorList} from "../../../helpers/ErrorList/ErrorList";
import {changeObjectKeysNaming, dateToString, snakeCaseToCamelCase} from "../../../../utils/helper_functions";
import * as workExpService from "../../../../services/dataServices/workExpService/workExpService";
import {UserContext} from "../../../../context/UserContext";
import {useNavigate} from "react-router-dom";
import {LoadingContext} from "../../../../context/LoadingContext";

export function WorkExpCreate() {
    const {setIsLoading} = useContext(LoadingContext);
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const [data, setData] = useState({
        companyName: '',
        jobTitle: '',
        fieldOfWork: '',
        employmentType: 'Full Time',
        startDate: '',
        endDate: '',
        description: ''
    })
    const errorManager = useErrorManager({
        companyName: [],
        jobTitle: [],
        fieldOfWork: [],
        employmentType: [],
        startDate: [],
        endDate: [],
        description: [],
    });
    const navigate = useNavigate();

    function createErrorOptions(name) {
        return {errorMessage: `${name} is required`}
    }

    function checkCompanyName() {
        const name = "companyName"
        const options = createErrorOptions(name)
        validationManager.validate(
            [new ValidateMinLength(1, options), new ValidateMaxLength(64)],
            name,
            data.companyName,
            errorManager
        )
    }

    function checkJobTitle() {
        const name = "jobTitle"
        const options = createErrorOptions(name)
        validationManager.validate(
            [new ValidateMinLength(1, options), new ValidateMaxLength(64)],
            name,
            data.jobTitle,
            errorManager
        )
    }

    function checkFieldOfWork() {
        const name = "fieldOfWork"
        const options = createErrorOptions(name)
        validationManager.validate(
            [new ValidateMinLength(1, options), new ValidateMaxLength(64)],
            name,
            data.fieldOfWork,
            errorManager
        )
    }

    function checkDescription() {
        validationManager.validate(
            [new ValidateMaxLength(500)],
            "description",
            data.description,
            errorManager
        )
    }

    function checkStartDate() {
        const name = "startDate"
        const options = createErrorOptions(name)

        validationManager.validate(
            [new ValidateMinLength(1, options)],
            name,
            data.startDate,
            errorManager
        )
    }
    function checkAll() {
        checkCompanyName()
        checkJobTitle()
        checkFieldOfWork()
        checkDescription()
        checkStartDate()
    }


    function onChangeHandler(e) {
        setData(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }));
    }


    function submitHandler(e) {
        e.preventDefault()
        checkAll()
        errorManager.showAllErrors();
        if (errorManager.hasError()) {
            return;
        }
        setIsLoading(true)
        let finalData = {...data}
        if (finalData.endDate === '') {
            finalData.endDate = 'Present'
        }else{
            finalData.endDate = dateToString(finalData.endDate, 'dd/mm/yyyy')
        }
        finalData.startDate = dateToString(finalData.startDate, 'dd/mm/yyyy')
        workExpService.createWorkExp(userId, finalData).then(
            (res) => {
                res = changeObjectKeysNaming(res, snakeCaseToCamelCase)
                setIsLoading(false)
                navigate(`/work-experience/${res.id}`, {state: {stateData: res}})

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
                <FormField
                    name="startDate"
                    type={"date"}
                    value={data.startDate}
                    onChange={onChangeHandler}
                />
                <FormField
                    name="endDate"
                    type={"date"}
                    placeholder={"Present"}
                    value={data.endDate}
                    onChange={onChangeHandler}
                    fieldTitle={"Leave blank if you are still working here"}
                />
                <FormField
                    name="companyName"
                    value={data.companyName}
                    onChange={onChangeHandler}
                />
                <FormField
                    name="jobTitle"
                    value={data.jobTitle}
                    onChange={onChangeHandler}
                />
                <FormField
                    name="fieldOfWork"
                    value={data.fieldOfWork}
                    onChange={onChangeHandler}
                />
                <FormField
                    name="employmentType"
                    type={"select"}
                    value={data.employmentType}
                    onChange={onChangeHandler}
                    options={employmentTypes}
                />
                <FormField
                    name="description"
                    type={"textarea"}
                    value={data.description}
                    onChange={onChangeHandler}
                />
                <button className={"submitBtn"}>Submit</button>
                <ErrorList errorData={errorManager.errorData}/>
            </form>
        </div>
    );

}
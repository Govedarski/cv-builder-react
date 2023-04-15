import {FormField} from "../../../helpers/FormField/FormField";
import {useContext, useState} from "react";
import {employmentTypes} from "../../../../constants/employmentTypes";
import {useErrorManager} from "../../../../hooks/useErrorManager";
import {validationManager} from "../../../../utils/validation/validatonManager";
import {ValidateMaxLength, ValidateMinLength} from "../../../../utils/validation/validators/validators";
import {dateToString, stringToDate} from "../../../../utils/helper_functions";
import * as workExpService from "../../../../services/dataServices/workExpService/workExpService";
import {CreateEditTemplate} from "../../CreateEditTemplate/CreateEditTemplate";
import {UserContext} from "../../../../context/UserContext";
import {useParams} from "react-router-dom";

export function WorkExpCreateEdit({isEdit}) {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const {itemId} = useParams();

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

    function dataModifier(data) {
        let finalData = {...data}
        if (finalData.endDate === '') {
            finalData.endDate = 'Present'
        } else {
            finalData.endDate = dateToString(finalData.endDate, 'dd/mm/yyyy')
        }
        finalData.startDate = dateToString(finalData.startDate, 'dd/mm/yyyy')
        return finalData
    }

    function editDataModifier(data) {
        let finalData = {...data}
        if (finalData.endDate === 'Present') {
            finalData.endDate = ''
        } else {
            finalData.endDate = stringToDate(finalData.endDate, 'dd/mm/yyyy')
        }
        finalData.startDate = stringToDate(finalData.startDate, 'dd/mm/yyyy')
        delete finalData.id

        return finalData
    }

    const formFields = [
        <FormField
            key={"startDate"}
            name="startDate"
            type={"date"}
            value={data.startDate}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"endDate"}
            name="endDate"
            type={"date"}
            placeholder={"Present"}
            value={data.endDate}
            onChange={onChangeHandler}
            fieldTitle={"Leave blank if you are still working here"}
        />,
        <FormField
            key={"companyName"}
            name="companyName"
            value={data.companyName}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"jobTitle"}
            name="jobTitle"
            value={data.jobTitle}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"fieldOfWork"}
            name="fieldOfWork"
            value={data.fieldOfWork}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"employmentType"}
            name="employmentType"
            type={"select"}
            value={data.employmentType}
            onChange={onChangeHandler}
            options={employmentTypes}
        />,
        <FormField
            key={"description"}
            name="description"
            type={"textarea"}
            value={data.description}
            onChange={onChangeHandler}
        />,
    ]
    return (
        <CreateEditTemplate
            actionService={isEdit
                ? workExpService.updateWorkExp.bind(null,  userId, itemId)
                : workExpService.createWorkExp.bind(null, userId)}
            getService={isEdit && workExpService.getWorkExp.bind(null, userId, itemId)}
            state={[data, setData]}
            errorManager={errorManager}
            validationFunc={checkAll}
            dataModifier={dataModifier}
            editDataModifier={editDataModifier}
            destinationLink={'/work-experience/'}
            formFields={formFields}

        />
    );
}
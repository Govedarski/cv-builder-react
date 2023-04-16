import {FormField} from "../../../helpers/FormField/FormField";
import {useContext, useState} from "react";
import {useErrorManager} from "../../../../hooks/useErrorManager";
import {validationManager} from "../../../../utils/validation/validatonManager";
import {ValidateMinLength, ValidateMinValue} from "../../../../utils/validation/validators/validators";
import {createErrorOptions} from "../../../../utils/helper_functions";
import {CreateEditTemplate} from "../../common/CreateEditTemplate/CreateEditTemplate";
import {UserContext} from "../../../../context/UserContext";
import {useParams} from "react-router-dom";
import {employmentTypes} from "../../../../constants/employmentTypes";
import * as requirementsService from "../../../../services/dataServices/requirementsService/requirementsService";

export function RequirementsCreateEdit({isEdit}) {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const {itemId} = useParams();

    const [data, setData] = useState({
        name: '',
        salaryMinRange: '',
        salaryMaxRange: '',
        employmentType: 'Full Time'
    })

    const errorManager = useErrorManager({});

    function checkName() {
        const name = "name"
        const options = createErrorOptions(name)
        validationManager.validate(
            [new ValidateMinLength(1, options)],
            name,
            data.name,
            errorManager
        )
    }
    function checkMinSalary() {
        validationManager.validate(
            [new ValidateMinValue(0)],
            "salaryMinRange",
            data.salaryMinRange,
            errorManager
        )
    }
    function checkMaxSalary() {
        if (!data.salaryMaxRange) return
        const minValue = data.salaryMinRange ? Number(data.salaryMinRange) : 0
        validationManager.validate(
            [new ValidateMinValue(minValue)],
            "salaryMaxRange",
            data.salaryMaxRange,
            errorManager
        )
    }

    function checkAll() {
        checkName()
        checkMinSalary()
        checkMaxSalary()
    }
    function onChangeHandler(e) {
        setData(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }));
    }


    function editDataModifier(data) {
        let finalData = {...data}
        delete finalData.id
        return finalData
    }

    const formFields = [
        <FormField
            key={"name"}
            name="name"
            value={data.name}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"salaryMinRange"}
            name="salaryMinRange"
            type={"number"}
            value={data.salaryMinRange}
            onChange={onChangeHandler}
            style={{width: '256px'}}
        />,
        <FormField
            key={"salaryMaxRange"}
            name="salaryMaxRange"
            type={"number"}
            value={data.salaryMaxRange}
            onChange={onChangeHandler}
            style={{width: '256px'}}
        />,
        <FormField
            key={"employmentType"}
            name="employmentType"
            type={"select"}
            value={data.employmentType}
            onChange={onChangeHandler}
            options={employmentTypes}
        />
    ]
    return (
        <CreateEditTemplate
            title={isEdit ? "Edit Requirements" : "Add Requirements:"}
            actionService={isEdit
                ? requirementsService.update.bind(null,  userId, itemId)
                : requirementsService.create.bind(null, userId)}
            getService={isEdit && requirementsService.getItem.bind(null, userId, itemId)}
            state={[data, setData]}
            errorManager={errorManager}
            validationFunc={checkAll}
            editDataModifier={editDataModifier}
            destinationLink={'/requirements/'}
            formFields={formFields}
        />
    );
}
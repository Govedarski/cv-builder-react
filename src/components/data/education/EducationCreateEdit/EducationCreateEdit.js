import {FormField} from "../../../helpers/FormField/FormField";
import {useContext, useState} from "react";
import {useErrorManager} from "../../../../hooks/useErrorManager";
import {validationManager} from "../../../../utils/validation/validatonManager";
import {ValidateMaxLength, ValidateMinLength} from "../../../../utils/validation/validators/validators";
import {createErrorOptions, dateToString, stringToDate} from "../../../../utils/helper_functions";
import * as workExpService from "../../../../services/dataServices/workExpService/workExpService";
import {CreateEditTemplate} from "../../CreateEditTemplate/CreateEditTemplate";
import {UserContext} from "../../../../context/UserContext";
import {useParams} from "react-router-dom";
import {educationLevels} from "../../../../constants/educationLevels";
import * as educationService from "../../../../services/dataServices/educationService/educationService";

export function EducationCreateEdit({isEdit}) {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const {itemId} = useParams();

    const [data, setData] = useState({
        institution: '',
        qualification: '',
        startDate: '',
        endDate: '',
        description: '',
        educationLevel: 'High School',
        diplomaNumber: '',
    })

    const errorManager = useErrorManager({});




    function checkInstitution() {
        const name = "institution"
        const options = createErrorOptions(name)
        validationManager.validate(
            [new ValidateMinLength(1, options),
                new ValidateMaxLength(100)],
            name,
            data.institution,
            errorManager
        )
    }

    function checkQualification() {
        const name = "qualification"
        const options = createErrorOptions(name)
        validationManager.validate(
            [new ValidateMinLength(1, options),
                new ValidateMaxLength(100)],
            name,
            data.qualification,
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

    function checkDiplomaNumber() {
        validationManager.validate(
            [new ValidateMaxLength(100)],
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
        checkInstitution()
        checkQualification()
        checkDescription()
        checkDescription()
        checkStartDate()
        checkDiplomaNumber()
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
        delete finalData.ownerId
        delete finalData.diplomaFileUrl
        console.log(finalData)

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
            key={"institution"}
            name="institution"
            value={data.institution}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"qualification"}
            name="qualification"
            value={data.qualification}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"diplomaNumber"}
            name="diplomaNumber"
            value={data.diplomaNumber}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"educationLevel"}
            name="educationLevel"
            type={"select"}
            value={data.educationLevel}
            onChange={onChangeHandler}
            options={educationLevels}
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
            title={isEdit ? "Edit Education" : "Add Education"}
            actionService={isEdit
                ? educationService.update.bind(null,  userId, itemId)
                : educationService.create.bind(null, userId)}
            getService={isEdit && educationService.getItem.bind(null, userId, itemId)}
            state={[data, setData]}
            errorManager={errorManager}
            validationFunc={checkAll}
            dataModifier={dataModifier}
            editDataModifier={editDataModifier}
            destinationLink={'/education/'}
            formFields={formFields}

        />
    );
}
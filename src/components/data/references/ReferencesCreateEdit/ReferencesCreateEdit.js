import {FormField} from "../../../helpers/FormField/FormField";
import {useContext, useState} from "react";
import {useErrorManager} from "../../../../hooks/useErrorManager";
import {validationManager} from "../../../../utils/validation/validatonManager";
import {ValidateMaxLength, ValidateMinLength} from "../../../../utils/validation/validators/validators";
import * as workExpService from "../../../../services/dataServices/workExpService/workExpService";
import {CreateEditTemplate} from "../../common/CreateEditTemplate/CreateEditTemplate";
import {UserContext} from "../../../../context/UserContext";
import {useParams} from "react-router-dom";
import * as referenceService from "../../../../services/dataServices/referencesService/referencesService";

export function ReferencesCreateEdit({isEdit}) {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const {itemId} = useParams();

    const [data, setData] = useState({
        name: '',
        company: '',
        position: '',
        contacts: '',
    })

    const errorManager = useErrorManager({
        name: [],
        company: [],
        position: [],
        contacts: [],
    });


    function createErrorOptions(name) {
        return {errorMessage: `${name} is required`}
    }

    function checkField(name, value, maxLength) {
        const options = createErrorOptions(name)
        validationManager.validate(
            [new ValidateMinLength(1, options), new ValidateMaxLength(maxLength)],
            name,
            value,
            errorManager
        )
    }


    function checkAll() {
        checkField('name', data.name, 100)
        checkField('company', data.company, 100)
        checkField('position', data.position, 100)
        checkField('contacts', data.contacts, 200)

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
            key={"company"}
            name="company"
            value={data.company}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"position"}
            name="position"
            value={data.position}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"contacts"}
            name="contacts"
            type={"textarea"}
            value={data.contacts}
            onChange={onChangeHandler}
        />,
    ]
    return (
        <CreateEditTemplate
            title={isEdit ? "Edit Reference" : "Add Reference"}
            actionService={isEdit
                ? referenceService.update.bind(null, userId, itemId)
                : referenceService.create.bind(null, userId)}
            getService={isEdit && referenceService.getItem.bind(null, userId, itemId)}
            state={[data, setData]}
            errorManager={errorManager}
            validationFunc={checkAll}
            editDataModifier={editDataModifier}
            destinationLink={'/references/'}
            formFields={formFields}

        />
    );
}
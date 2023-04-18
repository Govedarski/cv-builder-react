import {FormField} from "../../../helpers/FormField/FormField";
import {useContext, useState} from "react";
import {useErrorManager} from "../../../../hooks/useErrorManager";
import {validationManager} from "../../../../utils/validation/validatonManager";
import {ValidateMaxLength, ValidateMinLength} from "../../../../utils/validation/validators/validators";
import {createErrorOptions, dateToString, stringToDate} from "../../../../utils/helper_functions";
import {CreateEditTemplate} from "../../common/CreateEditTemplate/CreateEditTemplate";
import {UserContext} from "../../../../context/UserContext";
import {useParams} from "react-router-dom";
import * as certificatesService from "../../../../services/dataServices/certificatesService/certificatesService";
import {ImageInput} from "../../../helpers/custom_inputs/ImageInput/ImageInput";
import {useImageData} from "../../../../hooks/useImageData";

export function CertificatesCreateEdit({isEdit}) {
    const userContext = useContext(UserContext);
    const userId = userContext.userData.id;
    const {itemId} = useParams();

    const [data, setData] = useState({
        name: '',
        date: '',
        description: '',
        imageFileUrl: '',
    })
    const [image, setImage] = useImageData();


    const errorManager = useErrorManager({});

    function checkName() {
        const name = "name"
        const options = createErrorOptions(name)
        validationManager.validate(
            [new ValidateMinLength(1, options),
                new ValidateMaxLength(64)],
            name,
            data.name,
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


    function checkDate() {
        const name = "date"
        const options = createErrorOptions(name)

        validationManager.validate(
            [new ValidateMinLength(1, options)],
            name,
            data.date,
            errorManager
        )
    }

    function checkAll() {
        checkName()
        checkDescription()
        checkDate()
    }


    function onChangeHandler(e) {
        setData(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }));
    }

    function dataModifier(data) {
        let finalData = {...data}
        finalData.date = dateToString(finalData.date, 'dd/mm/yyyy')
        finalData.imageBinary = image.binary;

        finalData.imageExtension = image.extension;
        delete finalData.imageFileUrl

        return finalData
    }

    function editDataModifier(data) {
        let finalData = {...data}

        finalData.date = stringToDate(finalData.date, 'dd/mm/yyyy')
        delete finalData.id

        return finalData
    }

    function deleteImage() {
        if (image || data.imageFileUrl){
            setImage('', '', '');
            data.imageFileUrl = ""
            certificatesService.deleteImage(userId, itemId)
        }
        // if (!profileData.profilePictureFileUrl && !profilePicture.image) {
        //     return;
        // }
        // setIsLoading(true);
        // profileService.deleteProfilePicture(user_id)
        //     .then(res => {
        //         userContext.setProfile(res);
        //         setProfilePicture('', '', '');
        //         setIsLoading(false);
        //     })
        //     .catch(err => {
        //         setIsLoading(false);
        //     });
    }
    console.log(data)
    const formFields = [
        <FormField
            key={"name"}
            name="name"
            value={data.name}
            onChange={onChangeHandler}
        />,
        <FormField
            key={"date"}
            name="date"
            type={"date"}
            value={data.date}
            onChange={onChangeHandler}
        />,
        <ImageInput
            key={"image"}
            imageData={image}
            imageUrl={data.imageFileUrl}
            setImageData={setImage}
            style={{maxWidth: '256px'}}
            deleteImageHandler={deleteImage}
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
            title={isEdit ? "Edit Certificate" : "Add Certificate"}
            actionService={isEdit
                ? certificatesService.update.bind(null,  userId, itemId)
                : certificatesService.create.bind(null, userId)}
            getService={isEdit && certificatesService.getItem.bind(null, userId, itemId)}
            state={[data, setData]}
            errorManager={errorManager}
            validationFunc={checkAll}
            dataModifier={dataModifier}
            editDataModifier={editDataModifier}
            destinationLink={'/certificates/'}
            formFields={formFields}

        />
    );
}
import {request} from '../requestService.js';
import {camelCaseTextToSnakeCase, dateToString} from '../../utils/helper_functions.js';


export async function editProfile(user_id, data) {
    const dateOfBirth = data.dateOfBirth && dateToString(data.dateOfBirth, 'dd/MM/yyyy')
    return request.put(`/user/${user_id}/profile`, {
        first_name: data.firstName,
        last_name: data.lastName,
        date_of_birth: dateOfBirth,
        phone_number: data.phoneNumber,
        city: data.city,
        address: data.address,
        profile_picture_binary:data.binary,
        profile_picture_extension:data.extension,
        public_fields: data.publicFields?.map(camelCaseTextToSnakeCase)
    });
}

export async function deleteProfilePicture(user_id) {
    return request.delete(`/user/${user_id}/profile/profile_picture`);
}
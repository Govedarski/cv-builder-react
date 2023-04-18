import {request} from "../../requestService";
import {camelCaseTextToSnakeCase, changeObjectKeysNaming} from "../../../utils/helper_functions";

export async function getList(UserId){
    return request.get(`/user/${UserId}/certificates`);
}

export async function getItem(UserId, itemId) {
    return request.get(`/user/${UserId}/certificates/${itemId}`);
}

export async function create(userId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.post(`/user/${userId}/certificates`, data);
}

export async function update(userId, itemId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.put(`/user/${userId}/certificates/${itemId}`, data);
}

export async function deleteItem(userId, itemId) {
    return request.delete(`/user/${userId}/certificates/${itemId}`);
}

export async function deleteImage(userId, itemId) {
    return request.delete(`/user/${userId}/certificates/${itemId}/image`);
}
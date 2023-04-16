import {request} from "../../requestService";
import {camelCaseTextToSnakeCase, changeObjectKeysNaming} from "../../../utils/helper_functions";

export async function getList(UserId){
    return request.get(`/user/${UserId}/requirements`);
}

export async function getItem(UserId, itemId) {
    return request.get(`/user/${UserId}/requirements/${itemId}`);
}

export async function create(userId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.post(`/user/${userId}/requirements`, data);
}

export async function update(userId, itemId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.put(`/user/${userId}/requirements/${itemId}`, data);
}

export async function deleteItem(userId, itemId) {
    return request.delete(`/user/${userId}/requirements/${itemId}`);
}
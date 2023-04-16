import {request} from "../../requestService";
import {camelCaseTextToSnakeCase, changeObjectKeysNaming} from "../../../utils/helper_functions";

export async function getList(UserId){
    return request.get(`/user/${UserId}/requirements`);
}

export async function getItem(UserId, workExpId) {
    return request.get(`/user/${UserId}/requirements/${workExpId}`);
}

export async function create(userId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.post(`/user/${userId}/requirements`, data);
}

export async function update(userId, workExpId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.put(`/user/${userId}/requirements/${workExpId}`, data);
}

export async function deleteItem(userId, workExpId) {
    return request.delete(`/user/${userId}/requirements/${workExpId}`);
}
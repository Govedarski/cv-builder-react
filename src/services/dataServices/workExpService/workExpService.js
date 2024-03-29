import {request} from "../../requestService";
import {camelCaseTextToSnakeCase, changeObjectKeysNaming} from "../../../utils/helper_functions";

export async function getList(UserId){
    return request.get(`/user/${UserId}/work_exp`);
}

export async function getItem(UserId, itemId) {
    return request.get(`/user/${UserId}/work_exp/${itemId}`);
}

export async function create(userId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.post(`/user/${userId}/work_exp`, data);
}

export async function update(userId, itemId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.put(`/user/${userId}/work_exp/${itemId}`, data);
}

export async function deleteItem(userId, itemId) {
    return request.delete(`/user/${userId}/work_exp/${itemId}`);
}
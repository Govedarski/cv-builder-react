import {request} from "../../requestService";
import {camelCaseTextToSnakeCase, changeObjectKeysNaming} from "../../../utils/helper_functions";

export async function getList(UserId){
    return request.get(`/user/${UserId}/references`);
}

export async function getItem(UserId, itemId) {
    return request.get(`/user/${UserId}/references/${itemId}`);
}

export async function create(userId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.post(`/user/${userId}/references`, data);
}

export async function update(userId, itemId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.put(`/user/${userId}/references/${itemId}`, data);
}

export async function deleteItem(userId, itemId) {
    return request.delete(`/user/${userId}/references/${itemId}`);
}
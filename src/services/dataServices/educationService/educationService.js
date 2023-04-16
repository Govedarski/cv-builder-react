import {request} from "../../requestService";
import {camelCaseTextToSnakeCase, changeObjectKeysNaming} from "../../../utils/helper_functions";

export async function getList(UserId){
    return request.get(`/user/${UserId}/education`);
}

export async function getItem(UserId, itemId) {
    return request.get(`/user/${UserId}/education/${itemId}`);
}

export async function create(userId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.post(`/user/${userId}/education`, data);
}

export async function update(userId, itemId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.put(`/user/${userId}/education/${itemId}`, data);
}

export async function deleteItem(userId, itemId) {
    return request.delete(`/user/${userId}/education/${itemId}`);
}
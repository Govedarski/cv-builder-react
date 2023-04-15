import {request} from "../../requestService";
import {camelCaseTextToSnakeCase, changeObjectKeysNaming} from "../../../utils/helper_functions";

export async function getList(UserId){
    return request.get(`/user/${UserId}/education`);
}

export async function getItem(UserId, workExpId) {
    return request.get(`/user/${UserId}/education/${workExpId}`);
}

export async function create(userId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.post(`/user/${userId}/education`, data);
}

export async function update(userId, workExpId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.put(`/user/${userId}/education/${workExpId}`, data);
}

export async function deleteItem(userId, workExpId) {
    return request.delete(`/user/${userId}/education/${workExpId}`);
}
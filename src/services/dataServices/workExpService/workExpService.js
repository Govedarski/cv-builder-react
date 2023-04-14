import {request} from "../../requestService";
import {camelCaseTextToSnakeCase, changeObjectKeysNaming} from "../../../utils/helper_functions";

export async function getWorkExps(UserId){
    return request.get(`/user/${UserId}/work_exp`);
}

export async function getWorkExp(UserId, workExpId) {
    return request.get(`/user/${UserId}/work_exp/${workExpId}`);
}

export async function createWorkExp(userId, data) {
    data = changeObjectKeysNaming(data, camelCaseTextToSnakeCase);
    return request.post(`/user/${userId}/work_exp`, data);
}


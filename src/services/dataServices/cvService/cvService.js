import {request} from "../../requestService";
import {camelCaseTextToSnakeCase, changeObjectKeysNaming} from "../../../utils/helper_functions";

export async function getCVs(userId) {
    return request.get(`/user/${userId}/cv`);
}

export async function getCV(userId, cvId) {
    return request.get(`/user/${userId}/cv/${cvId}`);
}

export async function createCV(userId, cvData) {
    cvData = changeObjectKeysNaming(cvData, camelCaseTextToSnakeCase);
    return request.post(`/user/${userId}/cv`, cvData);
}
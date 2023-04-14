import {request} from "../../requestService";

export async function getCVs(userId) {
    return request.get(`/user/${userId}/cv`);
}

export async function getCV(userId, cvId) {
    return request.get(`/user/${userId}/cv/${cvId}`);
}
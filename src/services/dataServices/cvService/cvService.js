import {request} from "../../requestService";
import {camelCaseTextToSnakeCase, changeObjectKeysNaming} from "../../../utils/helper_functions";

export async function getCVs(userId) {
    return request.get(`/user/${userId}/cv`);
}
export async function getAllCVs() {
    return request.get(`/cv`);
}
export async function getCV(userId, cvId) {
    return request.get(`/user/${userId}/cv/${cvId}`);
}
export async function getPublicCV( cvId) {
    return request.get(`/cv/${cvId}`);
}

export async function createCV(userId, cvData) {
    cvData = changeObjectKeysNaming(cvData, camelCaseTextToSnakeCase);
    return request.post(`/user/${userId}/cv`, cvData);
}

export async function updateCV(userId, cvId, cvData) {
    cvData = {
        name: cvData.name,
        hobbies: cvData.hobbies,
        summary: cvData.summary,
        standard_language: cvData.standardLanguage,
        other_languages: cvData.otherLanguages,
        reference_ids: cvData.referenceIds,
        education_ids: cvData.educationIds,
        work_exp_ids: cvData.workExpIds,
        certificate_ids: cvData.certificateIds,
        requirements_id: Number(cvData.requirementsId),
        professional_skills: cvData.professionalSkills,
        soft_skills: cvData.softSkills,
        public_status: cvData.publicStatus,
    }
    return request.put(`/user/${userId}/cv/${cvId}`, cvData);
}

export async function deleteCV(userId, cvId) {
    return request.delete(`/user/${userId}/cv/${cvId}`);
}
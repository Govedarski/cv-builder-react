import {request} from '../requestService.js';

export async function loginJobSeeker(identifier, password) {
    return request.post('/user/login/job_seeker', {
        identifier,
        password
    })
}

export async function register(credentials, profileData){
    return request.post('/user/register/job_seeker', {
        credentials,
        profile_data : profileData
    })
}
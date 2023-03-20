import {request} from '../requestService.js';

export async function loginJobSeeker(identifier, password) {

    return request.post('/user/login/job_seeker', {
        identifier,
        password
    })
}

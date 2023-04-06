const HOST = 'http://127.0.0.1:5000';
const timeoutMessage = 'Request timed out';

async function requestService(method, url, data) {
    let authData = localStorage.getItem('authData');
    try {
        authData = JSON.parse(authData);
    } catch {
        authData = null;
    }

    const options = {
        method,
        headers: {},
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
            .replaceAll(`""`, 'null');
    }

    if (authData != null) {
        options.headers['Authorization'] = 'Bearer ' + authData.token;
    }
    try {
        const requestTimeout = new Promise((_, reject) => {
            setTimeout(() => {
                    reject(new Error(timeoutMessage));
                },
                10000);
        });
        const res = await Promise.race([
            fetch(HOST + url, options),
            requestTimeout
        ]);


        if (res.ok === false) {
            const error = await res.json();

            throw error;
        }

        if (res.status === 204) {
            return res;
        } else {
            return res.json();
        }
    } catch (err) {
        if (err.message === timeoutMessage) {
            return alert(err.message);
        }
        console.log(err);
        throw err;
    }
}

export const request = {
    get: requestService.bind(null, 'GET'),
    put: requestService.bind(null, 'PUT'),
    post: requestService.bind(null, 'POST'),
    delete: requestService.bind(null, 'DELETE'),
};
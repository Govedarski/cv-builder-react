const HOST = 'http://127.0.0.1:5000';
const timeoutMessage = "Request timed out"

async function requestService(method, url, data, userData) {
    const options = {
        method,
        headers: {},
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        console.log(data);
        options.body = JSON.stringify(data)
            .replaceAll(`""`, "null");
    }

    if (userData != null) {
        options.headers['Authorization'] = userData.accessToken;
    }
    try {
        const requestTimeout = new Promise((_, reject) => {
            setTimeout(() => {
                    reject(new Error(timeoutMessage));
                },
                5000);
        });
        const res = await Promise.race([
            fetch(HOST + url, options),
            requestTimeout
        ]);


        if (res.ok === false) {
            const error = await res.json();
            throw Error(error.message);
        }

        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }
    } catch (err) {
        if (err.message === timeoutMessage) return alert(err.message)
        throw err;
    }
}

export const request = {
    get: requestService.bind(null, 'GET'),
    put: requestService.bind(null, 'PUT'),
    post: requestService.bind(null, 'POST'),
    delete: requestService.bind(null, 'DELETE'),
};
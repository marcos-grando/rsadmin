const JSON_HEADERS = { 'Content-Type': 'application/json' };
const X_REQ = { 'X-Requested-With': 'XMLHttpRequest' };

async function request(path, { method = 'GET', headers = {}, body, retry = true } = {}) {
    const opts = {
        method,
        credentials: 'include',
        headers: method === 'GET'
            ? { ...headers }
            : { ...JSON_HEADERS, ...X_REQ, ...headers },
        body: body ? JSON.stringify(body) : undefined
    };

    const res = await fetch(path, opts);

    if (res.status === 401 && retry) {
        const rr = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
            headers: X_REQ
        });
        if (rr.ok) {
            return request(path, { method, headers, body, retry: false });
        }
    }
    return res;
}

export const api = {
    get: (p, h) => request(p, { method: 'GET', headers: h }),
    post: (p, b, h) => request(p, { method: 'POST', body: b, headers: h }),
    patch: (p, b, h) => request(p, { method: 'PATCH', body: b, headers: h }),
    del: (p, h) => request(p, { method: 'DELETE', headers: h })
};

export async function logout() {
    await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: X_REQ
    });
    location.reload();
}

const XREQ = { 'X-Requested-With': 'XMLHttpRequest' };

export async function fetchWithRefresh(path, opts = {}) {

    const method = (opts.method || 'GET').toUpperCase();
    const withCreds = {
        ...opts,
        credentials: 'include',
        headers: method === 'GET' ? opts.headers : { ...XREQ, ...(opts.headers || {}) }
    };

    let res = await fetch(path, withCreds);
    if (res.status !== 401) return res;

    const refr = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
    if (!refr.ok) return res;

    res = await fetch(path, withCreds);
    return res;
};
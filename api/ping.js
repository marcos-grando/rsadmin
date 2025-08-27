export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify({
        pong: true,
        url: req.url,
        method: req.method,
        hasHash: !!process.env.ADMIN_PASSWORD_HASH,
        hasAccess: !!process.env.JWT_ACCESS_SECRET,
        hasRefresh: !!process.env.JWT_REFRESH_SECRET
    }));
};
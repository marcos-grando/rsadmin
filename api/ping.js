export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify({ pong: true, url: req.url, method: req.method }));
};
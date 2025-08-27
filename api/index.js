import serverless from 'serverless-http';
import app from '../app.js';
const handler = serverless(app);

export default (req, res) => {
    if (req.url && req.url.startsWith('/api/')) req.url = req.url.slice(4);
    else if (req.url === '/api') req.url = '/';
    return handler(req, res);
};

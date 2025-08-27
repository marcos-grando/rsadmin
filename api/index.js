import serverless from 'serverless-http';
import app from '../app.js';
const handler = serverless(app);

export default async (req, res) => {
    req.url = (req.url || '').replace(/^\/api/, '') || '/';
    return handler(req, res);
};
